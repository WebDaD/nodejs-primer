/**
 * @overview Mock Express Module, May replace express.req/res/next/router
 * @module MockExpress
 * @author Dominik Sigmund
 * @version 1.0
 * @description Allows to test Controllers or Routes
 * @memberof nodejs-primer
 */
import * as events from 'events'
/** Simple Object Class MockExpress
 * @class MockExpress
 * */
export class MockExpress {

  public Request:MockRequest
  public Response:MockResponse
  public Router:MockRouter

  constructor() {
    this.Request = new MockRequest()
    this.Response = new MockResponse()
    this.Router = new MockRouter()
  }
  public next(){
    return undefined
  }
}

export class MockRequest {
  public params:any
  public body:any
  constructor() {
  }
  public setParams(params:any) {
    this.params = params
  }
  public setBody(body:any) {
    this.body = body
  }
    
}
export class MockResponse extends events.EventEmitter {
  public Mstatus:any
  public Mjson:any
  public Msend:any
  constructor() {
    super()
  }
  public status(status:any) {
    this.Mstatus = status
    return this
  }
  public json(json:any) {
    this.Mjson = json
    this.emit('response', this)
  }
  public send(data:any) {
    this.Msend = data
    this.emit('response', this)
  }
}
export class MockRouter {
  public paths:any

  constructor() {
    this.paths = []
  }
  public get(route:any, fn:any) {
    this.paths.push({
      verb:'get',
      route:route
    })
  }
  public post(route:any, fn:any) {
    this.paths.push({
      verb:'post',
      route:route
    })
  }
  public put(route:any, fn:any) {
    this.paths.push({
      verb:'put',
      route:route
    })
  }
  public delete(route:any, fn:any) {
    this.paths.push({
      verb:'delete',
      route:route
    })
  }
}
export default MockExpress