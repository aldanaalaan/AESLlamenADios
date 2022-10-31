
// Dependencias
const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const Cifrador = require("./FilesAES.js");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, res, cb) => {
    cb(null, "Original.txt");
  },
});
const upload = multer({
  storage: storage,
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.post("/files", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "download.html"));
});
app.post("/Enc", (req, res) => {
  res.download(path.join(__dirname, "uploads", "Cifrado.txt"));
});
app.post("/Dec", (req, res) => {
  res.download(path.join(__dirname, "uploads", "Descifrado.txt"));
});
app.get("/descargar/Enc", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "download.html"));
  //res.download(path.join(__dirname, "uploads", "Cifrado.txt"));
});
app.get("/descargar/Dec", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "download_copy.html"));
  //res.download(path.join(__dirname, "uploads", "Descifrado.txt"));
});

app.post("/encdec", upload.single("uploaded_file"), (req, res) => {
  res.sendFile(path.join(__dirname, "views", "encdec.html"));
});

app.post("/process", urlencodedParser, (req, res) => {
  Cifrador(
    path.join(__dirname, "uploads", "Original.txt"),
    req.body.modo == "1"
      ? path.join(__dirname, "uploads", "Cifrado.txt")
      : path.join(__dirname, "uploads", "Descifrado.txt"),
    req.body.Clave,
    req.body.modo,
    parseInt(req.body.Tamaño)
  );
  res.redirect(req.body.modo == "1" ? "descargar/Enc" : "descargar/Dec");
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
