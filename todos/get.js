'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#id': 'id'
    },
    ExpressionAttributeValues: {
      ':userIdVal': event.pathParameters.userId,
      ':idVal': event.pathParameters.id
    },
    KeyConditionExpression: '#userId = :userIdVal AND #id = :idVal'
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo.'
      })
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
    callback(null, response)
  })
}
