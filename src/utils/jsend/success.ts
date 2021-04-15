export class SuccessResponse {
  status = 'success'
  data: any

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
