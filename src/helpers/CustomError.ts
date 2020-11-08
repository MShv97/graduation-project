/**
 * @class CustomError is an error throwed from the server
 * developers due to checked error happen 
 */
export default class CustomError {
    code: Number;
    message: String;
    status: string;
    constructor({ code, status, message, }) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}