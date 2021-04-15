class FailResponse extends Error {
  public readonly status = 'fail'

  constructor(
    public statusCode: number,
    public message: string,
    public data: any,
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

export { FailResponse }
