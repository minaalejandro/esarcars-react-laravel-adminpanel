import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;

const Tripas = () => {
	const [reloadState, setReloadState] = useState(true);
	const reloadButton = () =>{
		setReloadState(s => !s);	
	}

	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button onClick={reloadButton}>CARS LISTING</Button>
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
				<Table reloadState={reloadState}/>
			</div>

		</React.Fragment>
	)
}

export default Tripas
