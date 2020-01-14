// this will handel getting json webtoken for authentication 

const express = require('express');
const router = express.Router();

// @ route          GET api/auth
// @ desc           Test route
//@access           Public.  Does not need jsonwebtoken

router.get('/',(req, res)=> res.send('Auth Route'));

module.exports = router;
