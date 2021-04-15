class FailResponse extends Error {
  public readonly status = 'fail'

  constructor(
    public statusCode: number,
    public message: string,
    public data: any
  ) {
    super(message)
  }
}

export { FailResponse }
