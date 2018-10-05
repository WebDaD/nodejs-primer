"use strict"

import * as http from 'http'
import * as express from "express"
import * as mysql from "mysql"
import * as bodyParser from 'body-parser'
import ItemController from "./lib/item/controller"
import ItemRoutes from "./lib/item/routes"

class App {
  public app: express.Application
  private router: express.Router
  private itemController: ItemController
  private itemRoutes: ItemRoutes
  private mysqlConnection: mysql.Connection

  constructor(mysqlConfig: mysql.ConnectionConfig) {
    let self = this
    this.app = express()
    this.app.use(bodyParser.json())

    this.mysqlConnection = mysql.createConnection(mysqlConfig)

    this.itemController= new ItemController(this.mysqlConnection)
    this.itemRoutes = new ItemRoutes(this.itemController)


    this.router = express.Router()
    this.router.get("/", function(req, res) {
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
      res.json({
        links: {
          items: fullUrl + "api/items",
          _health: fullUrl + "api/_health",
        }
      })
    })
    this.router.get("/_health", function(req, res) {
      // TODO: Tests
      res.send('Alles gut')
    })
    
    this.router = this.itemRoutes.addRoutes(this.router)

    this.app.use(this.router)
  }
}

let configFile : any
if (process.argv.length >= 3) {
  configFile = process.argv[2]
} else {
  configFile = './config.json'
}
const config: any = require(configFile)

let mysqlConfig: mysql.ConnectionConfig  = config.database

let myApp: App = new App(mysqlConfig)
myApp.app.set('port', config.port)

const server = http.createServer(myApp.app)
server.listen(config.port)
console.log('Server is running on Port ' + config.port)