import mongoose from 'mongoose'
const Schema = mongoose.Schema

import { PkgCommitSchema } from './commit/models'

const PkgSchema = new Schema({
  name: {type: String, required: true},
  created_date: {type: Date, default: Date.now},
  author: {type: String, required: true},
  description: {type: String, required: false},
  language: {type: String, required: true},
  commits: {type: [PkgCommitSchema], default: []},
  docs_url: {type: String, required: true},
  clone_url: {type: String, required: true},
  tarball_url: {type: String, required: true},
  install_count: {type: Number, default: 0},
  download_count: {type: Number, default: 0}
})

export default mongoose.model('Pkgs', PkgSchema)
