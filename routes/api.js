const express = require("express");
const router = express.Router();
const { validate } = require('../core/helper');


router.post("/post", (req, res) => {
    const rules = {
        name: 'required|min:3|max:20',
        password: 'required|min:6',
        email: 'required|email'
    };

    const errors = validate(req.body, rules); // اینجا helper صدا زده میشه
    if (errors) return res.status(400).json({ errors });

    res.send(req.body);


});

module.exports = router;
