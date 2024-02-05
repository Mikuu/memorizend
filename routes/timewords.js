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
            chinese: word.chinese,
            exampleSentence: word.exampleSentence,
            pronunciation: word.pronunciation,
            difficulty: word.difficulty,
            status: word.status,
            startedOn: word.startedOn,
            completedOn: word.completedOn
        }
      });

      res.status(StatusCodes.OK).send({ words: responseWords});
    })
);

router.post("/:time", [
        check('complete', '"complete" must be provided as array').isArray()
    ],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      let updatedCount;
      switch (req.params.time) {
          case "t0":
              updatedCount = await timewordsService.completeT0Words(req.body.complete);
              break;
          case "t1":
              updatedCount = await timewordsService.completeT1Words(req.body.complete);
              break;
          case "t2":
              updatedCount = await timewordsService.completeT2Words(req.body.complete);
              break;
          case "t3":
              updatedCount = await timewordsService.completeT3Words(req.body.complete);
              break;
          case "crossDays":
              updatedCount = await timewordsService.completeCrossDaysWords(req.body.complete);
              break;
      }

      res.status(StatusCodes.OK).send({ updatedCount });
    })
);

module.exports = router;
