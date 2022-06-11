const mongoose=require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, trim: true, required: true},
    password:{ type: String, unique: true,required: true}
},{timestamps:true});

module.exports=mongoose.model('user',userSchema);