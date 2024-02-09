const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { generalResponse, catchAsync} = require("../utils/commonUtils");
const { check, query, validationResult } = require("express-validator");
const router = express.Router();
const wordsService = require("../services/wordssvc");

router.get("/bulk", [],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      const words = await wordsService.fetchWords({});
      const allWords = words.map(word => {
        return {
          wid: word.wid,
          word: word.word,
          chinese: word.chinese,
          exampleSentence: word.exampleSentence,
          pronunciation: word.pronunciation,
          status: word.status,
          difficulty: word.difficulty,
          inDay: word.inDay,
          startedOn: word.startedOn,
          completedM5On: word.completedM5On,
          completedM30On: word.completedM30On,
          completedH12On: word.completedH12On,
          completedD1On: word.completedD1On,
          completedD2On: word.completedD2On,
          completedD4On: word.completedD4On,
          completedD7On: word.completedD7On,
          completedD15On: word.completedD15On,
          completedOn: word.completedOn
        }
      });

      res.status(StatusCodes.OK).send({ words: allWords});
    })
);

router.post("/bulk", [
      check("words", "words must be provided").isArray()
    ],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      const createdWordsCount = await wordsService.createWordsInBulk(req.body.words);
      res.status(StatusCodes.OK).send({ createdWordsCount });
    })
);

router.delete("/bulk", [],
    catchAsync(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(generalResponse(errors.array()).failed);
      }

      const deletedWordsCount = await wordsService.cleanWords();
      res.status(StatusCodes.OK).send({ deletedWordsCount });
    })
);

module.exports = router;
