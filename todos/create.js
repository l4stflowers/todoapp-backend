'use strict'

module.exports.create = (event, context, callback) => {
  const response = {
    statusCode: 201
  }
  callback(null, response)
}
