const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let headers = req.headers
  const x_ms_client_principal = headers ['x-ms-client-principal']
  headers = Object.keys (headers).map (key => {return {key, value: headers [key]}})
  const claims = []
  if (x_ms_client_principal) {
    try {
      const decoded = jwt.decode(x_ms_client_principal, {complete: true})
      if (decoded && decoded.header) {
        decoded.header.claims.map (claim => {claims.push ({typ: claim.typ, val: claim.val}) })
      }
    }
    catch (err) {
      // ignore
    }
  }
  res.render('index',
    {
      title: 'XPEH',
      headers,
      claims,
      people: [
        {lastName: 'Parfenova', firstName: 'Olga', state: 'warning'},
        {lastName: 'Parfenova', firstName: 'Maria', state: 'info'},
        {lastName: 'Parfenov', firstName: 'Vlad', state: 'danger'},
        {lastName: 'Parfenov', firstName: 'Vladimir', state: 'success'}
      ]
    });
});

module.exports = router;
