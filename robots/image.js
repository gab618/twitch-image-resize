const imageDownloader = require("image-downloader");
const gm = require("gm").subClass({ imageMagick: true });

async function robot(image) {
  await convertImage(image);
}

async function convertImage(image) {
  return new Promise((resolve, reject) => {
    const inputFile = `./image/${image}.png[0]`;
    const outputFile = `./image/output/${image}-converted.png`;
    const width = 30;
    const height = 30;

    gm()
      .in(inputFile)
      .out("(")
      .out("-clone")
      .out("0")
      .out("-background", "white")
      .out("-blur", "0x9")
      .out("-resize", `${width}x${height}^`)
      .out(")")
      .out("(")
      .out("-clone")
      .out("0")
      .out("-background", "white")
      .out("-resize", `${width}x${height}`)
      .out(")")
      .out("-delete", "0")
      .out("-gravity", "center")
      .out("-compose", "over")
      .out("-composite")
      .out("-extent", `${width}x${height}`)
      .write(outputFile, (error) => {
        if (error) {
          return reject(error);
        }

        console.log(`> [video-robot] Image converted: ${outputFile}`);
        resolve();
      });
  });
}

module.exports = robot;
