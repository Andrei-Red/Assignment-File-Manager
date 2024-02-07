export const parseUserName = () => {
    const args = process.argv.slice(2);
    let userName = "";
    if (args.length !== 1 && args.includes("--username=") == false) {
        console.info("Invalid input");
    } else {
        userName += args[0].split("=")[1];
        return userName;
    }
};