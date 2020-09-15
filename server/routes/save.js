const express = require('express');
const cors = require('cors');
const router = express.Router();
const path = require('path');
const crypto = require('crypto')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');



const fs = require('fs');
const moment = require('moment');
const google = require('../../GDrive');

//const db = require('../../db/index.js');


router.post('/', async (req, res) => {
  try {

    let currDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(currDate);
    const { data } = req.body;
    const dataBuffer = new Buffer.from(data, 'base64');
    const fileStream = fs.createWriteStream(`${currDate}.mp4`, { flags: 'a' });
    fileStream.write(dataBuffer)
    console.log('writing data...');

    fileStream.on('finish', () => {
      console.log('finished saving!')

    })
    fileStream.end();
    return res.json({ gotit: true });
  } catch (error) {
    console.log(error);
    return res.json({ gotit: false });
  }
});


module.exports = router;