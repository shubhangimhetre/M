const joi=require('@hapi/joi');
const { nextTick } = require('process');


const registerValidation=(data)=>{

    const schema=joi.object ({
        username: joi.string().min(6).email(),
        password: joi.string().min(6).required()
    })
    
    return schema.validate(data);
   
}


const loginValidation=(data)=>{
    const schema=joi.object ({
        username: joi.string().min(6).email(),
        password: joi.string().min(6).required()
    })
    return schema.validate(data);
}



module.exports={registerValidation,loginValidation};
