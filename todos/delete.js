'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    Key: {
      userId: event.pathParameters.userId,
      id: event.pathParameters.id
    }
  }

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove the todo.'
      })
      return
    }

    const response = {
      statusCode: 204,
      body: JSON.stringify({})
    }
    callback(null, response)
  })
}
