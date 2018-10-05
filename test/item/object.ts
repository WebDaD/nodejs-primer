/* global it, describe, before, after */
import Item from '../../lib/item/object'
import * as assert from 'assert'

let object1:Item = new Item(
  'name1',
  'descr1',
  true,
  '1',
)
let object1JSON:any = {
  id: 1,
  name: 'name1',
  descr: 'descr1',
  locked: true
}
let objectNoIDJSON:any = {
  name: 'name1',
  descr: 'descr1',
  locked: true
}
let objectNoIDOutputJSON:any = {
  id: undefined,
  name: 'name1',
  descr: 'descr1',
  locked: true
}
let objectInvalidJSON:any = {
  id: 1,
  descr: 'descr1',
  locked: true
}


describe('Item : Object', function () {
  describe('toJSON', function () {
    it('should return a valid JSON', function () {
      assert.deepEqual(object1.toJSON(), object1JSON)
    })
  })
  describe('fromJSON', function () {
    it('should return a valid Item', function(){
      let object2 = Item.fromJSON(object1JSON)
      if(object2) {
        assert.deepEqual(object2.toJSON(), object1JSON)
      } else {
        assert.fail('Object undefined')
      }
    })
    it('should return a valid Item, id is missing', function(){
      let object2 = Item.fromJSON(objectNoIDJSON)
      if(object2) {
        assert.deepEqual(object2.toJSON(), objectNoIDOutputJSON)
      } else {
        assert.fail('Object undefined')
      }
    })
    it('should return undefined on invalid Input', function(){
      let object2 = Item.fromJSON(objectInvalidJSON)
      assert.equal(object2, undefined)
    })
  })
  describe('isValid', function(){
    it('should return true if all inputs are there', function() {
      assert.strictEqual(Item.isValid(object1JSON), true)
    })
    it('should return true if only ID is missing', function() {
      assert.strictEqual(Item.isValid(objectNoIDJSON), true)
    })
    it('should return false if not all inputs are there', function() {
      assert.strictEqual(Item.isValid(objectInvalidJSON), false)
    })
  })

})
