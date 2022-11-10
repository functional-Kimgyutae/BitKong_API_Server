const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_ALL = 'select * from coin_board'
const SELECT_BOARD = 'select * from coin_board where b_id = :1'
const INSERT_BOARD = 'insert into coin_board value(:1,:2,:3,SYSDATE,:5,:6,0)'
const UPDATE_BOARD = 'update coin_board set(b_title = :1,b_content=:2) where b_id = :3'
const UPDATE_VIEW = ''
const DELECTE_BOARD = 'delete from coin_board where b_id = :1'

exports.SelectAll = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT_USER,[req.params.id]);
    if(data[0] != null) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            
        }
        data = {
            "id":data[0][0],
            "name":data[0][1],
            "number":data[0][2],
            "password":data[0][3]
        }
        success(res,data);
    }else {
        let name = "SQL 에러";
        let message = "인수가 없거나 잘못되었습니다.";
        failure(res,name,message)
    }
    res.send(" 글 목록 가져오기");
}
exports.SelectOne = async(req, res, next) => {
    res.send("특정 게시글 가져오기");
}
exports.InsertOne = async(req, res, next) => {
    res.send("게시글 추가하기");
}
exports.UpdateOne = async(req, res, next) => {
    res.send("게시글 조회수 올리기");
}
exports.UpdateView = async(req, res, next) => {
    res.send("게시글 수정하기");
}
exports.DeleteOne = async(req, res, next) => {
    res.send("게시글 삭제하기");
}