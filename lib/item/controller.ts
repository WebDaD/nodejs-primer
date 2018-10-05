/**
 * @overview Controller for all Items
 * @module Item
 * @author Dominik Sigmund
 * @version 1.0
 * @description Makes the SQL-Statements
 * @memberof nodejs-primer
 */

import Item from "./object"
import Error from '../error'
import * as mysql from "mysql"

/** Object for Class ItemController
 * @class ItemController
 * */
export class ItemController {

  private mysqlConnection: mysql.Connection
  /** Create an Instance
   * @param {mysql.Connection} mysqlConnection - An Open Connection to a MySQL-Database
   * @returns {ItemController} Instance of Object ItemController
   * */
  constructor(mysqlConnection: mysql.Connection) {
    this.mysqlConnection = mysqlConnection

  }

  /** Return an Array of all entries in the Database
    * @param {ItemController~listCallback} callback - A Callback with an error or the Array of Items
    * @returns {void} Nothing. Use the Callback
    * */
  public list(callback:(error?: Error, result?: Item[]) => void): void {
    let sql = 'SELECT id, name, descr, locked FROM item'
    this.mysqlConnection.query(sql, function (error, rows) {
      if (error) {
        callback(new Error(
          error.message,
          500,
          error.toString()
        ))
      } else {
        if(rows.length < 1) {
          callback(new Error('No Items found', 404))
        } else {
          let res = new Array<Item>()
          for (let index = 0; index < rows.length; index++) {
            const row = rows[index]
            res.push(new Item(row.name, row.descr, row.locked, row.id))
          }
          callback(undefined,res)
        }
      }
    })
  }

  /** Return a single Entry matching the ID
    * @param {string} id - ID to search For
    * @param {ItemController~getCallback} callback - A Callback with an error or the Item
    * @returns {void} Nothing. Use the Callback
    * */
  public get(id:string, callback:(error?: Error, result?: Item) => void): void {
    let sql = 'SELECT id, name, descr, locked FROM item WHERE id=' + id
    this.mysqlConnection.query(sql, function (error, row) {
      if (error) {
        callback(new Error(
          error.message,
          500,
          error.errno.toString()
        ))
      } else {
        if(!row || row.length !== 1) {
          callback(new Error('Zero or Multiple Results for id ' + id, 404, 'Rows: ' + row))
        } else {
          callback(undefined, new Item(row[0].name, row[0].descr, row[0].locked, row[0].id))
        }
      }
    })
  }

  /** Add an Entry to the Database
    * @param {Item} object - Item as JSON
    * @param {ItemController~getCallback} callback - A Callback with an error or the Item (with generated ID)
    * @returns {void} Nothing. Use the Callback
    * */
  public add(object:any, callback:(error?: Error, result?: Item) => void): void {
    if(Item.isValid(object)) {
      let sql = 'INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")'
      this.mysqlConnection.query(sql, function (error, rows) {
        if (error) {
          callback(new Error(
            error.message,
            500,
            error.errno.toString()
          ))
        } else {
          if(!rows.insertId) {
            callback(new Error('Error on Insert', 500, 'No Last Insert ID!'))
            return {error:'Error on Insert'}
          } else {
            callback(undefined, new Item(object.name, object.descr, object.locked, rows.insertId))
          }
        }
      })
    } else {
      callback(new Error(
        'Must give object of type Itemfield (name, descr, locked)',
        408
      ))
    } 
  }

  /** Update an Entry in the Database
    * @param {string} id - ID to search For
    * @param {Item} object - Item as JSON
    * @param {ItemController~getCallback} callback - A Callback with an error or the Item
    * @returns {void} Nothing. Use the Callback
    * */
  public update(id:string, object:any, callback:(error?: Error, result?: Item) => void): void {
    if(Item.isValid(object)) {
      let sql = 'UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + id
      this.mysqlConnection.query(sql, function (error, rows) {
        if (error) {
          callback(new Error(
            error.message,
            500,
            error.errno.toString()
          ))
        } else {
          if(rows.affectedRows !== 1) {
            callback(new Error('Zero or Multiple affected Rows for id ' + id, 404, 'Affected Rows: ' + rows.affectedRows))
          } else {
            callback(undefined, new Item(object.name, object.descr, object.locked, id))
          }
        }
      })
    } else {
      callback(new Error(
        'Must give object of type Itemfield (name, descr, locked)',
        408,
        JSON.stringify(object)
      ))
    }
  }

  /** DELETE a single Entry matching the ID
    * @param {string} id - ID to search For
    * @param {ItemController~deleteCallback} callback - A Callback with an error or the Item
    * @returns {void} Nothing. Use the Callback
    * */
  public delete(id:string, callback:(error?: Error, result?: boolean) => void): void {
    let sql = 'DELETE FROM item WHERE id=' + id
    this.mysqlConnection.query(sql, function (error, rows) {
      if (error) {
        callback(new Error(
          error.message,
          500,
          error.errno.toString()
        ))
      } else {
        if(rows.affectedRows !== 1) {
          callback(new Error('Zero or Multiple affected Rows for id ' + id, 404, 'Affected Rows: ' + rows.affectedRows))
        } else {
          callback(undefined, true)
        }
      }
    })
  }
}

export default ItemController

/**
  * This callback is displayed as part of the ItemController class.
  * @callback ItemController~listCallback
  * @param {Error?} error - Error.
  * @param {Item[]?} result - Array of Items
  */

/**
  * This callback is displayed as part of the ItemController class.
  * @callback ItemController~getCallback
  * @param {Error?} error - Error.
  * @param {Item?} result - Item
  */

/**
  * This callback is displayed as part of the ItemController class.
  * @callback ItemController~deleteCallback
  * @param {Error?} error - Error.
  * @param {boolean?} result - True or False
  */