import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { app } from './src/routes/articles';
import { admin } from './src/routes/admin';

dotenv.config()
const server = express();
server.use(express.json())
server.use(bodyParser.json())
server.use('/app', app)
server.use('/admin', admin)



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { app };

