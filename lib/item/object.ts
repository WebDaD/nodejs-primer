/**
 * @overview Object-Representation of one Item
 * @module Item
 * @author Dominik Sigmund
 * @version 1.0
 * @description Allows to export or Import JSON
 * @memberof nodejs-primer
 */

/** Simple Object Class Item
 * @class Item
 * */
export class Item {

  private _id:string | undefined
  private _name:string
  private _descr:string
  private _locked:boolean

  /** Create an Instance
   * @param {string} id - An ID for an Item
   * @param {string} name - The name of the Item
   * @param {string} descr - The description for the Item
   * @param {boolean} locked - True if the Item can be edited.
   * @returns {ItemField} Instance of Object Item
   * */
  constructor(name:string, descr:string, locked:boolean, id?:string) {
    this._name = name
    this._descr = descr
    this._locked = locked
    if (id) {
      this._id = id
    } else {
      this._id = undefined
    }
  }
  
  /** Return this Instance to a JSON-Object
   * @returns {object} JSON-Object of Object Item
   * */
  public toJSON() {
    return {
      id: this._id,
      name:this._name,
      descr: this._descr,
      locked: this._locked
    }
  }
  /** Return this Instance to a JSON-Object
  * @param {object} object - JSON-Object of Object Item
   * @returns {ItemField} Instance of Item or null
   * */
  public static fromJSON(object:any): Item | undefined {
    if (!Item.isValid(object)) {
      return undefined
    } else {
      return new Item( object.name, object.descr, object.locked, object.id || undefined)
    }
  }

  /** Check if all Fields are filed, that must be filer
  * @param {object} object - JSON-Object of Object Item
   * @returns {boolean} All Fields given or not
   * */
  public static isValid(object:any): boolean {
    return object && object.hasOwnProperty('name') && object.hasOwnProperty('descr') && object.hasOwnProperty('locked')
  }
}
export default Item