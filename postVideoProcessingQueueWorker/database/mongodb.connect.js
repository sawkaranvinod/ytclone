import {connect} from "mongoose";

export async function connectDB(uri) {
    try {
        await connect(uri);
        console.log("database is connected sucessfully");
        return true;
    } catch (error) {
        console.log("error in the main connect db function of db",error.message);
        process.exit(-1);
    }
}