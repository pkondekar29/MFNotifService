const express = require('express');

const router = express.Router();

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

module.exports = router;