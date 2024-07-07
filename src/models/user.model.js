import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        return next()
    }
    return next()
})
userSchema.methods.isPasswordCorrect = async function (password) { // custom method to compare the password while login
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}
const User = mongoose.model("User", userSchema)

export { User }