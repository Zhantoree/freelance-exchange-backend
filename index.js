const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {LMStudioClient} = require("@lmstudio/sdk");
const mainRouter = require("./router/index");

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

// Routes
app.use('/', mainRouter)

let history = [
    {role: "system", content: "You are a helpful AI assistant."}
];

let model; // Declare model variable in the higher scope

async function chatWithAi(prompt) {
    // Add prompt to history
    history.push({role: "user", content: prompt});

    // Predict!
    const prediction = model.respond(history);
    let answer = '';
    for await (const text of prediction) {
        answer += text;
    }
    history.push({role: "assistant", content: answer});

    return {
        lastAnswer: answer,
        history: history
    };
}

app.post('/hi', async(req, res, next) => {
    const answer = await chatWithAi("Say, Bye ");
    return res.json(answer);
});

const start = async () => {
    try {
        // Create a client to connect to LM Studio, then load a model
        const client = new LMStudioClient();
        model = await client.llm.load("TheBloke/Llama-2-7B-Chat-GGUF/llama-2-7b-chat.Q3_K_L.gguf", { noHup: true });
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
