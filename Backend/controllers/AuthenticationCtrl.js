module.exports.SignUp = (req, res, next) => {

  try {
    
    console.log("Credentials: ", req.body)

    res.status(201).json({data: req.body});

  }
  catch (error) {

  }
}