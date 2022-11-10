exports.failure = (res,name,message) =>  {
    res.status(400);
    let o = {
        "error":{
            "name":name,
            "message":message
        }
    }
    res.send(o);
}
exports.success = (res,data) =>  {
    res.status(200);
    res.send({"data":data});
}