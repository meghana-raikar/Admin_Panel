/* In an Express. js application, a "controller" refers to a part of your code
that is responsible for handling the application 's logic. Controllers are
typically used to process incoming requests, interact with models (data sources),
and send responses back to clients. They help organize your application by
separating concerns and following the MVC (Model-View-Controller) design pattern  */
const User = require("../models/user_model")
const bcrypt = require("bcryptjs")

// * -------------------------------
// * home
// * -------------------------------

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to my page using router");
  } catch (error) {
    console.log(error);
  }
};

// * -------------------------------
// * register
// * -------------------------------

const register = async (req, res) => {
  try {
    const {username, email, phone, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist) {
      return res.status(400).json({msg: "email already exist"});
    }

    // hash the password :--
    // const salthRound = 10;
    // const hash_password = await bcrypt.hash(password, salthRound)

    const userCreated = await User.create({ username, email, phone, password });
      res.status(201).json({msg : "registration successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString()});

  } catch (error) {
      res.status(500).json("registration failed");

  }
};

// * -------------------------------
// * login
// * -------------------------------

  const login = async (req, res) => {
      try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist) {
          return res.status(400).json({message: "Invaild credentials"}) //if user doesnt exist
        }

        // const isUserPresent = await bcrypt.compare(password, userExist.password ); 

        const isUserPresent = await userExist.comparePassword(password);

        if(isUserPresent) {
          res.status(201).json({
                    msg: "registration successfull",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                  });
        }else {
          res.status(401).json({message: "Invaild email or password"})
        }


      } catch (error) {
        // res.status(500).json("registration failed");
        next(error);
      }
  }

module.exports = {home, register, login};

/*
In most cases, converting _ id to a string is a good practice because it ensures consistency
and compatibility across different JWT libraries and systems. It also aligns with the
expectation that claims in a JWT are represented as strings.


*/ 