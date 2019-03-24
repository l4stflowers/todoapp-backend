'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.TODO_TABLE,
    ExpressionAttributeNames: { '#userId': 'userId' },
    ExpressionAttributeValues: { ':val': event.pathParameters.userId },
    KeyConditionExpression: '#userId = :val'
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.'
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
