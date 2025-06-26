function pushError(errors, message){
    if (errors.indexOf(message)==-1)
        errors.push(message)
    return errors
}

export default pushError
