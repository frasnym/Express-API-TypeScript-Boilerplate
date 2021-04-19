export class SuccessResponse {
  public readonly status = 'success'
  public data: any

  constructor(data: any) {
    this.data = data
  }

  serializeResponse() {
    return {
      status: this.status,
      data: this.data
    }
  }
}

export class FailResponse extends Error {
  public readonly status = 'fail'

  constructor(
    public statusCode: number,
    public message: string,
    public data: any
  ) {
    super(message)
  }
}

export class ErrorResponse extends Error {
  public readonly status = 'error'

  constructor(
    public statusCode: number,
    public message: string = 'Internal server error',
    public stack: any = undefined,
    public code: string = ''
  ) {
    super(message)
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
