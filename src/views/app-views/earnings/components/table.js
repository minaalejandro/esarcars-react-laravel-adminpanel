import React, {useState, useEffect} from "react";
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
    const fetchProducts = (params) => {
        fetch({
            url: '/report/earners/get/all',
            method: 'get',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
           console.log(resp.data.users);
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
 
    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.id}</p>,
        }}
        dataSource={data}
      />
    );
  
}
