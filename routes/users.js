var express = require('express');
var router = express.Router();
var session=require('express-session')
var {UserModel}=require('../models/userModel.js')

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{message:'Register'});
});

router.get('/login', function(req, res, next){
	res.render('login', {message:'Login'})
})

router.get('/admin', function(req, res, next){
	res.render('admin', {message:'Admin'})
})

//db-ում գրանցում է նոր user

router.post('/register', function(req, res, next) {

	

	 	if(!req.body.email || !req.body.password){
          res.status("400");
          res.send("Invalid details!");
        } else {
        			//ստեղծելու է նոր user
			    async function createUser(email, password) {
			      return new UserModel({
			        email:email,
			        password:password
			        
			      }).save()
			  	}

			  	//ստուգում է նույն mail-ը db-ու կա , եթե կա նոր user չի ավելացնում

			  	(async()=>{

			  		const email=req.body.email

				  	async function findUser(){
				  		return await UserModel.findOne({email})
				  		
				  	}

			  		let user=await findUser(email)
			  		//եթե mail-ը նոր է, ավելացնում է user
				  	if (!user){
				  		await createUser(req.body.email, req.body.password)
				  		console.log("Created")
				  		res.redirect("/users/login")
					}	else{
					  		res.render('register',{message:'This mail is taken'});
					  	}

			  	})()
    		};
		

});


router.post('/login', function(req, res, next){
	if(!req.body.email || !req.body.password){
		 
        res.render('login', {message: "Please enter both email and password"});
     	
	}else{

		let email=req.body.email
		UserModel.findOne({email}).exec(function(err, user){
			if (err) {
				res.send({message:'err'});
				return;
			}

			if(!user){
				res.render('login', {message:"User is not found"})
			}else{

				user.comparePassword(req.body.password, function(err, isMatch){
					if (err) {
					return	res.render('login',{message:'Error'})
					}
					
					if(isMatch){

						res.redirect('/users/admin')
						
						}else{
			              return res.render('login', {message:'Incorrect password'})
			              
			            }
				})

			}
		})
		

	
		
	};
	
})



module.exports = router;
