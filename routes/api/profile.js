// it will have routes that has to do with profile 

const express = require('express');
const router = express.Router();

// @ route          GET api/profile
// @ desc           Test route
//@access           Public.  Does not need jsonwebtoken

router.get('/',(req, res)=> res.send('profile route'));

module.exports = router;
