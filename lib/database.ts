/**
 * @overview IDatabase Interface Class.
 * @module Database
 * @author Dominik Sigmund
 * @version 1.0
 * @description To be used by Controller, to be implemented by database-classes
 * @memberof nodejs-primer
 */

/** Interface IDatabase
 * @class IDatabase
 * */
export interface IDatabase { 
  select(fields:Array<string>, table:string): object
}
export default IDatabase