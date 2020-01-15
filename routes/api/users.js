const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // this is installed in node and will help in validation
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// @ route          Post api/users
// @ desc           Register user
//@access           Public.  Does not need jsonwebtoken

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    //to handel the response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Get user
      let user = await User.findOne({ email }); // normally we do email: email but since it has been destructured with the same name
      // findOne is a mongoose query
      //Check if user exists
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm' // default image
      });
      // create an instant of the user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt Password
      const salt = await bcrypt.genSalt(10); // recommended 10 rounds

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return Jsonwebtoken.  the reason for this is when the user register, should be logged in right away
      res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
