async function log(message){
    console.log(new Date(), message)
}

async function errorLog(message){
    console.error(new Date(), message)
}

async function warnLog(message){
    console.warn(new Date(), message)
}

export {log, errorLog, warnLog}