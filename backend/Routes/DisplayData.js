const express = require('express');
const User = require('../models/User');
const router = require('./CreatUser');

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})

module.exports = router;