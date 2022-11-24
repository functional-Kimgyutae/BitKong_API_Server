const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_DATA = 'select * from execution_history where m_id = :1'
const INSERT_ONE = 'insert into execution_history values(coin_exe_seq.NEXTVAL,:1,:2,:3,:4,:5,0,sysdate,sysdate)'
const UPDATE_ONE = 'update execution_history set isdone=:2,donetime=sysdate where idx = :1'

//
const SELECT = 'select * from execution_history where idx = :1'
//

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
    let data = await conn.executeUpdate(INSERT_ONE,da);
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}

//
exports.UpdateOne = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT,[req.body.idx]);
        let d = {
            'idx':data[0][0],
            'm_id':data[0][1],
            'coin_id':data[0][2],
            'price':data[0][3],
            'cnt': data[0][4],
            'isbuy': data[0][5],
            'isdone': data[0][6],
            'uptime': data[0][7],
            'donetime': data[0][8]
        }
    let a = await conn.executeUpdate('update execution_history set isdone= 2,donetime=sysdate where idx = :1',[d.idx]);
    if(d.isbuy == 0) {
        putCoin(d)
    }else {
        putMon(b)
    }
    if(a == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}


async function putCoin(ob) {
    const SELECT_ONE = 'select * from coin_wallet where m_id = :1 and coin_id = :2'
    const INSERT_COIN = 'insert into coin_wallet values(:1,:2,:3,:4)'

    const data = await conn.executeQuery(SELECT_ONE,[ob.m_id,ob.coin_id])  
    console.log("매도 주문 취소",ob.idx)
    if(data[0] == null) {
        conn.executeUpdate(INSERT_COIN,[ob.m_id,ob.coin_id,ob.price,ob.cnt])
    }else {
        let id = ob.m_id;
        let coin_id = ob.coin_id;
        let price = data[0][2] + ob.price * 1;
        let cnt = data[0][3] + ob.cnt * 1;
        conn.executeUpdate("update coin_wallet set price="+price+",cnt="+cnt+" where m_id = '"+id+"' and coin_id = '"+coin_id+"'")
    }
}

async function putMon(ob) {
    const SELECT_ONE = 'select * from coin_wallet where m_id = :1 and coin_id = :2'
    const data = await conn.executeQuery(SELECT_ONE,[ob.m_id,ob.coin_id])  
    console.log("매수 주문 취소",ob.idx)
    let id = ob.m_id;
    let coin_id = ob.coin_id;
    let price = data[0][2] + ob.price * 1;
    let cnt = data[0][3] + ob.cnt * 1;
    let a = await conn.executeUpdate("update coin_wallet set price="+price+",cnt="+cnt+" where m_id = '"+id+"' and coin_id = '"+coin_id+"'")
}
//