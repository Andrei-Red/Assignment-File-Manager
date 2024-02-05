import zlib from "zlib";
import fs from "fs";
import { pipeline } from "node:stream";

export const compress = async (workFile, toFile, currentCat) => {
  const gzip = zlib.createBrotliCompress();
  const source = fs.createReadStream(workFile);
  const destination = fs.createWriteStream(toFile);

  const onError = (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  };

  pipeline(source, gzip, destination, onError);
  console.info(`You are currently in ${currentCat}`);
};
