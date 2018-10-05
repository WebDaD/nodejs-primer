/* global it, describe, before, after */
import MockDB from '../mockDB'
import MockExpress, { MockRequest, MockRouter } from '../mockExpress'
import ItemController from '../../lib/item/controller'
import ItemRoutes from '../../lib/item/routes'
import * as assert from 'assert'
import * as events from 'events'
import { MockResponse } from '../mockExpress';

let objects = [
  {
    id: 1,
    name: 'name1',
    descr: 'descr1',
    locked: true
  },
  {
    id: 2,
    name: 'name2',
    descr: 'descr2',
    locked: true
  }
]

let mockDB:any
let mockExpress:any
let mockRequest:any
let mockResponse:any
let ic:ItemController
let ir:ItemRoutes

let emitter:events.EventEmitter

describe('Item : Routes', function () {
  before('Create Object', function () {
    mockDB = new MockDB()
    mockExpress = new MockExpress()
    mockRequest = new MockRequest()
    mockResponse = new MockResponse()
    ic = new ItemController(mockDB)
    ir = new ItemRoutes(ic)
    emitter = new events.EventEmitter()
  })
  describe('list', function () {
    it('should have res.status == 200 and res.json on entries', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', objects, true)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 200)
        assert.deepEqual(res.Mjson[0], objects[0])
        done()
      })
      ir.list(mockExpress.Request, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 404 on no entries', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', [], true)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 404)
        done()
      })
      ir.list(mockExpress.Request, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 500 on SQL Error', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', [], false)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 500)
        done()
      })
      ir.list(mockExpress.Request, mockResponse, mockExpress.next) 
    })
  })
  describe('get', function () {
    it('should have res.status == 200 and res.json on entry with ID', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + objects[0].id, [objects[0]], true)
      mockRequest.setParams({id:objects[0].id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 200)
        assert.deepEqual(res.Mjson, objects[0])
        done()
      })
      ir.get(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 404 on no entries with ID', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + objects[0].id, [], true)
      mockRequest.setParams({id:objects[0].id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 404)
        done()
      })
      ir.get(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 500 on SQL Error', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + objects[0].id, [], false)
      mockRequest.setParams({id:objects[0].id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 500)
        done()
      })
      ir.get(mockRequest, mockResponse, mockExpress.next) 
    })
  })
  describe('add', function () {
    it('should have res.status == 201 and res.json on good entry with ID', function(done) {
      let object = objects[0]
      mockDB.set('INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")', {insertId:1}, true)
      mockRequest.setBody(object)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 201)
        assert.deepEqual(res.Mjson, object)
        done()
      })
      ir.add(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 408 on invalid entry', function(done) {
      let object = objects[0]
      mockDB.set('INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")', {insertId:1}, true)
      mockRequest.setBody({})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 408)
        done()
      })
      ir.add(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 500 on SQL Error', function(done) {
      let object = objects[0]
      mockDB.set('INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")', {insertId:1}, false)
      mockRequest.setBody(object)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 500)
        done()
      })
      ir.add(mockRequest, mockResponse, mockExpress.next) 
    })
  })
  describe('update', function () {
    it('should have res.status == 200 and res.json on good entry with ID', function(done) {
      let object = objects[0]
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + object.id, {affectedRows:1}, true)
      mockRequest.setParams({id:object.id})
      mockRequest.setBody(object)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 200)
        assert.deepEqual(res.Mjson, object)
        done()
      })
      ir.update(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 408 on invalid entry', function(done) {
      let object = objects[0]
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + object.id, {affectedRows:1}, true)
      mockRequest.setParams({id:object.id})
      mockRequest.setBody({})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 408)
        done()
      })
      ir.update(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 500 on SQL Error', function(done) {
      let object = objects[0]
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + object.id, {affectedRows:1}, false)
      mockRequest.setParams({id:object.id})
      mockRequest.setBody(object)
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 500)
        done()
      })
      ir.update(mockRequest, mockResponse, mockExpress.next) 
    })
  })
  describe('delete', function () {
    it('should have res.status == 200 and res.json on valid ID', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:1}, true)
      mockRequest.setParams({id:id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 200)
        assert.deepEqual(res.Mjson, true)
        done()
      })
      ir.delete(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 404 on invalid entry', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:0}, true)
      mockRequest.setParams({id:id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 404)
        done()
      })
      ir.delete(mockRequest, mockResponse, mockExpress.next) 
    })
    it('should have res.status == 500 on SQL Error', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:0}, false)
      mockRequest.setParams({id:id})
      mockResponse.once('response', function(res:any) {
        assert.equal(res.Mstatus, 500)
        done()
      })
      ir.delete(mockRequest, mockResponse, mockExpress.next) 
    })
  })
  describe('addRoutes', function () {
    it('should contain all routes', function(done) {
      let router:any = new MockRouter()
      router = ir.addRoutes(router)
      assert.equal(router.paths.length,5)
      assert.equal(router.paths[0].verb, 'get')
      assert.equal(router.paths[0].route, '/items')
      assert.equal(router.paths[1].verb, 'get')
      assert.equal(router.paths[1].route, '/items/:id')
      assert.equal(router.paths[2].verb, 'post')
      assert.equal(router.paths[2].route, '/items')
      assert.equal(router.paths[3].verb, 'put')
      assert.equal(router.paths[3].route, '/items/:id')
      assert.equal(router.paths[4].verb, 'delete')
      assert.equal(router.paths[4].route, '/items/:id')
      done()
    })
  })
})