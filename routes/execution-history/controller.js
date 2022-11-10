const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_DATA = 'select * from execution_history where m_id = :1'
const INSERT_ONE = 'insert into execution_history values(coin_exe_seq.NEXTVAL,:1,:2,:3,:4,:5,0,sysdate,sysdate)'
const UPDATE_ONE = 'update execution_history set(isdone=:2,donetime=sysdate) where idx = :1'


exports.SelectAll = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT_DATA,[req.params.id]);
    let ob = [] 
    for (let i = 0; i < data.length; i++) {
        let d = {
            'idx':data[i][0],
            'm_id':data[i][1],
            'coin_id':data[i][2],
            'price':data[i][3],
            'cnt': data[i][4],
            'isbuy': data[i][5],
            'isdone': data[i][6],
            'uptime': data[i][7],
            'donetime': data[i][8]
        }
        ob[i] = d
    }
    send.success(res,ob);
}
exports.InsertOne = async(req, res, next) => {
    let da = [req.params.id,req.body.coin_id,req.body.price,req.body.cnt,req.body.isbuy]
    let data = await conn.executeUpdate(INSERT_DATA,da);
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}
exports.UpdateOne = async(req, res, next) => {
    let da = [req.body.idx,3]
    let data = await conn.executeUpdate(INSERT_DATA,da);
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}
