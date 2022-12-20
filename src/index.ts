import prompts from "prompts"
import { sendMessages } from "./msg";

const ques = async () => {
    const res = await prompts([{
        type: 'text',
        name: 'username',
        message: 'Enter your instagram username?',
        validate: x => x === '' ? "Should not be empty" : true
    },
    {
        type: "text",
        name: "password",
        message: "Enter your instagram password?",
        validate: x => x === '' ? "Should not be empty" : true

    },
    {
        type: "text",
        name: "chat",
        message: "Paste the Chat link?",
        validate: x => x === '' ? "Should not be empty" : true
    },
    {
        type: "text",
        name: "message",
        message: "Enter the message you wish to send?",
        validate: x => x === '' ? "Should not be empty" : true
    },
    {
        type: "number",
        name: "repeat",
        message: "How many times you want it to be sent?",
        initial: 5,
    },
    ]);

    const checkArray = ["username", "password", "chat", "message", "repeat"]

    checkArray.forEach(async x => {
        if (Object.prototype.hasOwnProperty.call(res, x)) { }
        else {
            process.exit(1)
        }
    })
    await sendMessages(res)

};

ques()