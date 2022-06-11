const user = require('../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validate');

exports.user_register = async (req, res) => {
    const found = await user.findOne({ username: req.body.username });
    if (found != null) {
        res.status(400).send('This email is already registered please try with another email');
    } else {
        const { error } = await registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            try {
                token = jwt.sign({ email: req.body.email }, "iamshubhangi");
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const new_user = new user({
                    username: req.body.username,
                    password: hashedPassword
                })
                const saved_user = await new_user.save();
                res.cookie("user", token)
                    .send({ message: "User Registered Successfully... ", Data: saved_user });
            } catch (err) {
                res.status(400).send(err);
            }
        }
        
    }
}

exports.user_login = async (req, res) => {
    const { error1 } = await loginValidation(req.body);
    if (error1) {
        return res.status(400).send(error.details[0].message);
    } else {
        const found = await user.findOne({ username: req.body.username });
        if (found != null) {
            try {
                const validPass = await bcrypt.compare(req.body.password, found.password);
                if (validPass) {
                    res.status(200).send({ error: false, message: "login successfully..", data: found});
                } else {
                    res.status(400).send("Password is wrong..");
                }
            } catch (err) {  res.status(400).send(err); }
        } else {
            res.status(400).send('This email is not registered.');
        }
    }
}