var mongoose= require('mongoose');

//Connecting to the Database
mongoose.connect('mongodb://localhost/BUS');
const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

//-----------------------------------------------------------


//Initializing the collections
var User=require('../models/user'); //User here is the object, but actual collections name is 'users'
var Bus=require('../models/bus');
var Ticket=require('../models/ticket');

//-----------------------------------------------------------


// Index page route
module.exports.index=function(req,res){
	res.render('login', {title: 'Login'});
};



//Login Controler
//TODO:
//		Show appropriate reaction of log in succesful or not. (using JS ???)
// 		

module.exports.tryLogin=function(req,res,next){

	
	console.log('post login details sent:')
	console.log(req.body.email);
	console.log(req.body.pass);
	//authenticate the user
	User.authenticate(req.body.email, req.body.pass , function(err,currUser){
		if(err || !currUser){
			var err = new Error('Wrong email or password.');
			err.status = 401;
			return next(err);
		}
		else{
			console.log("log in succesful!");
			req.session.user_id=currUser._id;
			return res.redirect('/dash');
		}
	});

};

module.exports.dash=function(req,res, next){
	console.log('dash id: '+req.session.user_id);
	User.findById(req.session.user_id)
	.exec(function(err,currUser){
		if(err){
			return next(err);
		}
		else{
			if(currUser== null){
				var err = new Error('Not authorized! Go back!');
				err.status = 400;
				return next(err);
			}
			else{
				return res.render('dash', {userObj:currUser});	//may have some error
			}
		}
	});
}

module.exports.trySignup=function(req,res){
	res.render('signup', {title:'Signup'});
}

//Signup controller
//Todo: check if user already exists

module.exports.signupForm=function(req,res){
	var new_user={
				name:req.body.fname,
				username:req.body.email,
				password:req.body.pass
			};

	var data= new User(new_user);

	data.save(function(err){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		else {
			console.log('Signup succesful!');
			console.log(req.body.email);
			console.log(req.body.pass);
			res.render('login', {title: 'Login'});
		}

	});
		
};

//TODO:
//		1. assign correct seat no
//		2. decrease seat availability
module.exports.bookTicketForm=function(req,res){
	var new_ticket={
				bus_id:req.body.bus_id,
				owner_id:req.body.owner_id,
				source:req.body.source,
				bus_name:req.body.bus_name,
				destination:req.body.destination,
				seat_no:req.body.seat_no
			};

	var data= new Ticket(new_ticket);

	data.save(function(err){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		else {
			console.log('Ticket Booked succesful!');
			// console.log(req.body.email);
			// console.log(req.body.pass);
			// res.render('login', {title: 'Login'});
		}

	});
		
};


module.exports.cancelTicket=function(req,res){
	var ticket_id=req.query.ticket_id;

	Ticket.remove({_id:ticket_id }, function(err){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		else {
			console.log('Ticket Cancelled succesful!');
		}

	});
		
};



module.exports.searchBus=function(req,res){
	var src=req.query.source;
	var dest=req.query.destination;
	console.log(src);
	Bus.find({source:src, destination:dest},function(err,docs){
		if(err){
			res.status(404).send();
		}
		else{
			res.json(docs);
		}
	});

};

module.exports.getUserTickets=function(req,res){
	var user_id=req.query.user_id;
	console.log('get tickets for:'+user_id);
	Ticket.find({owner_id:user_id},function(err,docs){
		if(err){
			res.status(404).send();
		}
		else{
			console.log(docs);
			res.json(docs);
		}
	});
};

module.exports.getBusDetails=function(req,res){
	var bus_id=req.query.bus_id;
	console.log('get bus details for:'+ bus_id);
	Bus.findOne({_id:bus_id},function(err,bus){
		if(err){
			res.status(404).send();
		}
		else{
			console.log(bus);
			console.log(bus.bus_name);
			console.log(bus.stops);
			res.json(bus);
		}
	});
};



