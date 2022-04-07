import React, { Component } from "react";
import { Table } from 'antd';


 fetch("http://localhost:8000/api/cars", {
    "method": "get",
    // "headers": {
    //   "x-rapidapi-host": "fairestdb.p.rapidapi.com",
    //   "x-rapidapi-key": "apikey",
    //   "content-type": "application/json",
    //   "accept": "application/json"
    // },
    // "body": JSON.stringify({
    //   _id: this.state.id,
    //   name: this.state.name,
    //   notes: this.state.notes
    // })
  })
  .then(response => response.json())
  .then(response => { console.log(response);
  })
  .catch(err => { console.log(err); });


const columns = [
  { title: 'CARD ID', dataIndex: 'card_id', key: 'card_id' },
  { title: 'Manufactuer', dataIndex: 'manufactuer', key: 'manufacuer' },
  { title: 'Model', dataIndex: 'model', key: 'model' },
  { title: 'Year', dataIndex: 'year', key: 'year' },
  { title: 'City', dataIndex: 'city', key: 'city' },
  { title: 'Active', dataIndex: 'active', key: 'active' },
  { title: 'OwnerId', dataIndex: 'owner_id', key: 'owner_id' },
  { title: 'OwnerName', dataIndex: 'owner_name', key: 'owner_name' },
  { title: 'CreatedOn', dataIndex: 'create_on', key: 'create_on' },
  {
    title: 'Delete/Restore',
    dataIndex: '',
    key: 'x',
    render: () => <a href="/#">Delete</a>,
  },
  { title: 'Verefied', dataIndex: 'verified', key: 'verified' },
];

const data = [
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  {
    key: 1,
    card_id: '10428',
    manufactuer: 'Toyota',
    model: 'Camry',
    year: 2016,
    city: 'kaly',
    active: 'No',
    owner_id: '10428',
    owner_name: 'superadmin',
    created_on: '2018-01-01',
    verified: 'true'
  },
  
];

export class Expand extends Component {
  render() {
    return (
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    );
  }
}

export default Expand;
