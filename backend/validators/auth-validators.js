const { z } = require("zod");

//creating an object schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be atleast 2 character" })
    .max(25, { message: "max character 25" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Eamil" })
    .min(2, { message: "Email must be atleast 2 character" })
    .max(50, { message: "max character 50" }),

  phone: z
    .string({ required_error: "Phone Number  is required" })
    .trim()
    .min(10, { message: "Phone Number Must have 10 numbers" })
    .max(15, { message: "max Number allowed 15" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(2, { message: "Atleast 8 character" })
    .max(25, { message: "max character 25" }),
});

module.exports = signupSchema;
