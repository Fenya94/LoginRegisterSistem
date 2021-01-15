const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});




UserSchema.pre('save', function presave(next){
	const user=this;

	if(!user.isModified('password'))
		return next();

	return bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err)

	return bcrypt.hash(user.password, salt , function(err, hash){
		if (err) return next(err)
			user.password=hash;
		return next();
		});
	});
});

UserSchema.methods.comparePassword = function comparePassword(oldpassword, cb){
	bcrypt.compare(oldpassword, this.password, (err, isMatch)=>{
		if (err) return cb(err);
		return cb(null, isMatch);
	});
};




const UserModel=mongoose.model('user', UserSchema)

// var testUser= new UserModel({
// 	username:'Fenya',
// 	email:'fenya1234.ru',
// 	password:'1234'
// })
// testUser.save(function(err){
// 	if (err) throw err
// })

module.exports={UserModel}