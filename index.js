const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fileUpload=require("express-fileupload")
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('doctors'))
app.use(fileUpload())
const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emqen.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
	const spaceCollection = client.db("doctor").collection("spaceXdata2");

	console.log("DB connectedd 🚀");



app.post('/addspace',(req,res)=>{

	console.log(req.body)
	spaceCollection.insertMany(req.body)
	.then(result =>{
		res.send(result)
	})
	
})




app.get("/getspace",(req,res)=>{

	spaceCollection.find({})
	.toArray((err,documents)=>{
		res.send(documents)
	})
})


app.post("/getyear",(req,res)=>{

	const year=req.body
	console.log(req.body)
	
	spaceCollection.find({launch_year : year.year})

	.toArray((err,documents)=>{
		res.send(documents)
		
			console.log( year.launch_year)
	})

})




app.post("/handlefalse",(req,res)=>{

	const yearfalse=req.body
	console.log(req.body)
	
	
	spaceCollection.find({fl : yearfalse.f})

	.toArray((err,documents)=>{
		res.send(documents)
		console.log(documents)
		
	})

})



	/* API : Default */
	app.get("/", (req, res) => {
		res.send("Hello from Express AtP is workings 👨🏻‍💻");
	});
});

app.listen(process.env.PORT || port);














