const express = require('express')
const router = express.Router()

const User = require('../public/models/userModel')

router.get('/', (req, res) => {
    res.send('Hello world')
})


router.get('/createProfile', (req,res) => {
  res.sendFile('createProfile.html', {root: './views/'})
}) 

router.post('/createProfile', (req, res) => {
  User.User.findOne({email: req.body.email}, (err, foundUser) => {
    if(foundUser == null) {
      const testUser = new User.User({
        fullName: 'Adam Jean-Laurent',
        email: 'test@gmail.com',
        DOB: '1-25-98',
        Gender: 'Male',
        Password: 'password123'
      })
      testUser.save()
      return res.status(201).json(testUser);
    }
    else {
      let error = "That user already exists";
      return res.render('createProfile', {error: error});
    }
  })
})

router.get('/makeProfile', (req,res) => {
  res.sendFile('makeProfile.html', {root: './views/'})
}) 


router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

module.exports = router