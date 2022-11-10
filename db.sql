--회원가입 테이블
create table member_table(
	m_id varchar2(30) primary key,
	m_name varchar2(30),
	m_phone_number char(11),
	m_password varchar2(256)
);
--코인게시판 테이블
create table coin_board(
	b_id number(4) not null primary key,
	c_tag number(2),
	b_title varchar2(50),
	b_name varchar2(30),
	b_date DATE,
	m_id varchar2(30),
	b_context varchar2(2048),
	b_view number(5)
);

CREATE SEQUENCE b_idx_seq START WITH 1 INCREMENT BY 1 NOCACHE;

--코인고객센터 테이블
create table coin_notice(
	n_id number(4) not null primary key,
	n_tag number(2),
	n_title varchar2(50),
	n_context varchar2(2048),
	m_id varchar2(30),
	n_date DATE,
	n_view number(5)
);

CREATE SEQUENCE c_idx_seq START WITH 1 INCREMENT BY 1 NOCACHE;

-- 충전 내역 테이블
create table charging_history (
    idx int primary key,
    m_id varchar2(20),
    money int,
    point int,
    times DATETIME
)
CREATE SEQUENCE idx_seq START WITH 1 INCREMENT BY 1 NOCACHE;

-- 코인 보유 테이블
create table coin_wallet (
    m_id varchar2(20),
    coin_id  varchar2(5),
    price float,
    cnt float,
    CONSTRAINT COIN_LIST_PK PRIMARY KEY(m_id, coin_id)
)

-- 코인 내역 ㅌ이블
create table execution_history(
	idx int primary key,
	m_id varchar2(20),
	coin_id varchar2(20),
	price float,
	cnt float,
	isbuy varchar2(12), -- 0 : 매도 , 1:매수
	isdone varchar2(12), --0 : 거래대기,1:거래완료,2:취소
	uptime DATETIME,
	donetime DATETIME	
)
CREATE SEQUENCE coin_exe_seq START WITH 1 INCREMENT BY 1 NOCACHE;