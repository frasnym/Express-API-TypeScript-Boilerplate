class ErrorResponse extends Error {
  public readonly status = 'error'

  constructor(
    public statusCode: number,
    public message: string,
    public stack: string = ''
  ) {
    super(message)
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { ErrorResponse }
