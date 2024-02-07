import fs from "fs";

export const list = async (dir) => {
  fs.stat(dir, function (err) {
    if (err) {
      throw new Error("FS operation failed");
    } else {
    }
  });

  fs.readdir(dir, (err, files) => {
    if (err) console.error(err);
    else {
      console.table(files);
      console.info(`You are currently in ${dir}`);
    }
  });
};
