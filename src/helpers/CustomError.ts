/**
 * @class CustomError is an error throwed from the server
 * developers due to checked error happen
 * @param {number} status
 * @param {String} message
 */
export default class CustomError {
  status: number;
  message: String;
  constructor({ status, message }) {
    this.status = status;
    this.message = message;
  }
}
