import ctrlr from './controllers'

const baseUrl = '/api'
const moduleUrl = '/pkgs'

export default (app) => {
  app.route(baseUrl + moduleUrl)
    .get(ctrlr.listPkg)
    .post(ctrlr.createPkg)
    .put(ctrlr.updatePkg)
    .delete(ctrlr.deletePkg)
  app.route(baseUrl + moduleUrl + '/:id')
    .get(ctrlr.readPkg)
  app.route(baseUrl + moduleUrl + '/:id/commits')
    .post(ctrlr.createCommit)
}