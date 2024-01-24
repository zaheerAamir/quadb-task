const express = require("express")
const { Client } = require("pg")
require("dotenv/config")

const app = express()
const PORT = 8080


const client = new Client({
    user: process.env.POSTGRES_USER,
    host: '172.17.0.2',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
})
client.connect()

app.get("/healthCheck", (req, res) => {
    res.send("Server is Healthy!")
})

app.get("/getData", async (req, res) => {
    
    const query = `SELECT * FROM trade;`
    client.query(query, (err, resp) => {
        if (err) throw err 
        console.log(resp.rows) 
        res.json(resp.rows)
        client.end()
    })
})

app.listen(PORT, () => { console.log(`Server running on Port: ${PORT}`) })