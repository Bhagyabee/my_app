const mongoose=require('mongoose');
const passportlocalmongoose = require('passport-local-mongoose');

const UserSchema =new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    name:{
        type:String,
        required:true

    }
},{
    timestamps: true
});

UserSchema.plugin(passportlocalmongoose);

const User=mongoose.model('User', UserSchema);
module.exports=User;