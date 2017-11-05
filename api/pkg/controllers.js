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
  // clone
  const query = {...req.query}
  // parse limit
  const limit = parseInt(req.query.limit) || 0
  delete query.limit
  // parse order
  const orderBy = req.query.order
  const orderType = req.query.order_type == 'desc' ? -1 : 1
  delete query.order
  delete query.order_type
  // parse regex name search
  const searchName = req.query.name_regex
  if (searchName) query.name = { $regex: '^spm-pkg-' + searchName }
  delete query.name_regex
  // execute find
  Pkgs.find(query, (err, pkg) => handler(err, res, pkg)).limit(limit).sort({[orderBy]: orderType})
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