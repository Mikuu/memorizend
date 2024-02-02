const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { generalResponse, catchAsync} = require("../utils/commonUtils");
const { check, query, validationResult } = require("express-validator");
const router = express.Router();
const configService = require("../services/config");

router.post("/init", [],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      await configService.initializeConfig();

      res.status(StatusCodes.OK).send({});
    })
);

module.exports = router;
