import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    client_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    budget: {type: String, required: true},
    status: {type: String, value: "OPEN" | "PENDING" | "CLOSED", default: "OPEN"}
})

export default mongoose.model('Project', ProjectSchema)