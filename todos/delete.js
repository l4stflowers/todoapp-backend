'use strict'

module.exports.create = (event, context, callback) => {
  const response = {
    statusCode: 204
  }
  callback(null, response)
}
