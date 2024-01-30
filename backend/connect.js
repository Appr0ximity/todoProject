const mongoose = require("mongoose")

const db = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://hvshekharmurthy:admin@c1.ujnqw74.mongodb.net/")

        console.log("Connection setup successfully")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = db