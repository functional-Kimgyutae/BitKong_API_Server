const conn = require('../../lib/db/dbConn');    
const sha = require('../../lib/sha256')
const send = require('../../lib/sendAPI')

const SELECT_DATA = 'select * from charging_history where m_id = :1'
const INSERT_DATA = "insert into charging_history (idx,m_id,money,point,times) values(idx_seq.NEXTVAL,:1,:2,:3,sysdate)"

exports.SelectAll = async(req, res, next) => {
    let data = await conn.executeQuery(SELECT_DATA,[req.params.id]);
    let ob = [] 
    for (let i = 0; i < data.length; i++) {
        let d = {
            'idx':data[i][0],
            'm_id':data[i][1],
            'money':data[i][2],
            'point':data[i][3],
            'times': data[i][4]
        }
        ob[i] = d
    }
    send.success(res,ob);
}

exports.InsertOne = async(req, res, next) => {
    let da = [req.params.id,req.body.money,req.body.point]
    console.log(da)
    let data = await conn.executeUpdate(INSERT_DATA,da);
    if(data == 0) {
        let name = "SQL 오류"
        let message = "넘어온 값이나 DB에 문제가 있음"
        send.failure(res,name,message);
    }else {
        send.success(res,"success");
    }
}