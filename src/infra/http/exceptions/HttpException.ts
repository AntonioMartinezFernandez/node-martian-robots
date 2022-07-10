export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message = 'Server error') {
    super(message);
    this.status = status;
    this.message = message;
  }
}
