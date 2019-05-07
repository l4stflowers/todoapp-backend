'use strict'

const AWS = require('aws-sdk')
const ULID = require('ulid')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const body = JSON.parse(event.body)

  // TODO Add validations.

  const params = {
    TableName: process.env.TODO_TABLE,
    Item: {
      userId: event.pathParameters.userId,
      id: ULID.ulid(),
      title: body.title,
      memo: body.memo,
      due_date: body.due_date,
      repeat: body.repeat,
      reminds: body.reminds,
      state: 'created'
    }
  }

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error)
      // TODO Response 'error' schema json
      callback(null, {
        sstatusCode: error.statusCode,
        headers: { 'content-type': 'text/plain' },
        body: 'Couldn\'t create the todo.'
      })
      return
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
