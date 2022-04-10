import React from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import Table from './components/table';
import '../custom.css';
// import '../fontawesome.css';

const { RangePicker } = DatePicker;
const { Search } = Input;

const Cars =  () => {
	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button>CARS LISTING</Button>
				<RangePicker />
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
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Cars
