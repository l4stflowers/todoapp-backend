'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.update = (event, context, callback) => {
  const body = JSON.parse(event.body)

  // TODO Add validations.

  const params = {
    TableName: process.env.TODO_TABLE,
    ExpressionAttributeNames: {
      '#title': 'title',
      '#memo': 'memo',
      '#state': 'state'
    },
    ExpressionAttributeValues: {
      ':titleVal': body.title,
      ':memoVal': body.memo,
      ':stateVal': body.state
    },
    Key: {
      userId: event.pathParameters.userId,
      id: event.pathParameters.id
    },
    UpdateExpression: 'SET #title = :titleVal, #memo = :memoVal, #state = :stateVal'
  }

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error)
      // TODO Add 404 error handling.
      // TODO Response 'error' schema json
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the todo.'
      })
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    }
    callback(null, response)
  })
}
