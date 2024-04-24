// await schema.parseAsync (req.body) is the line where you use Zod to validate the request body data against the defined schema.
// here schema us signupschema 
//callback () next bcuz its a middleware
const validate = (schema) => async (req, res, next) => {
    try {
        //this will check the info eneter by user is meeting the requirements of max characters or not
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "fill the input properly"
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails
        };

        next(error);


        // res.status(400).json({msg: err.errors[0].message})
    }
}

module.exports = validate;