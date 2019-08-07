const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let headers = req.headers
  const claims = [{type: 'MAPA3M', value: 'KPACOTA'}]
  const x_ms_client_principal = headers ['x-ms-client-principal']
  headers = Object.keys (headers).map (key => {
    claims.push ({type: key, value: headers [key]})
    if (key == 'x-ms-client-principal') claims.push ({type: key.toUpperCase (), value: headers [key]})
    return {key, value: headers [key]}
  })
  if (x_ms_client_principal) {
    try {
      const decoded = jwt.decode(x_ms_client_principal, {complete: true})
      if (decoded) {
        claims.push ({type: 'Decoded', value: JSON.stringify (decoded)})
        if (decoded.header) {
          decoded.header.claims.map (claim => {claims.push ({typ: claim.typ, val: claim.val}) })
        }
      }
    }
    catch (err) {
      // ignore
      claims.push ({type: 'Error', value: err})
    }
  }
  else {
    claims.push ({type: 'x_ms_client_principal', value: x_ms_client_principal})
  }
  res.render('index',
    {
      title: 'Test Node.JS with AAD Authentication',
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
