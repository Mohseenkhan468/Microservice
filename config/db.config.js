import mongoose from 'mongoose'

async function connectDB(DB_URL){
    try{
        await mongoose.connect(DB_URL)
    }catch(err){
        console.log('err',err)
    }
}
export default connectDB