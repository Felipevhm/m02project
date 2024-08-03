const express = require("express")
const cors = require('cors')
const routes = require("./routes/routes")
const connection = require("./database/connection")
const APP_PORT = process.env.APP_PORT

class Server {
    
    constructor(server = express()) {
         this.middlewares(server)
        this.database()
        server.use(routes)
        this.initializeServer(server)
    }

    async middlewares(server) {
        console.log("Running middlewares")
        // server.use(cors()) 
        server.use(express.json())
        console.log("Middlewares ran successfully")
    }

    async database() {
        try {
            console.log("\nConnecting to database...")
            await connection.authenticate()
        } catch (error) {
            console.log("Error while connecting to database: ", error)
        }
    }

    async initializeServer(server) {
        server.listen(APP_PORT, () => {
            console.log(`Server running on port: ${APP_PORT}.`)
        })
    }
}

module.exports = { Server }