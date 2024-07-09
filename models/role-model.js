import {Schema, model} from 'mongoose'

const Role = new Schema({
    value: {type: String, value: "CLIENT" | "ADMIN" | "WORKER" | "MODERATOR", unique: true, default: 'CLIENT'}
})

export default model('Role', Role)