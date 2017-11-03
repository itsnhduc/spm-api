import mongoose from 'mongoose'
import mongodbUri from 'mongodb-uri'

export default () => {
  const uriConf = {
    username: process.env.DB_USER || '',
    password: process.env.DB_PWD || '',
    hosts: [
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || ''
      }
    ],
    database: process.env.DB_NAME || 'spm-api-dev',
  // options: {
  //     authSource: '@dmin'
  // }
  }

  mongoose.Promise = global.Promise
  mongoose.connect(mongodbUri.format(uriConf), {useMongoClient: true}, (err) => {
    if (err) throw(err)
    console.log(`Connected to MongoDB at ${uriConf.hosts[0].host}`)
  })
}
