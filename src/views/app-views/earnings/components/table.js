import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import fetch from 'auth/FetchInterceptor';

const columns = [
    { title: 'ID', dataIndex: 'id', key: 1 },
    { title: 'Bank Name', dataIndex: 'bank_name', key: 2 },
    { title: 'Iban', dataIndex: 'iban', key: 3 },
    { title: 'Bank Number', dataIndex: 'account_number', key: 4 },
    { title: 'First Name', dataIndex: 'first_name', key: 5 },
    { title: 'Holder Name', dataIndex: 'holder_name', key: 6 },
    { title: 'Last Name', dataIndex: 'last_name', key: 7 },
    { title: 'Phone Number', dataIndex: 'phone_number', key: 8 },
    { title: 'Penalty', dataIndex: 'penalty_amount', key: 9 },
    { title: 'Earnings', dataIndex: 'earnings', key: 10 },
];



export default function Expand(props) {
    const [data, setData] = useState([]);
    const [eariningData, setEarningData] = useState({});
    const fetchProducts = (params) => {
        fetch({
            url: '/report/earners/get/all',
            method: 'get',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            var data = [];
            var new_data = {};
            resp.data.users.map((item) => {
                new_data = {
                    key: item.id,
                    id: item.id,
                    bank_name: item.bank_name,
                    iban: item.iban,
                    account_number: item.account_number,
                    first_name: item.first_name,
                    holder_name: item.holder_name,
                    last_name: item.last_name,
                    phone_number: item.phone_number,
                    penalty_amount: item.penalty_amount,
                    earnings: item.earnings
                }
                data.push(new_data);
            })
            setData(data);
        })
    }

    useEffect(() => {
        fetchProducts({ page: 1 });
    }, []);

    const handleEarning = (id) => {
        fetch({
            url: '/report/earners/' + id,
            method: 'get',
            headers: {
                'public-request': 'true'
            },
        }).then((resp) => {
            console.log(resp);
            console.log(resp.trips);
            // ({ ...images, [key]: resp.images });
            setEarningData({...eariningData, [id]: resp.trips});
        })
    }
    // console.log(eariningData);
    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record =>
                    <div style={{ margin: 0 }}>
                        <div>
                            <div className="earing_detail_body">
                                {record.id in eariningData  && eariningData[record.id].map((item , index) => {
                                    return <div key={index} className="earing_detail" style={{justifyContent: 'space-between', padding: '10px 20px'}}>
                                                <div className="earing_detail">
                                                    <div>trip ID</div>
                                                    <div key={index}>{item.id}</div>
                                                </div>
                                                <div className="earing_detail">
                                                    <div>Owner Earings</div>
                                                    <div key={index}>{item.id}</div>
                                                </div>
                                                <div className="earing_detail">
                                                    <button style={{padding: '5px 40px', borderRadius: 5}}>Unpayed</button>
                                                </div>
                                            </div>
                                })}
                            </div>
                        </div>
                    </div>,
                onExpand: (expanded, record) => {
                    if (expanded == true) {
                        handleEarning(record.id);
                    }
                }
            }}
            dataSource={data}
        />
    );

}
