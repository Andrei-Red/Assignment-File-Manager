export class LogHandler {
    log(message) {
        console.info(message)
    }

    exit(userName) {
        console.info( `Thank you for using File Manager, ${userName}!`)
    }
}