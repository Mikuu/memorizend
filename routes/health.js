const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(StatusCodes.OK).send({
    alive: true
  })
});

module.exports = router;
