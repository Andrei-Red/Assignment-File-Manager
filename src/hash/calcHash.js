const { createHash } = await import("node:crypto");
import fs from "fs";

export const calculateHash = async (hashFile, currentCat) => {
  const secret = "hach1-03";
  const file = fs.createReadStream(hashFile);
  const hash = createHash("and", secret);
  file.on("readable", () => {
    const data = file.read();
    if (data) {
      hash.update(data);
    }
    else {
      console.info(`${hash.digest("hex")}`);
      console.info(`You are currently in ${currentCat}`);
    }
  });
};
