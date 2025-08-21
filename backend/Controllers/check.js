const check = (req,res)=>{
    return res.status(200).json({
        message:"User is loggedin",
        success:true,
        data:req.user
    })
}

module.exports = check;