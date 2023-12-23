import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    client_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    budget: {type: String, required: true},
    status: {type: "OPEN" | "PENDING" | "CLOSED", required: true}
})

export default mongoose.model('Project', ProjectSchema)