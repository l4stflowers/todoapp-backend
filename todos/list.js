'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = (event, context, callback) => {
  var expressinAttributeNames = {}
  expressinAttributeNames['#userId'] = 'userId'

  var expressionAttributeValues = {}
  expressionAttributeValues[':userIdVal'] = event.pathParameters.userId

  var filterExpression

  if (event.queryStringParameters != null && event.queryStringParameters.state != null) {
    expressinAttributeNames['#state'] = 'state'
    expressionAttributeValues[':stateVal'] = event.queryStringParameters.state
    filterExpression = '#state = :stateVal'
  }

  const params = {
    TableName: process.env.TODO_TABLE,
    ExpressionAttributeNames: expressinAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    KeyConditionExpression: '#userId = :userIdVal',
    FilterExpression: filterExpression
  }

  dynamoDb.query(params, (error, result) => {
    if (error) {
      console.error(error)
      // TODO Response 'error' schema json
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
