import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

const server = express();
server.use(express.json())

mongoose.connect('mongodb+srv://rafaelmerlotto:Q9BoA1DB34vwOZwP@cluster0.exfvtoj.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    server.emit('ok')
})
.catch(e => console.log(e))


server.get('/',  (req, res) => {
    res.status(200).send({msg: 'server is on fire 🎉🚀'})
})


const PORT =  4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})