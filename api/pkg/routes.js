import ctrlr from './controllers'

const baseUrl = '/api'
const moduleUrl = '/pkgs'

export default (app) => {
  app.route(baseUrl + moduleUrl)
    .get(ctrlr.listPkg)
    .post(ctrlr.createPkg)
  app.route(baseUrl + moduleUrl + '/:id')
    .get(ctrlr.readPkg)
    .put(ctrlr.updatePkg)
    // .delete(ctrlr.deletePkg)
  app.route(baseUrl + moduleUrl + '/:id/commits')
    .post(ctrlr.createCommit)
  app.route(baseUrl + moduleUrl + '/attr/:attr')
    .get(ctrlr.getPkgAttr)
}