const express=require('express');
const router=express.Router();
const serve=require('../controllers/user');
const serve2=require('../controllers/data');
const verify=require('../verifytoken');

//user
router.post('/register',serve.user_register);

router.post('/login',verify,serve.user_login);

//fileupload
router.post('/upload/:user_id',verify,serve2.upload);

router.get('/view/:user_id',verify,serve2.view);

router.delete('/remove/:file_id',verify,serve2.remove);

router.get('/download',verify,serve2.download);

module.exports=router;