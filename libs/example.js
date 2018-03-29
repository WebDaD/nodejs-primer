/**
 * @overviewExample Lib
 * @module examplecontroller
 * @author Dominik Sigmund
 * @version 0.9
 * @description Gives CRUD Access to JSON-Files with Things in a given folder
 * @memberof nodejs-primer
 * @requires module:jsonfile
 * @requires module:fs
 */
var jsonfile = require('jsonfile')
const fs = require('fs')
/** Creates a instance of class ExampleController
 * @class ExampleController
 * @throws {Error} Error
 * @param {string} path - A path to the json-Files
 * @returns {ExampleController} The Object
 * */
function ExampleController (path) {
  if (!path) {
    throw new Error('A path must be given')
  }
  var self = {}
  self.path = path
  self.examples = []
  fs.readdirSync(path).forEach(function (file) {
    self.examples.push(jsonfile.readFileSync(path + '/' + file))
  })
  self.get = getExample
  self.list = listExamples
  self.add = addExample
  self.update = updateExample
  self.delete = deleteExample
  return self
}
/** get an Example by his ID
 * @throws {Error} Error
 * @param {string} id - An ID for an Example
 * @param {ExampleController~exampleCallback} callback - A Callback with an error or the Example
 * @returns Nothing
 * */
function getExample (id, callback) {
  if (!id) {
    throw new Error('An id must be given')
  }
  if (!callback) {
    throw new Error('A callback must be given')
  }
  var example = this.examples.filter(function (example) {
    return example.id === id
  })
  if (example.length === 1) {
    return callback(null, example[0])
  } else {
    return callback(new Error('No Example with ID ' + id + ' found.'))
  }
}
/** get all Examples
 * @throws {Error} Error
 * @param {ExampleController~examplesCallback} callback - A Callback with an error or the Examples
 * @returns Nothing
 * */
function listExamples (callback) {
  if (!callback) {
    throw new Error('A callback must be given')
  } else {
    callback(null, this.examples)
  }
}
/** create a new Example
 * @param {object} data - Example Information in JSON Form
 * @param {ExampleController~exampleCallback} callback - A Callback with an error or the Example
 * @returns Nothing
 * */
function addExample (data, callback) {
  if (!data) {
    throw new Error('Data must be given')
  }
  if (!callback) {
    throw new Error('A callback must be given')
  }
  var self = this
  data.id = data.info.id
  self.examples.push(data)
  jsonfile.writeFile(self.path + '/' + data.id + '.json', data, function (err) {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
}
/** update an existing Example
 * @throws {Error} Error
 * @param {string} id - An ID for an Example
 * @param {object} data - Example Information in JSON Form
 * @param {ExampleController~exampleCallback} callback - A Callback with an error or the Example
 * @returns Nothing
 * */
function updateExample (id, data, callback) {
  if (!id) {
    throw new Error('An id must be given')
  }
  if (!data) {
    throw new Error('Data must be given')
  }
  if (!callback) {
    throw new Error('A callback must be given')
  }
  var self = this
  var i = 0
  self.examples.forEach(function (example, index, array) {
    i++
    if (example.id === id) {
      array[index] = data
      jsonfile.writeFile(self.path + '/' + id + '.json', data, function (err) {
        if (err) {
          return callback(err)
        } else {
          return callback(null, data)
        }
      })
    } else {
      if (i === self.examples.length) {
        return callback(new Error('ID not found'))
      }
    }
  })
}
/** delete an existing Example
 * @throws {Error} Error
 * @param {string} id - An ID for an Example
 * @param {ExampleController~deleteCallback} callback - A Callback with an error or true for deletion
 * @returns Nothing
 * */
function deleteExample (id, callback) {
  if (!id) {
    throw new Error('An id must be given')
  }
  if (!callback) {
    throw new Error('A callback must be given')
  }
  var self = this
  self.examples = self.examples.filter(function (account) {
    return account.id !== id
  })
  fs.unlink(self.path + '/' + id + '.json', function (error) {
    if (error) {
      callback(error)
    } else {
      callback(null, true)
    }
  })
}

module.exports = ExampleController

/**
  * This callback is displayed as part of the ExampleController class.
  * @callback ExampleController~exampleCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {object} Example
  */
/**
  * This callback is displayed as part of the ExampleController class.
  * @callback ExampleController~examplesCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {array} Examples
  */
/**
  * This callback is displayed as part of the ExampleController class.
  * @callback ExampleController~deleteCallback
  * @param {object} Error or null
  * @param {object.status} Number of Error (Uses HTTP-Status)
  * @param {object.message} Custom Error Message
  * @param {bool} deletion
  */
