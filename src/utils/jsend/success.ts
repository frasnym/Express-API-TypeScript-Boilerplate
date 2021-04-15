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
