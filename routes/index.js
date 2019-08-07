var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let headers = req.headers
  headers = Object.keys (headers).map (key => {return {key, value: headers [key]}})
  res.render('index',
    {
      title: 'XPEH',
      headers: headers,
      people: [
        {lastName: 'Parfenova', firstName: 'Olga', state: 'warning'},
        {lastName: 'Parfenova', firstName: 'Maria', state: 'info'},
        {lastName: 'Parfenov', firstName: 'Vlad', state: 'danger'},
        {lastName: 'Parfenov', firstName: 'Vladimir', state: 'success'}
      ]
    });
});

module.exports = router;
