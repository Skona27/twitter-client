// requirements
const express = require("express"),
    router = express.Router();

// root route
router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    })
});

module.exports = router;