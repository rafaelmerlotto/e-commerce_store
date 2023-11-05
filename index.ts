import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { app } from './src/routes/articles';


dotenv.config()
const server = express();
server.use(express.json())
server.use(bodyParser.json())
server.use('/app', app)



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { app };

