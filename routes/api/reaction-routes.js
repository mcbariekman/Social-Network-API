const router = require("express").Router();
const {User} = require("../../models");

router.get('/', async (req,res) => {
    const allUsers = await User.find({});
    
    res.json(allUsers)
})

router.post('/', async (req, res) => {
    const newUser = await User.create(req.body);

    res.json(newUser)
})

module.exports = router