import React, { useState, useEffect } from "react";
import { Table, Divider, Tag } from "antd";

import fetch from 'auth/FetchInterceptor'

export default function Basic() {
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [data, setData] = useState();
    const columns = [
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
        },
        {
            title: "Make",
            dataIndex: "make",
            key: "make"
        },
        {
            title: "Model",
            dataIndex: "model",
            key: "model"
        },
        {
            title: "Transmission",
            dataIndex: "transmission",
            key: "transmission"
        },
        {
            title: "Trim",
            dataIndex: "trim",
            key: "trim"
        },
        {
            title: "Style",
            dataIndex: "style",
            key: "style"
        },
        
    ];
    const fetchProducts = (params) => {
        setLoading(true);
        fetch({
            url: '/car_data',
            method: 'get',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            var data = [];
            var new_data = {};
            setLoading(false);
            setPagination({ ...pagination, total: resp.total });
            resp.data.map((item) => {
                new_data = {
                  key: item.id,
                  year: item.model_year,
                  make: item.model_make_id,
                  model: item.model_name,
                  transmission: item.model_transmission_type,
                  trim: item.model_trim,
                  style: item.model_body 
                }
                data.push(new_data);
              })
              setData(data);
        })
    }
    useEffect(() => {
        fetchProducts({ page: 1 });
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
      console.log(pagination);
    return (
        <Table columns={columns} dataSource={data} loading={loading}  pagination={pagination} onChange={handleTableChange}/>
    );
}