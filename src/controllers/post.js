function post(req,res){
	try{
		let {title,main,html} = req.body
		title = title.toUpperCase().trim()

		console.log(req.body)
		if(!title || title.length >200 || title.length <5){
			throw new Error("Title is required and title length must be less than 100")
		}
	
		if(!html){
			throw new Error("html required")
		}
		
		const posts = req.readFile("posts")
	
		req.body.id = posts.at(-1)?.id+1 || 1
		req.body.date = new Date
	
		posts.push(req.body)
	
		req.writeFile("posts",posts)
		res.json({
			ok:true,
			message:"ok",
			post:req.body
		})
	}
	catch(e){
		console.log(e)
	}
}
module.exports = {
	post
}