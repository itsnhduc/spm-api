import mongoose from 'mongoose'

const Pkgs = mongoose.model('Pkgs')
const PkgCommits = mongoose.model('PkgCommits')

const handler = (err, res, resJson) => {
  if (err) {
    res.send(err)
    console.error(err)
  }
  res.json(resJson)
}

exports.listPkg = (req, res) => {
  Pkgs.find({...req.query}, (err, pkg) => handler(err, res, pkg))
}

exports.readPkg = (req, res) => {
  const pkgId = req.params.id
  Pkgs.findById(pkgId, (err, pkg) => handler(err, res, pkg))
}

exports.createPkg = (req, res) => {
  const newPkg = new Pkgs(req.body)
  newPkg.save((err, pkg) => handler(err, res, pkg))
}

exports.updatePkg = (req, res) => {
  const pkgId = req.params.id
  Pkgs.update({_id: pkgId}, req.body, (err, pkg) => handler(err, res, pkg))
}

// exports.deletePkg = (req, res) => {
//   const pkgId = req.params.id
//   Pkgs.remove({_id: pkgId}, (err, pkg) => handler(err, res, { message: `Package successfully deleted` }))
// }

exports.createCommit = (req, res) => {
  const newCommit = new PkgCommits(req.body)
  const pkgId = req.params.id
  Pkgs.findOneAndUpdate({_id: pkgId}, {$push: {
    commits: {
      $each: [newCommit],
      $position: 0
    }
  }}, (err, pkg) => handler(err, res, pkg))
}