/**
 * @class CustomError is an error throwed from the server
 * developers due to checked error happen
 */
export default class CustomError {
  message: String;
  status: number;
  constructor({ status, message }) {
    this.status = status;
    this.message = message;
  }
}
