const { CLOB } = require('oracledb');
const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_USER = 'select * from member_table where m_id = :1'
const LOGIN_USER = 'select * from member_table where m_id = :1 and m_password = :2'
const UPDATE_PASS_USER = 'update member_table set m_password = :1 where m_id = :2'
const INSERT_USER = 'insert into member_table(m_id,m_name,m_phone_number,m_password) values(:1,:2,:3,:4)'

exports.SelectOne = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT_USER,[req.params.id]);
    if(data[0] != null) {
        data = {
            "id":data[0][0],
            "name":data[0][1],
            "number":data[0][2],
            "password":data[0][3]
        }
        send.success(res,data);
    }else {
        let name = "SQL 에러";
        let message = "인수가 없거나 잘못되었습니다.";
        send.failure(res,name,message)
    }
}
exports.InsertUser = async(req, res, next) => {
    let id = req.body.m_id
    let name = req.body.m_name
    let phone = req.body.m_phone_number
    let pass = sha.sha256(req.body.m_password)
    let data = await conn.executeUpdate(INSERT_USER,[id,name,phone,pass]);
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}
exports.UpdateUser = async(req, res, next) => {
    let id = req.params.id
    console.log(req.body.m_password)
    let pass = sha.sha256(req.body.m_password)
    let data = await conn.executeUpdate(UPDATE_PASS_USER,[pass,id])
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}
exports.LoginPro = async(req,res,next) => {
    let id = req.body.m_id;
    let pass = sha.sha256(req.body.m_password)
    let data = await conn.executeQuery(LOGIN_USER,[id,pass])
    if(data[0] != null) {
        send.success(res,"success");
    }else {
        let name = "로그인 실패";
        let message = "아이디 또는 비밀번호가 틀렸습니다.";
        send.failure(res,name,message)
    }
}
exports.IdExist = async(req,res,next)=> {
    let id = req.params.id
    let data = await conn.executeQuery(SELECT_USER,[id])
    if(data[0] == null) {
        send.success(res,"success");
    }else {
        let name = "중복값";
        let message = "중복된 값이 있거나 DB오류입니다.";
        send.failure(res,name,message)
    }
}   
