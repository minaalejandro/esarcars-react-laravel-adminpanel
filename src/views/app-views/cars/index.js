import moment from 'moment';
import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;



const Cars =  () => {
	const [selectDate, setSelectDate] = useState(new Date());
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	useEffect(()=> {
		if(selectDate === null) {
			setStartDate("1900-01-01");
			setEndDate("2999-01-01");
		} else {
			setStartDate(moment(selectDate[0]).format("YYYY-MM-DD"));
			setEndDate(moment(selectDate[1]).format("YYYY-MM-DD"));
		}
	}, [selectDate]);

	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button>CARS LISTING</Button>
				<RangePicker
					onChange={date => setSelectDate(date)}
				/>
				<Search
					placeholder="input search text"
					onSearch={value => console.log(value)}
					style={{ width: 200 }}
				/>
			</div>
			<div className='DownBtn'>
				<Button type="default"  icon={<DownloadOutlined />}>
					CSV
				</Button>
				<Button type="default"  icon={<DownloadOutlined />}>
					EXCEL
				</Button>
				<Button type="default"  icon={<DownloadOutlined />}>
					PDF
				</Button>
			</div>
			<div>
				<Table startDate={startDate} endDate={endDate}/>
			</div>

		</React.Fragment>
	)
}

export default Cars
