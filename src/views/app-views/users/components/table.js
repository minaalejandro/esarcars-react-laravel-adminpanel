import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import fetch from 'auth/FetchInterceptor'

export default function Expand() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const columns = [
        { title: 'USER ID', dataIndex: 'id', key: 'id' },
        { title: 'First name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Listed Cars', dataIndex: 'listed_cars', key: 'listed_cars' },
        { title: 'Joined', dataIndex: 'joined', key: 'joined' },
        { title: 'Phone number', dataIndex: 'phone_number', key: 'phone_number' },
        { title: 'Car trips', dataIndex: 'car_trips', key: 'car_trips' },
        { title: 'Active', dataIndex: 'active', key: 'active' },
        {
          title: 'Delete/Restore',
          dataIndex: '',
          key: 'x',
          render: () => <a href="/#">Delete</a>,
        },
      ];
      
      const fetchProducts = (params) => {
        setLoading(true);
          fetch({
            url: '/users',
            method: 'get',
            headers: {
              'public-request': 'true'
            },
            params
          }).then((resp) => {
            setLoading(false);
            var data = [];
            var new_data = {};
            setPagination({ ...pagination, total: resp.meta.total });
            resp.data.users.map((item) => {
                // console.log(item);
                item.active = item.active == 1 ? "Yes" : "NO";
                new_data = {
                  key: item.id,
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                  listed_car: item.listed_cars,
                  joined: item.joined,
                  phone_number: item.phone_number,
                  car_trips: item.car_trips,
                  active: item.active,
                  // description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
                }
                data.push(new_data);
                console.log(data);
              })
              setData(data);   
          })
        }
        console.log(data);
        useEffect(() => {
            fetchProducts({page: 1});
        }, []);

        const handleTableChange = (pager, filters, sorter) => {
            setPagination({ ...pagination, current: pager.current });
            fetchProducts({
              page: pager.current,
              results: pager.pageSize,
            //   dates: props.startDate + "," + props.endDate,
            //   search: props.searchText
            });
          };

    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    );
  }



