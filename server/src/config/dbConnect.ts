import mongoose from 'mongoose';
import { app } from '../../index'

async function dbConnect() {
  await mongoose.connect(process.env.DB_CONN_STRING!)
    .then(() => {
      app.emit('ok')
    })
    .catch(e => console.log(e))
} 

export default dbConnect