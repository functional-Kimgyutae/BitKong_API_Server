const conn = require('./lib/db/dbConn');  
const axios = require('axios')

const SELECT_DATA = 'select * from execution_history where isdone = 0'

exports.start = ()=> {
    setTimeout(() => {
        mak();
    }, 1000);
    setInterval(() => {
    mak()
}, 10000);
}
async function mak() {
    let data = await await conn.executeQuery(SELECT_DATA);
    let ob = {}
    for (let i = 0; i < data.length; i++) {
        let d = {
            'idx':data[i][0],
            'm_id':data[i][1],
            'coin_id':data[i][2],
            'price':data[i][3],
            'cnt': data[i][4],
            'isbuy': data[i][5],
        }
        if(!(data[i][2] in ob)){
            ob[data[i][2]] = [];
        }
        ob[data[i][2]].push(d);
    }

    axios({
        method : 'get',
        url : 'https://api.bithumb.com/public/ticker/ALL_KRW'
      }).then((res)=>{
            draw(ob,res.data)
      })

}
function draw(ob,data) {
    let list = Object.keys(ob)
    for (let key in list) {
        key = list[key]
        for(let i =0;i < ob[key].length;i++){
            let price = ob[key][i].price / ob[key][i].cnt;
            if(ob[key][i].isbuy == 1){
                if(price >= data.data[key].closing_price){
                    //거레 완료 띄우고 돈 넣어지기
                    putCoin(ob[key][i]);
                    sendEnd(ob[key][i].idx)
                }
            }else {
                if(price <= data.data[key].closing_price){
                    //거래 완료 띄우고 코인 넣어주기
                    putMon(ob[key][i]);
                    sendEnd(ob[key][i].idx)
                }
            }
        }
    }
} 

async function putCoin(ob) {
    const SELECT_ONE = 'select * from coin_wallet where m_id = :1 and coin_id = :2'
    const INSERT_COIN = 'insert into coin_wallet values(:1,:2,:3,:4)'

    const data = await conn.executeQuery(SELECT_ONE,[ob.m_id,ob.coin_id])  
    console.log("매수계약 채결",ob.idx)
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
    const data = await conn.executeQuery(SELECT_ONE,[ob.m_id,"KRW"])  
    console.log("매도 계약 채결",ob.idx)
    let id = ob.m_id;
    let coin_id = "KRW";
    let price = data[0][2] + ob.price * 1;
    let cnt = data[0][3] + ob.cnt * 1;
    let a = await conn.executeUpdate("update coin_wallet set price="+price+",cnt="+cnt+" where m_id = '"+id+"' and coin_id = '"+coin_id+"'")
}

async function sendEnd(idx) {
    let a = await conn.executeUpdate('update execution_history set isdone= 1,donetime=sysdate where idx = :1',[idx]);
}