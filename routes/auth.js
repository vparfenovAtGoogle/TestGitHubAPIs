const express = require('express')

const router = express.Router()
router.get('/login', (req, res) => {  
  res.render('login')
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