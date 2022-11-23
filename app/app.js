import express, { response } from 'express'
import dotenv from 'dotenv'
import dbConfig from './db.config.js'
import path from 'path'
import mysql from 'mysql2'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
const __dirname = path.resolve()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pool = mysql.createPool({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB
})

pool.getConnection((err,connection) => {
	if (err) throw err
	console.log('DB is connected as id ' + connection.threadId)
})

app.post('/create', (req,res) => {
	const user = {
		phone: req.body.phone,
		name: req.body.name,
		surname: req.body.surname
	}
	console.log(user)
	pool.query('INSERT INTO users(phone,name,surname) VALUES(?,?,?)', [user.phone, user.name, user.surname], (err,data) => {
		if (err) {
			return console.log(err)
		}
	})
	res.status(200).json({ message: 'succesful!' })
})

app.use(express.static(path.join(__dirname, '/public')))
const urlencodedParser = express.urlencoded({extended: false});

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})


app.listen(process.env.PORT, () => {
	console.log('Listening on port ', process.env.PORT);
})
