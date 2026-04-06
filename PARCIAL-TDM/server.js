const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;

// 🔴 IMPORTANTE: ahora apunta directamente a /public
const PUBLIC_PATH = path.join(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif"
};

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  try {
    // Si entra a "/", mostrar index.html
    let filePath = req.url === "/" ? "/index.html" : req.url;

    const fullPath = path.join(PUBLIC_PATH, filePath);
    const ext = path.extname(fullPath);

    const content = await fs.readFile(fullPath);

    const contentType = MIME_TYPES[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);

  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Archivo no encontrado");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});