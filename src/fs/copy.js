import fs from "fs";

export const copy = async (oldFile, newFile, currentCat) => {
  fs.copyFile(oldFile, newFile, function (err) {
    if (err) throw err;
  });
  if (currentCat.length >= 1) {
    console.info(`You are currently in ${currentCat}`);
  }
};
