import fs from "fs";

export const create = async (file, currentCat) => {
  fs.appendFile(file, "", (err) => {
    if (err) throw err;
    console.info(`You are currently in ${currentCat}`);
  });
};
