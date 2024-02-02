const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { generalResponse, catchAsync} = require("../utils/commonUtils");
const { check, query, validationResult } = require("express-validator");
const router = express.Router();
const timewordsService = require("../services/timewords");

router.get("/:time", [],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      let words;
      switch (req.params.time) {
          case "t0":
              words = await timewordsService.getT0Words();
              break;
          case "t1":
              words = await timewordsService.getT1Words();
              break;
          case "t2":
              words = await timewordsService.getT2Words();
              break;
          case "t3":
              words = await timewordsService.getT3Words();
              break;
          case "crossDays":
              words = await timewordsService.getCrossDaysWords();
              break;
      }

      const responseWords = words.map(word => {
        return {
          wid: word.wid,
          word: word.word,
          status: word.status,
          completedAt: word.completedAt
        }
      });

      res.status(StatusCodes.OK).send({ words: responseWords});
    })
);

router.post("/:time", [],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      switch (req.params.time) {
          case "t0":
              await timewordsService.completeT0Words();
              break;
          case "t1":
              await timewordsService.completeT1Words();
              break;
          case "t2":
              await timewordsService.completeT2Words();
              break;
          case "t3":
              await timewordsService.completeT3Words();
              break;
          case "crossDays":
              await timewordsService.completeCrossDaysWords();
              break;
      }

      res.status(StatusCodes.OK).send({});
    })
);

module.exports = router;
