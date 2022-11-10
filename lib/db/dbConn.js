var oracledb = require("oracledb");
var dbConfig = require("./dbConfig");
var con;
oracledb.autoCommit = true; //자동 커밋
oracledb.getConnection({
	user:dbConfig.user,
	password:dbConfig.password,
	connectString:dbConfig.connectString
	},
	function(err,conn) {
		if(err) {throw err;}
		console.log("Oracle DB 연결 성공!!");
		con = conn;
	}
);
//DB 종료
function doRelease(con) {
	conn.release(function(err) {
		if(err) {throw err;}
	});	
}
exports.executeQuery = async(sql,data=[])=> {
	let promise = new Promise((resolve, reject) => {
		con.execute(sql,data,function(err,result) {  
			if(err) {throw err;}
			resolve(result.rows);
		});
	  });
	let a = await promise;
	return a
}
exports.executeUpdate = async(sql,data=[]) =>{
	let res = 1
	let promise = new Promise((resolve, reject) => {
		con.execute(sql,data,function(err,result) {  
			if(err) {res = 0}
			resolve(1);
		});
	  });
	let a = await promise;
	a = res
	return a
}
