/**
 * @overview Router for all Items
 * @module Item
 * @author Dominik Sigmund
 * @version 1.0
 * @description Allows Express to Route to the Paths
 * @memberof weekreport-config
 */
"use strict"

import * as express from "express"
import ItemController from './controller'
import Item from './object'
import Error from '../error'

/** Object for Class ItemRoutes
 * @class ItemRoutes
 * */
export class ItemRoutes {
  private itemfieldController: ItemController

  /** Create an Instance
   * @param {ItemController} itemfieldController - An Instance of an itemfieldController
   * @returns {ItemRoutes} Instance of Object ItemRoutes
   * */
  constructor(itemfieldController: ItemController) {
    this.itemfieldController = itemfieldController
  }

  /** Return an Array of all entries in the Database
    * @param {express.Request} req - A Request Object
    * @param {express.Response} res - A Response Object
    * @param {express.NextFunction} next - A Next Object
    * @returns {void} Nothing. Will use res to send back results
    * */
  public list(req: express.Request, res: express.Response, next: express.NextFunction) : void | any {
    this.itemfieldController.list(function(error?: Error, result?: Item[]) {
      if(error) {
        return res.status(error.Status()).json(error.toJSON())
      } else {
        if (result) {
          var all = []
          for (let index = 0; index < result.length; index++) {
            all.push(result[index].toJSON())
          }
          return res.status(200).json(all)
        } else {
          return res.status(500).send('Strange Error')
        }
      }
    })
  }
  /** Return a single object from the database
    * @param {express.Request} req - A Request Object
    * @param {express.Response} res - A Response Object
    * @param {express.NextFunction} next - A Next Object
    * @returns {void} Nothing. Will use res to send back results
    * */
  public get(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.itemfieldController.get(req.params.id, function(error?: Error, result?: Item) {
      if(error) {
        return res.status(error.Status()).json(error.toJSON())
      } else {
        if(result) {
          return res.status(200).json(result.toJSON())
        } else {
          return res.status(500).send('Strange Error')
        }
      }
    })
  }
  /** Add an entry to the database
    * @param {express.Request} req - A Request Object
    * @param {express.Response} res - A Response Object
    * @param {express.NextFunction} next - A Next Object
    * @returns {void} Nothing. Will use res to send back results
    * */
  public add(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.itemfieldController.add(req.body, function(error?: Error, result?:  Item) {
      if(error) {
        return res.status(error.Status()).json(error.toJSON())
      } else {
        if (result) {
          return res.status(201).json(result.toJSON())
        } else {
          return res.status(500).send('Strange Error')
        }
      }
    })
  }
  /** Update an Entry to the Database
    * @param {express.Request} req - A Request Object
    * @param {express.Response} res - A Response Object
    * @param {express.NextFunction} next - A Next Object
    * @returns {void} Nothing. Will use res to send back results
    * */
  public update(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.itemfieldController.update(req.params.id, req.body, function(error?: Error, result?: Item) {
      if(error) {
        return res.status(error.Status()).json(error.toJSON())
      } else {
        if (result) {
          return res.status(200).json(result.toJSON())
        } else {
          return res.status(500).send('Strange Error')
        }
      }
    })
  }
  /** Delete an Entry in the Database
    * @param {express.Request} req - A Request Object
    * @param {express.Response} res - A Response Object
    * @param {express.NextFunction} next - A Next Object
    * @returns {void} Nothing. Will use res to send back results
    * */
  public delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.itemfieldController.delete(req.params.id, function(error?: Error, result?: boolean) {
      if(error) {
        return res.status(error.Status()).json(error.toJSON())
      } else {
        if (result) {
          return res.status(200).json(result)
        } else {
          return res.status(500).send('Strange Error')
        }
      }
    })
  }

  /** Add final Routes to exoress.Router
    * @param {express.Router} req - A Router Object
    * @returns {express.Router} The Router with Working Paths
    * */
  public addRoutes(router: express.Router): express.Router {
    var self = this
    router.get("/items", function(req, res, next) {
      self.list(req, res, next)
    })
    router.get("/items/:id",function(req, res, next) {
      self.get(req, res, next)
    })
    router.post("/items",function(req, res, next) {
      self.add(req, res, next)
    })
    router.put("/items/:id", function(req, res, next) {
      self.update(req, res, next)
    })
    router.delete("/items/:id", function(req, res, next) {
      self.delete(req, res, next)
    })
    return router
  }
}


export default ItemRoutes