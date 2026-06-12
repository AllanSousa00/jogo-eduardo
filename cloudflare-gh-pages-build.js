const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const output = path.join(root, "dist");
const ignored = new Set([".git", "dist", "package.json", "cloudflare-gh-pages-build.js"]);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

fs.readdirSync(root).forEach((entry) => {
  if (ignored.has(entry)) return;
  fs.cpSync(path.join(root, entry), path.join(output, entry), { recursive: true });
});

console.log("Cloudflare Pages static output ready in dist.");
