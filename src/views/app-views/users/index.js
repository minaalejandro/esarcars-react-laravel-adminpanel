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

const Users = () => {
	const [reloadState, setReloadState] = useState(true);
	const [selectDate, setSelectDate] = useState(null);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [searchText, setSearchText] = useState();
	const [selectActive, setSelectActive] = useState('');

	const reloadButton = () =>{
		setReloadState(s => !s);
	}

	useEffect(()=> {
		if(selectDate === null) {
			setStartDate("1900-01-01");
			setEndDate("2999-01-01");
		} else {
			setStartDate(moment(selectDate[0]).format("YYYY-MM-DD"));
			setEndDate(moment(selectDate[1]).format("YYYY-MM-DD"));
		}
	}, [selectDate]);
	const handleChange = (value) => {
		setSelectActive(value);
	}

	return (
		<React.Fragment>
			<div className='UserBtn'>
				<Button onClick={reloadButton}>USERS LISTING</Button>
				<RangePicker
					onChange={date => setSelectDate(date)}
				/>
				
				<Search
					placeholder="input search text"
					onSearch={value => setSearchText(value)}
					style={{ width: 200 }}
				/>
				<Select className="mr-2" defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
					<Option value="">All</Option>
					<Option value="1">Active</Option>
					<Option value="0">InActive</Option>
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
				<Table reloadState={reloadState} startDate={startDate} endDate={endDate} searchText={searchText} selectActive={selectActive} />
			</div>

		</React.Fragment>
	)
}

export default Users
