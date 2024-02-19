const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { generalResponse, catchAsync} = require("../utils/commonUtils");
const { check, query, validationResult } = require("express-validator");
const router = express.Router();
const configService = require("../services/config");

router.get("", [],
    catchAsync(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
        }

        const config = await configService.getConfig();
        const responseBody = {
            config: {
                wordsPerDay: config.wordsPerDay,
                t0shiftTime: config.t0shiftTime,
                t1shiftTime: config.t1shiftTime,
                t2shiftTime: config.t2shiftTime,
                t3shiftTime: config.t3shiftTime,
                t4shiftTime: config.t4shiftTime,
            }
        }

        res.status(StatusCodes.OK).send(responseBody);
    })
);

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

router.post("", [
        check("config.wordsPerDay", "wordsPerDay must be provided").isNumeric(),
        check("config.t0shiftTime", "t0shiftTime must be provided").isNumeric(),
        check("config.t1shiftTime", "t1shiftTime must be provided").isNumeric(),
        check("config.t2shiftTime", "t2shiftTime must be provided").isNumeric(),
        check("config.t3shiftTime", "t3shiftTime must be provided").isNumeric(),
        check("config.t4shiftTime", "t4shiftTime must be provided").isArray(),
    ],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      const modifiedCount = await configService.updateConfig(req.body.config);

      res.status(StatusCodes.OK).send({ updatedCount: modifiedCount });
    })
);



module.exports = router;
