const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    {
      title: 'Test Node.JS with AAD Authentication',
      people: [
        {lastName: 'Parfenova', firstName: 'Olga', state: 'warning'},
        {lastName: 'Parfenova', firstName: 'Maria', state: 'info'},
        {lastName: 'Parfenov', firstName: 'Vlad', state: 'danger'},
        {lastName: 'Parfenov', firstName: 'Vladimir', state: 'success'}
      ]
    })
})

module.exports = router;
