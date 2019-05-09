'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    Key: {
      userId: event.pathParameters.userId,
      id: event.pathParameters.id
    }
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error)
      // TODO Response 'error' schema json
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo.'
      })
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response)
  })
}
