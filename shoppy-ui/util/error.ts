

export const getErrorMessage = (response: any) => {
    if (response.message){
        if(Array.isArray(response.message)){
            return formartErrorMessage(response.message[0])
        }

        return formartErrorMessage(response.message);
    }

    return "Unknown error occured";
}

//function to convert the first string to upperCase
const formartErrorMessage = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
}