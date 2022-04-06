import React from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import Table from './components/table';
import style from '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;

const Cars = () => {
	return (
		<React.Fragment>
			<div className={style.CarBtn}>
				<Button>CARS LISTING</Button>
				<RangePicker />
				<Search
				placeholder="input search text"
				onSearch={value => console.log(value)}
				style={{ width: 200 }}
				/>
			</div>
			<div>
				<Button type="default" icon={<DownloadOutlined />}>
					SCV
				</Button>
				<Button type="default" icon={<DownloadOutlined />}>
					EXCEL
				</Button>
				<Button type="default" icon={<DownloadOutlined />}>
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
