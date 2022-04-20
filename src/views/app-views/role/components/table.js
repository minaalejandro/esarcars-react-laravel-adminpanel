import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Discription",
    dataIndex: "discription",
    key: "discription"
  },
  {
    title: "Level",
    dataIndex: "leve;",
    key: "level"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
       
        <a href="/#">Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default function Expand(props) {
  
    return <Table columns={columns} dataSource={data} />;

}


