import moment from 'moment';
import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import '../custom.css';
import Table from './components/table';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const handleChange = (value) => {
	console.log(`selected ${value}`);
}

const Users = () => {
	return (
		<React.Fragment>
			<div className='UserBtn'>
				<Button>USERS LISTING</Button>
				<RangePicker
					// onChange={date => setSelectDate(date)}
				/>
				
				<Search
					placeholder="input search text"
					// onSearch={value => setSearchText(value)}
					style={{ width: 200 }}
				/>
				<Select className="mr-2" defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
					<Option value="all">All</Option>
					<Option value="active">Active</Option>
					<Option value="inactive">InActive</Option>
				</Select>
			</div>
			<div className='DownBtn'>
				<Button type="default"   icon={<DownloadOutlined />}  >
					CSV
				</Button>
				<Button type="default"  icon={<DownloadOutlined /> }>
					EXCEL
				</Button>
				<Button type="default"  icon={<DownloadOutlined />} >
					PDF
				</Button>
			</div>
			<div>
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Users
