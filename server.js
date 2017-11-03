import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import Pkgs from './api/pkg/models'
import routes from './api/pkg/routes'
import connectDB from './server/connect-db'

const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// HTTP reqs logger
app.use(morgan('dev'))

// JSON Parser for reqs
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Setup routes
routes(app)

// Open endpoint
app.listen(port, () => {
  console.log(`RESTful API server started on port ${port}`)
})
