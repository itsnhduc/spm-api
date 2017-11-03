import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PkgCommitSchema = new Schema({
  version: {type: String, required: true},
  sha: {type: String, required: true},
  created_date: {type: Date, default: Date.now},
})

export default mongoose.model('PkgCommits', PkgCommitSchema)