import os from "os";
import fs from "fs";

import {parseUserName} from "./cli/cli.js";
import {read} from "./fs/read.js";
import {create} from "./fs/create.js";
import {rename} from "./fs/rename.js";
import {copy} from "./fs/copy.js";
import {remove} from "./fs/delete.js";
import {calculateHash} from "./hash/calcHash.js";
import {list} from "./fs/list.js";
import {compress} from "./compression/compress.js";
import {decompress} from "./compression/decompress.js";

export class App {
    _catalog
    toFile
    userName
    workFile

    constructor(logHandler) {
        this.logHandler = logHandler
    }

    start() {
        this.userName = parseUserName()
        this._catalog = os.userInfo().homedir;

        this.logHandler.log(`Welcome to the File Manager, ${this.userName}!`)
        this.logHandler.log(`You are currently in ${this._catalog}`);

        process.on("SIGINT", () => {
            this.logHandler.exit(this.userName);
            process.exit(0);
        });

        this.listener()
        this.quiteHandler()
    }

    quiteHandler() {
        this._catalog = os.userInfo().homedir;
    }
    listener() {
        process.stdin.on("data", (inputStdin) => {
            this.inputStdin = inputStdin
            this.workFile = this._catalog + "\/" +  this.inputStdin.toString().trim().split(" ")[1];
            this.toFile = this._catalog + "\/" +  this.inputStdin.toString().trim().split(" ")[2];

            const [currentCommand, flag] =  this.inputStdin.toString().trim().split(" ")

            switch (currentCommand) {
                case ".exit":
                    this.onExit()
                    break;

                case "up":
                    this.onUp()
                    break;

                case "cat":
                    this.onCat()
                    break;

                case "add":
                    this.onAdd()
                    break;

                case "rn":
                    this.onRn()
                    break;

                case "cp":
                    this.onCp()
                    break;

                case "mv":
                    this.onMv()
                    break;

                case "hash":
                    this.onHash()
                    break;

                case "rm":
                    this.onRm
                    break;

                case "ls":
                    this.onLs()
                    break;

                case "cd":
                    this.onSd()
                    break;

                case "os":
                    this.onOs(flag)
                    break;

                case "compress":
                    this.onCompress()
                    break;

                case "decompress":
                    this.onDecompress()
                    break;

                default:
                    this.logHandler.log("Invalid input");
            }
        });

        process.on('uncaughtException', (error) => {
            console.info('Uncaught Exception:', error);
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.info('Unhandled Rejection:', reason);
        });
    }

    onOs (flag) {
        switch (flag) {
            case "--EOL":
                this.logHandler.log(JSON.stringify(os.EOL));
                break;
            case "--cpus":
                this.logHandler.log(os.cpus());
                break;
            case "--homedir":
                this.logHandler.log(os.homedir());
                break;
            case "--username":
                this.logHandler.log(os.userInfo().username);
                break;
            case "--architecture":
                this.logHandler.log(os.arch());
                break;
            default:
                this.logHandler.log("Invalid input");
        }
        this.logHandler.log(`You are currently in ${this._catalog}`);
    }

    onExit () {
        this.logHandler.exit(this.userName);
        process.exit(0);
    }

    onUp () {
        if (this._catalog.split("\/").length > 1) {
            this._catalog = this._catalog.split("\/").slice(0, -1).join("\/");
            this.logHandler.log(`You are currently in ${this._catalog}`);
        }
    }

    onCat () {
        read(this.workFile, this._catalog)
    }

    onAdd () {
        create(this.workFile, this._catalog);
    }

    onRn () {
        rename(this.workFile, this.toFile, this._catalog);
    }

    onCp () {
        copy(this.workFile, this.toFile, this._catalog);
    }

    onMv () {
        copy(this.workFile, this.toFile, "");
        remove(this.workFile, this._catalog);
    }

    onHash () {
        calculateHash(this.workFile, this._catalog);
    }

    onRm () {
        remove(this.workFile, this._catalog);
    }

    onLs () {
        list(this._catalog);
    }

    onSd () {
        fs.stat(this.workFile, (err, stats) => {
            if (err || stats.isFile()) {
                console.info("Directory not found");
            } else {
                this._catalog = this._catalog + "\/" +  this.inputStdin.toString().trim().split(" ")[1];
                console.info(`You are currently in ${this._catalog}`);
            }
        });
    }

    onCompress () {
        compress(this.workFile, this.toFile, this._catalog);
    }

    onDecompress () {
        decompress(this.workFile, this.toFile, this._catalog);
    }
 }
