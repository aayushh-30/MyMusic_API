const mongoose = require("mongoose")

const connect_DB = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URI)
        // console.log("MongoDB Connected!!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connect_DB