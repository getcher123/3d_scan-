#!/usr/bin/env node
/* eslint-disable no-console */

const path = require("path");
const fs = require("fs/promises");
const fsSync = require("fs");
const http = require("http");

let chromium;
try {
  // Prefer full Playwright if installed (it bundles browsers).
  ({ chromium } = require("playwright"));
} catch {
  try {
    ({ chromium } = require("playwright-core"));
  } catch {
    // Local fallback: reuse the Informika workspace installation if present.
    try {
      ({ chromium } = require("/mnt/c/informika/node_modules/playwright-core"));
    } catch (e) {
      console.error(
        "Playwright not found. Install `playwright` or `playwright-core`, or ensure /mnt/c/informika has playwright-core installed.",
      );
      throw e;
    }
  }
}

const DEFAULT_BREAKPOINTS = [320, 768, 1024, 1440];

function parseArgs(argv) {
  const args = {
    pages: [],
    outDir: "renders/scanlab",
    breakpoints: DEFAULT_BREAKPOINTS,
    fullPage: true,
    failOnWarn: false,
    ignoreTailwindCdnWarning: false,
  };
  const rest = [...argv];
  while (rest.length) {
    const a = rest.shift();
    if (!a) continue;
    if (a === "--out" && rest[0]) {
      args.outDir = rest.shift();
      continue;
    }
    if (a.startsWith("--out=")) {
      args.outDir = a.slice("--out=".length);
      continue;
    }
    if (a === "--breakpoints" && rest[0]) {
      args.breakpoints = rest
        .shift()
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => Number.isFinite(n) && n > 0);
      continue;
    }
    if (a.startsWith("--breakpoints=")) {
      args.breakpoints = a
        .slice("--breakpoints=".length)
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => Number.isFinite(n) && n > 0);
      continue;
    }
    if (a === "--no-fullpage") {
      args.fullPage = false;
      continue;
    }
    if (a === "--fail-on-warn") {
      args.failOnWarn = true;
      continue;
    }
    if (a === "--ignore-tailwind-cdn-warning") {
      args.ignoreTailwindCdnWarning = true;
      continue;
    }
    if (a.startsWith("--")) continue;
    args.pages.push(a);
  }
  return args;
}

function safeSlug(relPath) {
  const noExt = relPath.replace(/\\/g, "/").replace(/\.html$/i, "");
  const slug = noExt
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
  return slug || "page";
}

async function walkHtmlFiles(rootDir) {
  const out = [];
  const skip = new Set([".git", "node_modules", "renders", ".tmp"]);

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (skip.has(entry.name)) continue;
        await walk(path.join(dir, entry.name));
        continue;
      }
      if (!entry.isFile()) continue;
      if (!entry.name.toLowerCase().endsWith(".html")) continue;
      const abs = path.join(dir, entry.name);
      out.push(abs);
    }
  }

  await walk(rootDir);
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

function startStaticServer(rootDir) {
  const rootResolved = path.resolve(rootDir);
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
  };

  const server = http.createServer(async (req, res) => {
    try {
      if (!req.url) {
        res.writeHead(400);
        res.end("Bad Request");
        return;
      }

      const u = new URL(req.url, "http://127.0.0.1");
      const rawPath = decodeURIComponent(u.pathname);
      const reqPath = rawPath === "/" ? "/index.html" : rawPath;

      const abs = path.resolve(rootDir, `.${reqPath}`);
      if (!abs.startsWith(rootResolved + path.sep)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      const stat = await fs.stat(abs).catch(() => null);
      if (!stat || !stat.isFile()) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }

      const ext = path.extname(abs).toLowerCase();
      const type = mime[ext] || "application/octet-stream";
      res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
      fsSync.createReadStream(abs).pipe(res);
    } catch (err) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end(String(err && err.message ? err.message : err));
    }
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : null;
      if (!port) {
        reject(new Error("Failed to bind local server"));
        return;
      }
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rootDir = process.cwd();

  // WSL environments may miss shared libs required by Chromium.
  // Prefer local .tmp/playwright-libs if present, otherwise reuse Informika's bundle.
  const localLibDir = path.resolve(rootDir, ".tmp/playwright-libs/usr/lib/x86_64-linux-gnu");
  const informikaLibDir = path.resolve("/mnt/c/informika/.tmp/playwright-libs/usr/lib/x86_64-linux-gnu");
  const libDir = fsSync.existsSync(localLibDir) ? localLibDir : fsSync.existsSync(informikaLibDir) ? informikaLibDir : null;
  if (libDir) {
    const existing = process.env.LD_LIBRARY_PATH || "";
    process.env.LD_LIBRARY_PATH = existing ? `${libDir}:${existing}` : libDir;
  }

  const outRoot = path.resolve(rootDir, args.outDir);
  await fs.mkdir(outRoot, { recursive: true });

  const discovered = args.pages.length
    ? args.pages.map((p) => path.resolve(rootDir, p))
    : await walkHtmlFiles(rootDir);

  const htmlFiles = discovered.filter((abs) => abs.toLowerCase().endsWith(".html") && fsSync.existsSync(abs));
  if (!htmlFiles.length) {
    console.error("No HTML pages found.");
    process.exit(1);
  }

  const { server, baseUrl } = await startStaticServer(rootDir);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    server.close();
    throw e;
  }

  const context = await browser.newContext();
  const report = { generatedAt: new Date().toISOString(), baseUrl, breakpoints: args.breakpoints, pages: [] };

  for (const abs of htmlFiles) {
    const rel = path.relative(rootDir, abs).replace(/\\/g, "/");
    const slug = safeSlug(rel);
    const pageOutDir = path.join(outRoot, slug);
    await fs.mkdir(pageOutDir, { recursive: true });

    const pageReport = {
      relPath: rel,
      slug,
      outputs: {
        dir: path.relative(rootDir, pageOutDir).replace(/\\/g, "/"),
        screenshots: [],
        logs: path.relative(rootDir, path.join(pageOutDir, "browser.jsonl")).replace(/\\/g, "/"),
        summary: path.relative(rootDir, path.join(pageOutDir, "summary.json")).replace(/\\/g, "/"),
      },
      viewports: [],
      totals: { consoleErrors: 0, consoleWarnings: 0, pageErrors: 0, requestFailures: 0, httpErrors: 0 },
    };

    const logLines = [];

    for (const width of args.breakpoints) {
      const page = await context.newPage();
      await page.setViewportSize({ width, height: 900 });

      const vp = {
        width,
        url: `${baseUrl}/${rel}`,
        finalUrl: null,
        counts: { consoleErrors: 0, consoleWarnings: 0, pageErrors: 0, requestFailures: 0, httpErrors: 0 },
      };

      const push = (entry) => {
        const line = JSON.stringify({ ts: new Date().toISOString(), page: rel, viewport: width, ...entry });
        logLines.push(line);
      };

      page.on("console", (msg) => {
        const type = msg.type();
        const text = msg.text();
        const location = msg.location ? msg.location() : {};
        const isTailwindCdnWarning =
          type === "warning" && text.includes("cdn.tailwindcss.com should not be used in production");
        const ignored = isTailwindCdnWarning && args.ignoreTailwindCdnWarning;
        const entry = { kind: "console", type, text, location, ignored };
        push(entry);
        if (type === "error") vp.counts.consoleErrors += 1;
        if (type === "warning" && !ignored) vp.counts.consoleWarnings += 1;
      });
      page.on("pageerror", (err) => {
        push({ kind: "pageerror", message: err.message, stack: err.stack });
        vp.counts.pageErrors += 1;
      });
      page.on("requestfailed", (req) => {
        push({
          kind: "requestfailed",
          url: req.url(),
          resourceType: req.resourceType(),
          failure: req.failure(),
          method: req.method(),
        });
        vp.counts.requestFailures += 1;
      });
      page.on("response", (res) => {
        const status = res.status();
        if (status < 400) return;
        push({ kind: "http", url: res.url(), status });
        vp.counts.httpErrors += 1;
      });

      try {
        await page.goto(vp.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
        // Give redirects a chance to complete.
        await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
        await page.waitForTimeout(400);
        vp.finalUrl = page.url();

        await page.addStyleTag({
          content: `
            body::before, body::after { display: none !important; }
            *, *::before, *::after { animation: none !important; transition: none !important; }
          `,
        });
        await page.waitForTimeout(100);

        const shotPath = path.join(pageOutDir, `${slug}-${width}.png`);
        await page.screenshot({ path: shotPath, fullPage: args.fullPage });
        pageReport.outputs.screenshots.push(path.relative(rootDir, shotPath).replace(/\\/g, "/"));
      } catch (err) {
        push({ kind: "runner-error", message: err.message, stack: err.stack });
        vp.counts.pageErrors += 1;
      } finally {
        await page.close();
      }

      pageReport.viewports.push(vp);
    }

    pageReport.totals = pageReport.viewports.reduce(
      (acc, vp) => {
        acc.consoleErrors += vp.counts.consoleErrors;
        acc.consoleWarnings += vp.counts.consoleWarnings;
        acc.pageErrors += vp.counts.pageErrors;
        acc.requestFailures += vp.counts.requestFailures;
        acc.httpErrors += vp.counts.httpErrors;
        return acc;
      },
      { consoleErrors: 0, consoleWarnings: 0, pageErrors: 0, requestFailures: 0, httpErrors: 0 },
    );

    await fs.writeFile(path.join(pageOutDir, "browser.jsonl"), logLines.join("\n") + (logLines.length ? "\n" : ""), "utf8");
    await fs.writeFile(path.join(pageOutDir, "summary.json"), JSON.stringify(pageReport, null, 2) + "\n", "utf8");

    report.pages.push(pageReport);
  }

  await browser.close();
  server.close();

  const reportPath = path.join(outRoot, "report.json");
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8");

  const totals = report.pages.reduce(
    (acc, p) => {
      acc.consoleErrors += p.totals.consoleErrors;
      acc.consoleWarnings += p.totals.consoleWarnings;
      acc.pageErrors += p.totals.pageErrors;
      acc.requestFailures += p.totals.requestFailures;
      acc.httpErrors += p.totals.httpErrors;
      return acc;
    },
    { consoleErrors: 0, consoleWarnings: 0, pageErrors: 0, requestFailures: 0, httpErrors: 0 },
  );

  console.log(`Rendered ${report.pages.length} pages to ${path.relative(rootDir, outRoot)}`);
  console.log(
    `Totals: consoleErrors=${totals.consoleErrors}, consoleWarnings=${totals.consoleWarnings}, pageErrors=${totals.pageErrors}, requestFailures=${totals.requestFailures}, httpErrors=${totals.httpErrors}`,
  );
  console.log(`Report: ${path.relative(rootDir, reportPath)}`);

  const hasErrors = totals.consoleErrors || totals.pageErrors || totals.requestFailures || totals.httpErrors;
  const hasWarnings = totals.consoleWarnings;
  if (hasErrors || (args.failOnWarn && hasWarnings)) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
