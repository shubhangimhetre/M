var newOTP = require('otp-generators');
const user = require('../model/usermodel');
const APIURL = "http://localhost:3000";
const data = require('../model/datamodel');

exports.upload = async (req, res) => {
    var otp = newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false });
    const user_id = req.params.user_id;
    const found = await user.findOne({ _id: user_id });
    if (found != null) {
        if (req.files) {
            var file = req.files.file;
            var fileName = file.name;
            var filePath = './uploads/' + fileName;
            file.mv(filePath, async (err) => {
                if (err) return res.status(400).send(err);
            })
            try {
                let filedata = new data({
                    fileName: fileName,
                    file: APIURL + '/uploads/' + fileName,
                    token: otp,
                    user_id: user_id
                })
                const saved_data = await filedata.save();
                res.status(200).send({ message: "Data uploaded..", Data: saved_data });
            } catch (err) { res.status(400).send(err); }
        }
    } else {
        res.status(400).send("User not registered..");
    }
}

exports.view = async (req, res,) => {
    const user_id = req.params.user_id;
    try {
        const found = await data.find({ user_id: user_id });
        if (found.length != 0) {
            res.status(200).send(found);
        } else {
            res.status(400).send("Data not found");
        }
    } catch (err) { res.status(400).send(err); }
}

exports.remove = async (req, res) => {
    const file_id = req.params.file_id;
    try {
        const found = await data.findOne({ _id: file_id });
        if (found.length != 0) {
            data.deleteOne({ _id: file_id }, function (err) {
                if (err) res.status(400).send(err);
                res.status(200).send({ message: "file removed" });
            });
        } else {
            res.status(400).send("Data not found");
        }

    } catch (err) { res.status(400).send(err); }
}

exports.download = async (req, res) => {
    const file_id = req.query.file_id;
    const token = req.query.token;
    try {
        const found = await data.findOne({ _id: file_id });
        if (found != null) {
            if (token == found.token) {
                res.status(200).send({ file: found.file });
            } else {
                res.status(200).send("Token not matched");
            }
        } else {
            res.status(200).send("Data not found");
        }
    } catch (err) { res.status(400).send(err); }
}