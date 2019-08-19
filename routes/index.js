const express = require('express')
const router = express.Router()

const people = [
  {lastName: 'Goubanov', firstName: 'Rodion', state: 'warning'},
  {lastName: 'Apraj', firstName: 'Shashikant', state: 'info'},
  {lastName: 'Dementiev', firstName: 'Daniel', state: 'danger'},
  {lastName: 'Parfenov', firstName: 'Vladimir', state: 'success'}
]

/* GET home page. */

const renderHomePage = function(req, res, next) {
  res.render('index',
    {
      title: 'Test Node.JS with AAD Authentication',
      people
    })
}

const renderLoginPage = function(req, res, next) {
  res.render('login', { layout: 'loginlayout', title: "Login with one of the following Identity Providers" })
}

router.get('/', renderLoginPage)

module.exports = router;
