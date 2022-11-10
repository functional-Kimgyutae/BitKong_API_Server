const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_ALL = 'select * from coin_wallet where m_id = :1'
const SELECT_ONE = 'select * from coin_wallet where m_id = :1 and coin_id = :2'
const INSERT_COIN = 'insert into coin_wallet values(:1,:2,:3,:4)'
const UPDATE_COIN = 'update coin_wallet set(price=:3,cnt=:4) where m_id = :1 and coin_id = :2'
const DELETE_COIN = 'delete from coin_wallet where m_id = :1 and coin_id = :2'
exports.SelectAll = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT_ALL,[req.params.id]);
    let ob = [] 
    for (let i = 0; i < data.length; i++) {
        let d = {
            'm_id':data[i][0],
            'coin_id':data[i][1],
            'price':data[i][2],
            'cnt':data[i][3],
        }
        ob[i] = d
    }
    send.success(res,ob);
}   
exports.InsertOne = async(req, res, next) => {
    const data = await conn.executeQuery(SELECT_ONE,[req.params.id,req.body.coin_id])  
    if(data[0] == null) {
        conn.executeUpdate(INSERT_COIN,[req.params.id,req.body.coin_id,req.body.price,req.body.cnt])
    }else {
        let id = data[0][0];
        let coin_id = data[0][1];
        let price = data[0][2] + req.body.price;
        let cnt = data[0][3] + req.body.cnt;
        conn.executeUpdate(UPDATE_COIN,[id,coin_id,price,cnt])
    }
    send.success(res,"success");                                                
}
exports.UpdateOne = async(req, res, next) => {  
    const data = await conn.executeQuery(SELECT_ONE,[req.params.id,req.body.coin_id])  
    let id = data[0][0];
    let coin_id = data[0][1];
    let price = data[0][2] - req.body.price;
    let cnt = data[0][3] - req.body.cnt;
    if(cnt <= 0){
        conn.executeUpdate(DELETE_COIN,[id,coin_id])
    }else {
        conn.executeUpdate(UPDATE_COIN,[id,coin_id,price,cnt])
    }
    send.success(res,"success"); 
}   
exports.DeleteOne = async(req, res, next) => {
    const data = await conn.executeQuery(SELECT_ONE,[req.params.id,req.body.coin_id])  
    let id = data[0][0];
    let coin_id = data[0][1];
    let price = data[0][2] - req.body.price;
    let cnt = data[0][3] - req.body.cnt;
    if(cnt <= 0){
        conn.executeUpdate(DELETE_COIN,[id,coin_id])
    }else {
        conn.executeUpdate(UPDATE_COIN,[id,coin_id,price,cnt])
    }
    send.success(res,"success"); 
}

