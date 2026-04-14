import { connect } from "mongoose";
import { ENV } from "./env";
let mongodbUrl: string=ENV.MONGODB_URI;

if(!mongodbUrl){
    throw new Error("MONGODB_URI is not defined in environment variables");
}

const cached=global.mongoose;

if(!cached){
    global.mongoose={conn:null,promise:null};
}

const connectDb=async()=>{
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise=connect(mongodbUrl).then((c=>c.connection));
    }
    try {
        cached.conn=await cached.promise;
    } catch (error) {
        throw error;
    }
    return cached.conn;
}


export default connectDb;