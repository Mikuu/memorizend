const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(StatusCodes.OK).send({});
});

module.exports = router;
