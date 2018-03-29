/* global it, describe, before, after */
var assert = require('assert')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var ExampleController = require(path.join(__dirname, '../lib/example.js'))
var dbFolder = 'test-database'
var dbFullPath = path.join('/tmp', dbFolder)
var object1 = {
  id: '01',
  name: 'Max Mustermann'
}
var object2 = {
  id: '02',
  name: 'Erika Musterfrau'
}
var object3 = {
  id: '03',
  name: 'Malte Mustersohn'
}
var object4 = {
  id: '03',
  name: 'Elina Mustertochter'
}
var TexampleController
describe('UT01: example', function () {
  before('UT01-00: Create Example Folder', function (done) {
    fs.mkdir(dbFullPath, function (error) {
      if (error) {
        done(error)
      } else {
        fs.writeFile(path.join(dbFullPath, object1.id + '.json'), JSON.stringify(object1), function (error) {
          if (error) {
            done(error)
          } else {
            fs.writeFile(path.join(dbFullPath, object2.id + '.json'), JSON.stringify(object2), function (error) {
              if (error) {
                done(error)
              } else {
                done()
              }
            })
          }
        })
      }
    })
  })
  describe('UT01-01: Object Contructor', function () {
    it('UT01-01-01: should return an error with no path', function (done) {
      try {
        ExampleController()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-01-02: should return an exampleController object with a correct path', function (done) {
      try {
        var exampleController = new ExampleController(dbFullPath)
        assert.equal(exampleController.path, dbFullPath)
        assert.equal(exampleController.accounts.length, 2)
        done()
      } catch (error) {
        done(error)
      }
    })
  })
  describe('UT01-02: exampleController.get', function () {
    before(function (done) {
      TexampleController = new ExampleController(dbFullPath)
      done()
    })
    it('UT01-02-01: should throw an error with no callback given', function (done) {
      try {
        TexampleController.get(object1.id)
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-02-02: should throw an error with no id given', function (done) {
      try {
        TexampleController.get()
        done(new Error('there should be an error here'))
      } catch (error) {
        done()
      }
    })
    it('UT01-02-03: should callback an error with a not existing id given', function (done) {
      TexampleController.get('#', function (error, example) {
        if (error) {
          assert.equal(error.message, 'No Example with ID # found.')
          done()
        } else {
          done(new Error('there should be an error here'))
        }
      })
    })
    it('UT01-02-04: should callback an object with a correct id given', function (done) {
      TexampleController.get(object1.id, function (error, example) {
        if (error) {
          done(error)
        } else {
          assert.equal(example.id, object1.id)
          done()
        }
      })
    })
    after(function (done) {
      TexampleController = {}
      done()
    })
  })
  describe('UT01-03: exampleController.list', function () {
    it('UT01-03-01: should throw an error with no callback given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.list()
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-03-02: should callback all accounts', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      TexampleController.list(function (error, examples) {
        if (error) {
          done(error)
        } else {
          assert.equal(examples.length, 2)
          assert.equal(examples[0].id, object1.id)
          assert.equal(examples[1].id, object2.id)
          TexampleController = {}
          done()
        }
      })
    })
  })
  describe('UT01-04: exampleController.add', function () {
    it('UT01-04-01: should throw an error with no data given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.add()
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-04-02: should throw an error with no callback given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.add(object3)
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-04-03: should callback an object with data given and exampleController should contain this object', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      TexampleController.add(object3, function (error, obj) {
        if (error) {
          done(error)
        } else {
          assert.equal(obj.id, object3.id)
          TexampleController.list(function (error, examples) {
            if (error) {
              done(error)
            } else {
              assert.equal(examples.length, 3)
              assert.equal(examples[0].id, object1.id)
              assert.equal(examples[1].id, object2.id)
              assert.equal(examples[2].id, object3.id)
              TexampleController = {}
              done()
            }
          })
        }
      })
    })
  })
  describe('UT01-05: exampleController.update', function () {
    it('UT01-05-01: should throw an error with no id given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.update()
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-05-02: should throw an error with no data given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.update(object3.id)
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-05-03: should throw an error with no callback given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.update(object3.id, object4)
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-05-04: should callback an error with a not existing id given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      TexampleController.update('#', object4, function (error, obj) {
        if (error) {
          done()
        } else {
          done(new Error('there should be an error here'))
        }
      })
    })
    it('UT01-05-05: should callback an object with id given and database should contain this changed object', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      TexampleController.update(object3.id, object4, function (error, obj) {
        if (error) {
          done(error)
        } else {
          assert.equal(obj.id, object3.id)
          TexampleController.list(function (error, examples) {
            if (error) {
              done(error)
            } else {
              assert.equal(examples.length, 3)
              assert.equal(examples[0].id, object1.id)
              assert.equal(examples[1].id, object2.id)
              assert.equal(examples[2].id, object3.id)
              assert.equal(examples[2].mupro_name, object4.mupro_name)
              TexampleController = {}
              done()
            }
          })
        }
      })
    })
  })
  describe('UT01-06: exampleController.delete', function () {
    it('UT01-06-01: should throw an error with no id given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.delete()
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-06-02: should throw an error with no callback given', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      try {
        TexampleController.delete(object3.id)
        done(new Error('there should be an error here'))
      } catch (error) {
        TexampleController = {}
        done()
      }
    })
    it('UT01-06-03: should callback true with id given and exampleController should not contain this object', function (done) {
      TexampleController = new ExampleController(dbFullPath)
      TexampleController.delete(object3.id, function (error, value) {
        if (error) {
          done(error)
        } else {
          assert.equal(value, true)
          TexampleController.list(function (error, examples) {
            if (error) {
              done(error)
            } else {
              assert.equal(examples.length, 2)
              assert.equal(examples[0].id, object1.id)
              assert.equal(examples[1].id, object2.id)
              TexampleController = {}
              done()
            }
          })
        }
      })
    })
  })
  after('UT01-99: remove ExampleController Folder', function (done) {
    rimraf(dbFullPath, function (error) {
      if (error) {
        done(error)
      } else {
        done()
      }
    })
  })
})
