import fs from "fs";

export const rename = async (oldFile, newFile, currentCat) => {
  fs.rename(oldFile, newFile, (err) => {
    if (err) throw new Error("FS operation failed");
    console.info(`You are currently in ${currentCat}`);
  });
};
