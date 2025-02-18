import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Userschema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    avatar:{
        type:String,
    },
    TopicScore:[
        {
            Topic:{
                type:String
            },
            Number:{
                type:Number
            }
        }
    ],
    Interviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Interview"
        }
    ]
} , {timestamps:true});

Userschema.pre('save', function (next) {
    const user = this;
    user.avatar = `https://robohash.org/${user.username}`;

    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
})

const User = mongoose.model("User" , Userschema);

export default User;