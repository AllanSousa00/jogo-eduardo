"use strict";

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const requestedRoot = process.argv[2] || ".";
const root = path.resolve(process.cwd(), requestedRoot);
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function resolveFile(urlPath) {
  const safePath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  let target = path.resolve(root, safePath || "index.html");

  if (!target.startsWith(root)) {
    return null;
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }

  return target;
}

const server = http.createServer((request, response) => {
  const target = resolveFile(request.url || "/");

  if (!target || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo nao encontrado.");
    return;
  }

  const contentType = contentTypes[path.extname(target).toLowerCase()] || "application/octet-stream";
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-cache"
  });
  fs.createReadStream(target).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Servidor disponivel em http://${host}:${port}/ a partir de ${root}`);
});
