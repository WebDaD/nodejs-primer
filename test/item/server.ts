// startup server. LIVE check --> need a running mysql-Database as in config.test.json
import * as assert from 'assert'
import * as mysql from 'mysql'
import * as superagent from 'superagent'
import * as child_process from 'child_process'
import * as fs from 'fs'
const importer = require('node-mysql-importer')
let testConfig = require('../config.test.json')

let object = {
  id: 3,
    name: 'name3',
    descr: 'descr3',
    locked: true
}
let objectNoID = {
    name: 'name3',
    descr: 'descr3',
    locked: true
}
let server:any
let baseUri: any
describe('Item : API', function () {
  before('Create App-Server and check for Database', function (done) {
    let mysqlConnection = mysql.createConnection(testConfig.database)
    mysqlConnection.connect(function(err) {
      if(err) {
        console.log(err)
        done(err)
      } else {
        importer.config(testConfig.database)
        importer.importSQL(__dirname + '/../test.database.sql').then( function() {
          mysqlConnection.end()
            server = child_process.spawn('node', ['dist/app.js', './test/config.test.json'])
            baseUri = 'http://localhost:' + testConfig.port
            setTimeout(function () {
              done()
            }, 1000)
        }).catch( function(err:any) {
          console.log(err)
          done(err)
        })
      }
    })
  })
  describe('GET "/items"', function () {
    it('should have res.status == 200 and res.json on entries', function(done) {
      superagent.get(baseUri + '/items').end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, 200)
        var result = JSON.parse(res.text)
        assert.equal(result.length, 2)
        assert.equal(result[0].id, 1)
        done()
      })
    })
  })
  describe('GET "/items/:id"', function () {
    it('should have res.status == 200 and res.json on entry with ID', function(done) {
      let id = '1'
      superagent.get(baseUri + '/items/' + id).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, 200)
        var result = JSON.parse(res.text)
        assert.equal(result.id, 1)
        done()
      })
    })
    it('should have res.status == 404 on no entries with ID', function(done) {
      let id = '99'
      superagent.get(baseUri + '/items/' + id).end(function (err, res) {
        assert.equal(err.status, 404)
        done()
      })
    })
  })
  describe('POST "/items"', function () {
    it('should have res.status == 201 and res.json on good entry with ID', function(done){
      superagent.post(baseUri + '/items').send(objectNoID).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, 201)
        var result = JSON.parse(res.text)
        assert.equal(result.id, object.id)
        superagent.get(baseUri + '/items').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, 200)
          var result = JSON.parse(res.text)
          assert.equal(result.length, 3)
          assert.equal(result[2].id, 3)
          done()
        })
      })
    })
    it('should have res.status == 408 on invalid entry', function(done){
      superagent.post(baseUri + '/items').send({}).end(function (err, res) {
        assert.equal(err.status, 408)
        done()
      })
    })
  })
  describe('PUT "/items/:id"', function () {
    it('should have res.status == 200 and res.json on good entry with ID', function(done) {
      superagent.put(baseUri + '/items/1').send(objectNoID).end(function (err, res) {
        assert.ifError(err)
        assert.equal(res.status, 200)
        var result = JSON.parse(res.text)
        assert.equal(result.id, 1)
        superagent.get(baseUri + '/items/1').end(function (err, res) {
          assert.ifError(err)
          assert.equal(res.status, 200)
          var result = JSON.parse(res.text)
          assert.equal(result.name, object.name)
          done()
        })
      })
    })
    it('should have res.status == 404 on invalid ID', function(done) {
      superagent.put(baseUri + '/items/99').send(objectNoID).end(function (err, res) {
        assert.equal(err.status, 404)
        done()
      })
    })
    it('should have res.status == 408 on invalid entry', function(done) {
      superagent.put(baseUri + '/items/3').send({}).end(function (err, res) {
        assert.equal(err.status, 408)
        done()
      })
    })
  })
  describe('DELETE "/items/:id"', function () {
    it('should have res.status == 200 and res.json on valid ID', function(done) {
      superagent.delete(baseUri + '/items/1').end(function (err, res) {
        assert.equal(res.status, 200)
        var result = JSON.parse(res.text)
        assert.equal(result, true)
        done()
      })
    })
    it('should have res.status == 404 on invalid entry', function(done) {
      superagent.delete(baseUri + '/items/99').end(function (err, res) {
        assert.equal(err.status, 404)
        done()
      })
    })
  })

  after('Kill Server', function (done) {
    server.kill('SIGHUP')
    setTimeout(function () {
      done()
    }, 1000)
  })
})