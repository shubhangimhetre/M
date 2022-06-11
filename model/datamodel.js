const mongoose=require('mongoose');
Schema = mongoose.Schema;

var dataSchema = new Schema({
    fileName:{type:String},
    file: { type: String, trim: true, required: true},
    user_id:{type:Schema.ObjectId,ref:'user'},
    token :{type:Number}
},{timestamps:true});

module.exports=mongoose.model('data',dataSchema);