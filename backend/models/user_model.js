const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default:false },
});

//secure the password with bcrypt ...hash convert the normal password to the complex password string (acting as a middleware) before saving the user details
userSchema.pre('save',  async function (){
    // console.log("pre method", this);
    const user = this;

    if(!user.isModified("password")) {
      next();
    }

    try {
      const salthRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, salthRound);
      user.password = hash_password;
    } catch (error) {
      next(error);
    }
})

//compare password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password); 
}

//json web token [with the help of "methods we can create how many function we want to create"]
userSchema.methods.generateToken = function() {
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, {expiresIn: "30d"}
      );
    } catch (error) {
      console.error(error);
    }
}






// define the collection name
const User = new mongoose.model('User', userSchema);

module.exports = User;















/*

Yeh code ek user ki schema ke "save" function ko define karta hai. Jab bhi ek naya user save kiya jata hai, yeh code chalta hai.

Pehle, yeh check karta hai ki kya password modified hua hai ya nahi. Agar password modified nahi hai, matlab agar user ne koi naya password nahi diya hai, toh woh seedha agle step pe jaata hai.

Agar password modified hai, toh code uss password ko encrypt karta hai. Encrypt karne ke liye, woh pehle ek random "salt" generate karta hai, fir uss salt ke saath user ka password ko secure hash banata hai.

Hashing ka matlab hai ki original password ko ek fixed length ka string mein convert kar diya jata hai, jo ki aam taur pe reverse-engineer nahi ho sakta. Isse user ke passwords ki security badhti hai.

Agar koi error aata hai, jaise ki salt generate nahi ho pa raha ya phir hash nahi ho pa raha, toh woh error ko handle karta hai.

* "10" yahaan bcrypt ke liye "rounds of hashing" ko represent karta hai. Jitne zyada rounds of hashing, utni zyada security hoti hai. 10 rounds of hashing ka matlab hai ki password ko hash karne ke liye 2^10 iterations kiya jayega. Jitne zyada iterations, utni zyada processing power chahiye hash ko crack karne ke liye, jisse security badhti hai. Lekin zyada rounds ka istemal karne se bhi performance pe asar pad sakta hai, isliye ek balance maintain kiya jata hai. Yahaan, 10 rounds ka istemal kiya gaya hai, jo ki aam taur pe recommended hai, kyunki yeh achhi security aur reasonable performance dono provide karta hai.


*/ 