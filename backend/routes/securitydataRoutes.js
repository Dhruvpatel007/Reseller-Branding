const express = require('express');
const router = express.Router();
const SecurityData = require('../models/securityData');

router.get('/:type', async (req, res) => {
  try {
    const data = await SecurityData.findOne({ type: req.params.type });
    if (!data) return res.status(404).json({ msg: 'Data not found' });
    res.json(data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


