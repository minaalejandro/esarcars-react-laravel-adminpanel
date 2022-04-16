import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;

const Tripas = () => {
	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button >CARS LISTING</Button>
				<RangePicker
					// onChange={date => setSelectDate(date)}
				/>
				<Search
					placeholder="input search text"
					// onSearch={value => setSearchText(value)}
					style={{ width: 200 }}
				/>
			</div>
			<div className='DownBtn'>
				<Button type="default"   icon={<DownloadOutlined />}  >
					CSV
				</Button>
				<Button type="default"  icon={<DownloadOutlined /> }>
					EXCEL
				</Button>
				<Button type="default"  icon={<DownloadOutlined />}>
					PDF
				</Button>
			</div>
			<div>
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Tripas
