import fs from "fs";

export const read = async (file, currentCat) => {
  fs.readFile(file, "utf8", function (error, fileContent) {
    if (error) throw new Error("FS operation failed");
    console.info(fileContent);
    console.info(`You are currently in ${currentCat}`);
  });
};
