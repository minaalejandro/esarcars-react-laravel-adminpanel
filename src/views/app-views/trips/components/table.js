import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "TRIPS ID",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left"
  },
  {
    title: "Booking Date",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left"
  },
  { title: "Start date", dataIndex: "address", key: "1" },
  { title: "End date", dataIndex: "address", key: "2" },
  { title: "Status", dataIndex: "address", key: "3" },
  { title: "Trip Days", dataIndex: "address", key: "4" },
  { title: "Price Per Day", dataIndex: "address", key: "5" },
  { title: "Promo Discount", dataIndex: "address", key: "6" },
  { title: "Discount", dataIndex: "address", key: "7" },
  { title: "Total Trip Price", dataIndex: "address", key: "8" },
  { title: "Trans Ref", dataIndex: "address", key: "9" },
  { title: "Esar Commision", dataIndex: "address", key: "10" },
  { title: "Pickup location ", dataIndex: "address", key: "11" },
  { title: "Notice time", dataIndex: "address", key: "12" },
  { title: "Renter ID", dataIndex: "address", key: "8" },
  { title: "Renter full name", dataIndex: "address", key: "8" },
  { title: "Renter Phone", dataIndex: "address", key: "8" },
  { title: "Owner ID", dataIndex: "address", key: "8" },
  { title: "Owner full name", dataIndex: "address", key: "8" },
  { title: "Owner Phone", dataIndex: "address", key: "8" },
  { title: "Owner Earning", dataIndex: "address", key: "8" },
  { title: "Car ID", dataIndex: "address", key: "8" },
  { title: "Manufacturer", dataIndex: "address", key: "8" },
  { title: "Model", dataIndex: "address", key: "8" },
  { title: "Year", dataIndex: "address", key: "8" },
  {
    title: "Note",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a href="/#">action</a>
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a href="/#">action</a>
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  }
];

export default function Expand() {

    return (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => 
            <div style={{ margin: 0 }}>

            </div>,
          }}
          dataSource={data}
        //   pagination={pagination}
        //   loading={loading}
          scroll={{ x: 2500 }}
        //   onChange={handleTableChange}
        />
      );
}

