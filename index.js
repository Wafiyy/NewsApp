const express = require("express")
const app = express()
const { PORT } = require("./config.js")
const debug = require("debug")("express")
const model = require('./src/middlewares')
const path = require('path')
const { post } = require("./src/controllers/post")
const ejs = require('ejs')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set("views",path.join(__dirname,"src","views"))
app.use(express.static(path.join(__dirname,"src","public")))
app.use(express.json())
app.use(model({databasePath: path.join(process.cwd(),"src","db")}))


app.post("/post",post)
app.get("/", async (req,res) => {
	res.render("index",{data: req.readFile("posts")})
})
app.get("/posts/:id", async (req,res) => {
	const posts = req.readFile("posts")
	const { id } = req.params
	const post = posts.find(el => el.id == id)
	if(!post){
		return res.status(404).send('Post not found')
	}
	let dt = new Date(post.date)
	post.date = `${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getDate().toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`
	
	res.render("post",{post,})
})
app.get("/admin",(req,res) => {
	res.render("admin")
})


app.listen(PORT,() => debug("starting in %d",PORT))