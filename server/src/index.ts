import express from 'express'
import { configDotenv } from 'dotenv'
import bodyParser from 'body-parser';
import { app } from './routes/managerStore';
import { admin } from './routes/admin';
import { user } from './routes/user';
import { payment } from './payment/paymentController';
import cors from "cors"
import { userNotRegistred } from './routes/userNotRegistred';
import { userRegistred } from './routes/userRegistred';


configDotenv({ path: ".env" })
const server = express();

server.use(cors());
server.use(express.json())
server.use(bodyParser.json())
server.use('/app', app)
server.use('/admin', admin)
server.use('/user', user)
server.use('/payment', payment)
server.use('/userRegistred', userRegistred)
server.use('/userNotRegistred', userNotRegistred)



const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { app };

