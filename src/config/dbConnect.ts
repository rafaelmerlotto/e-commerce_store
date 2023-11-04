import mongoose from 'mongoose';
import { server } from '../../index'

async function dbConnect() {
  await mongoose.connect(process.env.DB_CONN_STRING!)
    .then(() => {
      server.emit('ok')
    })
    .catch(e => console.log(e))
} 

export default dbConnect