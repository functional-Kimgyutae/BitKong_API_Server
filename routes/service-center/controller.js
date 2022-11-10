exports.SelectAll = (req, res, next) => {
    res.send("고객센터 목록 가져오기");
}
exports.SelectOne = (req, res, next) => {
    res.send("고객센터 글 가져오기");
}
exports.InsertOne = (req, res, next) => {
    res.send("고객센터 글 추가하기");
}
exports.DeleteOne = (req, res, next) => {
    res.send("고객센터 글 삭제하기");
}