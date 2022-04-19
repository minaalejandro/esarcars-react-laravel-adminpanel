import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;

const Earning = () => {
	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button >CARS LISTING</Button>
				<Button type="default"  icon={<DownloadOutlined /> }>
					EXCEL
				</Button>
				<RangePicker
					// onChange={date => setSelectDate(date)}
				/>
				<Search
					placeholder="input search text"
					// onSearch={value => setSearchText(value)}
					style={{ width: 200 }}
				/>
			</div>
			<div className='earning_table'>
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Earning
