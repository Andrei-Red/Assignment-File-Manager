import zlib from "zlib";
import fs from "fs";
import { pipeline } from "node:stream";

export const decompress = async (workFile, toFile, currentCat) => {
  const gUnzip = zlib.createBrotliDecompress();
  const source = fs.createReadStream(workFile);
  const destination = fs.createWriteStream(toFile);

  const onError = (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  };

  pipeline(source, gUnzip, destination, onError);

  console.info(`You are currently in ${currentCat}`);
};
