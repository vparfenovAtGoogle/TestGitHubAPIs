const express = require('express')

const router = express.Router()
router.get('/login', (req, res) => {  
  res.render('login')
})
router.get('/debug', (req, res) => {  
  let headers = req.headers
  const claims = []
  function collectClaims (token) {
    try {
      const decoded = JSON.parse (Buffer.from(token, 'base64').toString('binary'))
      if (decoded.claims) {
        decoded.claims.map (claim => {claims.push ({type: claim.typ, value: claim.val}) })
      }
    }
    catch (err) {
      // ignore
      claims.push ({type: 'Error', value: err})
    }
  }
  headers = Object.keys (headers).map (key => {
    return {key, value: headers [key]}
  })
  const x_ms_client_principal = headers ['x-ms-client-principal']
  if (x_ms_client_principal) {
    collectClaims (x_ms_client_principal)
  }
  res.render('debug',
    {
      title: 'Test Node.JS with AAD Authentication environment',
      headers,
      claims
    });
})
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out')
})
router.get('/google', (req, res) => {
  // handle with passport
  res.send('logging in with Google')
})

module.exports = router