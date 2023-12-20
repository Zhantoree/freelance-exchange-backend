import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isBanned: {type: Boolean, default: false},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    roles: [{type: String, ref: 'Role'}]
})

export default model('User', UserSchema)