import {App} from "./src/app.js";
import {LogHandler} from "./src/logHandler/logHandler.js"

const logHandler = new LogHandler()
const app = new App(logHandler)

app.start()