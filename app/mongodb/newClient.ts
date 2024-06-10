require("dotenv").config()
const { MongoClient } = require("mongodb")

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

module.exports = client
