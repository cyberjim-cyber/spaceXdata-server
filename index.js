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
	// const baseCollection = client.db("egency").collection("social");
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
	// const par=parseInt(year)
	// console.log(par)
	
	spaceCollection.find({launch_year : year.year})

	.toArray((err,documents)=>{
		res.send(documents)
		// console.log(documents)
			console.log( year.launch_year)
	})

})


// app.post("/handletrue",(req,res)=>{

// 	const yeartrue=req.body
// 	console.log(req.body)
	
	
// 	spaceCollection.find({true : yeartrue.t})

// 	.toArray((err,documents)=>{
// 		res.send(documents)
// 		console.log(documents)
		
// 	})

// })

app.post("/handlefalse",(req,res)=>{

	const yearfalse=req.body
	console.log(req.body)
	
	
	spaceCollection.find({fl : yearfalse.f})

	.toArray((err,documents)=>{
		res.send(documents)
		console.log(documents)
		
	})

})








































// app.post("/addappointment",(req, res)=>{

// const appointment=req.body
// console.log(appointment)
// patientCollection.insertOne(appointment)
// .then(result=>{

//   res.send(result.insertedCount >0)
// })


// })



// app.post("/appointmentDate",(req, res)=>{

// 	const date=req.body;
// 	console.log(date)
// 	patientCollection.find({date: date.date})
// .toArray((err,documents)=>{

// 	res.send(documents)
// })
	
// 	})


// app.post('/adddoctor',(req, res)=>{


// 	const file=req.files.file;
// const name=req.body.name;
// const email=req.body.email;
// console.log(name,file,email)

// file.mv(`${__dirname}/doctors/${file.name}`,err=>{

// 	if(err){
// 		console.log(err)
// 		return res.status(500).send({masg :"incorrecrt"})
// 	}

// 	return res.send({name: file.name,path:`/${file.name}`})
// })

// })








// app.post("/addwork",(req, res) => {

// const work=req.body;
// console.log(work)
// baseCollection.insertMany(work)
// .then(result=>{

// 	res.send(result.insertedCount)
// })

// })

// app.get("/showwork",(req, res) => {


// baseCollection.find({}).limit(20)
// .toArray((err,documents)=>{

// res.send(documents)

// })
// })



// app.post("/addres",(req,res)=>{
// const event=req.body
// eventsCollection.insertOne(event)
// .then(result=>{
// 	res.send(result.insertedCount)
// })

// })




// app.get("/event/",(req, res)=>{


// console.log(req.query.email)

// eventsCollection.find({ email: req.query.email})
// .toArray((err,documents)=>{

// 	res.send(documents)
// })

// })



// app.delete("/delete/:taskId",(req, res)=>{


// 	console.log(req.params.taskId)
// 	eventsCollection.deleteOne({_id: ObjectId(req.params.taskId)})
// 	.then(result=>{
// 		res.send(result.deletedCount)
// 	})
// })



//

	
	/* API: Adding base data */
	// app.post("/addBaseData", (req, res) => {
	// 	const baseData = req.body;
	// 	baseCollection.insertMany(baseData).then((result) => {
	// 		console.log(result);
	// 		console.log(result.insertedCount, "All Data Inserted ✅");
	// 		res.send(result.insertedCount);
	// 	});
	// });




	/* API: Getting Base data on home page */
	// app.get("/home", (req, res) => {
	// 	baseCollection.find({}).toArray((err, docs) => {
	// 		res.send(docs);
	// 	});
	// });

	/* API: Register Volunteer */
	// app.post("/registerVolunteer", (req, res) => {
	// 	const newVolunteer = req.body;
	// 	eventsCollection.insertOne(newVolunteer).then((result) => {
	// 		console.log(result, "Task Inserted ✅");
	// 		res.send(result.insertedCount > 0);
	// 	});
	// });



	/* API: Getting events by email */
	// app.get("/events", (req, res) => {
	// 	console.log(req.query.email);
	// 	eventsCollection.find({ email: req.query.email }).toArray((error, documents) => {
	// 		res.send(documents);
	// 		console.log(error);
	// 	});
	// });



	/* API: Deleting an event task */
	// app.delete("/deleteTask/:id", (req, res) => {
	// 	console.log(req.params.id);
	// 	eventsCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
	// 		console.log(result, "Deleted ⚠️");
	// 		res.send(result.deletedCount > 0);
	// 	});
	// });




	/* ADMIN API: Create new event task */
	// app.post("/admin/addEvent", (req, res) => {
	// 	const newTask = req.body;
	// 	baseCollection.insertOne(newTask).then((result) => {
	// 		console.log(result, "Task Inserted ✅");
	// 		res.send(result.insertedCount > 0);
	// 	});
	// });

	/* ADMIN API: Getting volunteer list */
	// app.get("/loadVolunteerList", (req, res) => {
	// 	eventsCollection.find({}).toArray((err, docs) => {
	// 		res.send(docs);
	// 		console.log(docs);
	// 	});
	// });




	/* ADMIN API: Deleting an event task */
	// app.delete("/admin/deleteTask/:id", (req, res) => {
	// 	console.log(req.params.id);
	// 	eventsCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
	// 		console.log(result, "Task deleted ⚠️");
	// 		res.send(result.deletedCount > 0);
	// 	});
	// });

	/* API : Default */
	app.get("/", (req, res) => {
		res.send("Hello from Express AtP is workings 👨🏻‍💻");
	});
});

app.listen(process.env.PORT || port);














