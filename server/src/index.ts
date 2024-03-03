import express from 'express'
import { configDotenv } from 'dotenv'
import bodyParser from 'body-parser';
import { app } from './routes/managerStore';
import { admin } from './routes/admin';
import { user } from './routes/user';


configDotenv({ path: ".env" })
const server = express();

server.use(express.json())
server.use(bodyParser.json())
server.use('/app', app)
server.use('/admin', admin)
server.use('/user', user)



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { app };

