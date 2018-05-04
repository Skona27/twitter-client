// requirements
const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Twitter = require('twitter');

// authorize twitter API requests
function Auth(accessToken, accessSecret) {
    return new Twitter({
        consumer_key: 'aFl1jCx4pLbVddJGNkpjVMCUj',
        consumer_secret: 'aAdkA86tfRDUhzr2e6tos5QIh1KBakOzU87VURNOiazpJa40Mm',
        access_token_key: accessToken,
        access_token_secret: accessSecret
    });
}

router.get('/login', passport.authenticate('twitter'));

router.get('/return', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => { res.redirect('/') });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get("/statuses/user_timeline", (req, res) => {
    const params = { screen_name: req.user.data._json.screen_name,count: 10 };

    Auth(req.user.accessToken, req.user.accessSecret).get('statuses/user_timeline', params)
    .then(tweets => { res.json(tweets) })
    .catch(err => { console.log(err) })
});

router.get("/followers/list", (req, res) => {
    const params = { screen_name: req.user.data._json.screen_name, count: 5 };

    Auth(req.user.accessToken, req.user.accessSecret).get('followers/list', params)
    .then(data => { res.json(data) })
    .catch(err => { console.log(err) })
});

router.get("/friends/list", (req, res) => {
    const params = { screen_name: req.user.data._json.screen_name, count: 5 };

    Auth(req.user.accessToken, req.user.accessSecret).get('friends/list', params)
    .then(data => { res.json(data) })
    .catch(err => { console.log(err) })
});

router.post("/statuses/update", (req, res) => {
    Auth(req.user.accessToken, req.user.accessSecret).post('statuses/update', req.body)
    .then(data => { res.json(data) })
    .catch(err => { console.log(err) })
});

module.exports = router;