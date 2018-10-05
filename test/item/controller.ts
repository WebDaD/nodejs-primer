/* global it, describe, before, after */
import Item from '../../lib/item/object'
import MockDB from '../mockDB'
import ItemController from '../../lib/item/controller'
import * as assert from 'assert'

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
let ic:ItemController

describe('Item : Controller', function () {
  before('Create Object', function () {
    mockDB = new MockDB()
    ic = new ItemController(mockDB)
  })
  describe('list', function () {
    it('should return all entries', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', objects, true)
      ic.list(function(error, result) {
        if(error) {
          done(error)
        } else {
          if(!result) {
            done('No Result!')
          } else {
            assert.equal(result.length, 2)
            assert.deepEqual(result[0].toJSON(), objects[0])
            done()
          }
        }
      })
    })
    it('should return 404 if there are no entries', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', [], true)
      ic.list(function(error, result) {
        if(error) {
          assert.equal(error.Status(), 404)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 500 for an sql-error', function(done) {
      mockDB.set('SELECT id, name, descr, locked FROM item', [], false)
      ic.list(function(error, result) {
        if(error) {
          assert.equal(error.Status(), 500)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
  })
  describe('get', function () {
    it('should return one entry with the id', function(done) {
      let id = objects[0].id
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + id, [objects[0]], true)
      ic.get(id.toString(), function(error, result) {
        if(error) {
          done(error)
        } else {
          if(!result) {
            done('No Result!')
          } else {
            assert.deepEqual(result.toJSON(), objects[0])
            done()
          }
        }
      })
    })
    it('should return 404 if there is no entry with the id', function(done) {
      let id = objects[0].id
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + id, [], true)
      ic.get(id.toString(), function(error, result) {
        if(error) {
          assert.equal(error.Status(), 404)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 500 for an sql-error', function(done) {
      let id = objects[0].id
      mockDB.set('SELECT id, name, descr, locked FROM item WHERE id=' + id, [], false)
      ic.get(id.toString(), function(error, result) {
        if(error) {
          assert.equal(error.Status(), 500)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
  })
  describe('add', function () {
    it('should add entry and return entry with the id', function(done) {
      let object = objects[0]
      mockDB.set('INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")', {insertId:1}, true)
      ic.add(object, function(error, result) {
        if(error) {
          done(error)
        } else {
          if(!result) {
            done('No Result!')
          } else {
            assert.deepEqual(result.toJSON(), objects[0])
            done()
          }
        }
      })
    })
    it('should return 408 on invalid entry', function(done){
      ic.add({}, function(error, result) {
        if(error) {
          assert.equal(error.Status(), 408)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 500 for an sql-error', function(done) {
      let object = objects[0]
      mockDB.set('INSERT INTO item (name, descr, locked) VALUES ("'+object.name+'","'+object.descr+'","'+(object.locked ? '1':'0')+'")', {}, true)
      ic.add(object, function(error, result) {
        if(error) {
          assert.equal(error.Status(), 500)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
  })
  describe('update', function () {
    it('should update entry and return entry with the id', function(done) {
      let object = objects[0]
      let id = object.id
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + id, {affectedRows:1}, true)
      ic.update(id.toString(), object, function(error, result) {
        if(error) {
          done(error)
        } else {
          if(!result) {
            done('No Result!')
          } else {
            assert.deepEqual(result.toJSON(), object)
            done()
          }
        }
      })
    })
    it('should return 404 if id is not ok', function(done) {
      let object = objects[0]
      let id = object.id
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + id, {affectedRows:0}, true)
      ic.update(id.toString(), object, function(error, result) {
        if(error) {
          assert.equal(error.Status(), 404)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 408 on invalid entry', function(done){
      ic.update('1', {}, function(error, result) {
        if(error) {
          assert.equal(error.Status(), 408)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 500 for an sql-error', function(done) {
      let object = objects[0]
      let id = object.id
      mockDB.set('UPDATE item SET name="'+object.name+'", descr="'+object.descr+'", locked="'+(object.locked ? '1':'0')+'" WHERE id=' + id, {}, false)
      ic.update(id.toString(), object, function(error, result) {
        if(error) {
          assert.equal(error.Status(), 500)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
  })
  describe('delete', function () {
    it('should delete entry and return true', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:1}, true)
      ic.delete(id.toString(), function(error, result) {
        if(error) {
          done(error)
        } else {
          if(!result) {
            done('No Result!')
          } else {
            assert.equal(result, true)
            done()
          }
        }
      })
    })
    it('should return 404 if id is not ok', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:0}, true)
      ic.delete(id.toString(), function(error, result) {
        if(error) {
          assert.equal(error.Status(), 404)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
    it('should return 500 for an sql-error', function(done) {
      let id = objects[0].id
      mockDB.set('DELETE FROM item WHERE id=' + id, {affectedRows:0}, false)
      ic.delete(id.toString(), function(error, result) {
        if(error) {
          assert.equal(error.Status(), 500)
          done()
        } else {
          done('Should have an Error')
        }
      })
    })
  })
})