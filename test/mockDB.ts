/**
 * @overview Mock Database, May replace mysqlConnection
 * @module MockDB
 * @author Dominik Sigmund
 * @version 1.0
 * @description Allows to test Controllers or Routes
 * @memberof nodejs-primer
 */
/** Simple Object Class MockDB
 * @class MockDB
 * */
export class MockDB {

  private data:any
  constructor() {
    this.data = {}
  }
  public set (sql:string, rows:any, working:boolean) {
    this.data = {
      sql: sql,
      rows: rows,
      working: working
    }
  }
  public query (sql:string, callback:any) {
    if(this.data.working && this.data.sql === sql) {
      callback(undefined, this.data.rows)
    } else {
      callback({message: 'SQl Error', errno:9999})
    }
  }
}
export default MockDB