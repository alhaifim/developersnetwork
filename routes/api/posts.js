// this is where you can add posts, comments, etc
const express = require('express');
const router = express.Router();

// @ route          GET api/posts
// @ desc           Test route
//@access           Public.  Does not need jsonwebtoken

router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
