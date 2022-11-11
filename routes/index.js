//the very root of your application
// to use this router you need to hook up this router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router;