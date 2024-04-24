require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectdb = require("./util/db");
const errorMiddleware = require("./middleware/err-middleware");

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware)

/*
app.get("/", (req, res) =>{
        res.status(200).send("welcome to my page");
});

app.get("/register", (req, res) => {
  res.status(200).send(" registration page");
});

*/

const PORT = 5000;

connectdb().then( () => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });

})


/*
Yeh code Express.js mein hai aur yeh kisi web application ke routing aur request handling ko define karta hai.

1. `app.use(express.json())`: Yeh line Express.js ko yeh batata hai ki incoming request body ko JSON format mein expect kare. Express.js ke `json()` middleware ka istemal hota hai JSON requests ko parse karne ke liye. Isse, jab bhi koi request aata hai, Express.js automatically request body ko parse karta hai aur usse JavaScript object mein convert kar deta hai, jisse uska istemal karne mein aasan ho jata hai.

2. `app.use("/api/auth", router)`: Yeh line ka matlab hai ki sabhi requests jo "/api/auth" se shuru hoti hain, unhe `router` middleware ke through handle kiya jayega. Yahaan "router" ek Express.js Router object hai, jo endpoints aur unke handlers ko define karta hai. Iska matlab hai ki jab koi "/api/auth" ke saath request karta hai, Express.js uss request ko `router` ke taraf forward karta hai jahan uska sahi handler maujood hota hai.

Overall, yeh code application ke JSON requests ko parse karta hai aur "/api/auth" ke endpoints ke liye sahi router ka istemal karta hai.
*/