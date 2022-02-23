import express from 'express'
import bodyParser from 'body-parser'
import { connectToMongodb } from './config/mongodb'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectToMongodb()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})
