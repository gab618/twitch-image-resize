const path = require("path");
const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

async function robot() {
  const images = getAllFilesInImageDir();

  for (image of images) {
    console.log(`Converting '${image}'...`);
    await convertImage(image);
  }
}

function getAllFilesInImageDir() {
  const directoryPath = path.join(__dirname, "..", "image");
  const files = fs.readdirSync(directoryPath);
  const imagesArray = new Array();

  files.forEach((file) => {
    const [filename, ext] = file.split(".");
    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
      imagesArray.push(file);
    }
  });

  return imagesArray;
}

async function convertImage(image) {
  return new Promise((resolve, reject) => {
    const inputFile = path.resolve(__dirname, "..", "image", `${image}[0]`);
    const sizes = [28, 56, 112];
    function outputFile(ratio) {
      return path.resolve(
        __dirname,
        "..",
        "image",
        "output",
        `${image}-${ratio}x.png`
      );
    }

    for (size of sizes) {
      gm()
        .in(inputFile)
        .resize(size, size, "!")
        .write(outputFile(size), (error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
    }
  });
}

module.exports = robot;
