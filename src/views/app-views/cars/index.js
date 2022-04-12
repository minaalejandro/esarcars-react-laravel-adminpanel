import moment from 'moment';
import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from "jspdf";
import "jspdf-autotable";

import Table from './components/table';
import '../custom.css';

const { RangePicker } = DatePicker;
const { Search } = Input;
const Cars =  () => {
	const [selectDate, setSelectDate] = useState(null);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [searchText, setSearchText] = useState();
	const [reloadState, setReloadState] = useState(true);
	const [tableData, setTableData]=useState([])
	useEffect(()=> {
		if(selectDate === null) {
			setStartDate("1900-01-01");
			setEndDate("2999-01-01");
		} else {
			setStartDate(moment(selectDate[0]).format("YYYY-MM-DD"));
			setEndDate(moment(selectDate[1]).format("YYYY-MM-DD"));
		}
	}, [selectDate]);

	const reloadButton = () =>{
		setReloadState(s => !s);
		console.log(reloadState);
	}
	const getTableData=(data)=>{
		// console.log('tabledata')
		 console.log(data)
		setTableData(data);
	}
	const exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape
	
		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);
	
		doc.setFontSize(15);
	
		const title = "My Awesome Report";
		const headers = [["CARDID", "Manufactuer","Model","Year","City","Active","OwnerId","OwnerName","CreatedOn"]];
	
		const data = tableData.map(item=> [
			item.key,
			item.car_manufacturer, 
			item.car_model,
			item.production_year,
			item.car_city,
			item.active,
			item.owner_id,
			item.owner_name,
			item.created_at,
		]);
	
		let content = {
		  startY: 50,
		  head: headers,
		  body: data
		};
	
		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("report.pdf")
	  }

	return (
		<React.Fragment>
			<div className='CarBtn'>
				<Button onClick={reloadButton}>CARS LISTING</Button>
				<RangePicker
					onChange={date => setSelectDate(date)}
				/>
				<Search
					placeholder="input search text"
					onSearch={value => setSearchText(value)}
					style={{ width: 200 }}
				/>
			</div>
			<div className='DownBtn'>
				<Button type="default"   icon={<DownloadOutlined />} onClick={() =>exportPDF()}>
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
				<Table startDate={startDate} endDate={endDate} searchText={searchText} reloadState={reloadState} getTableData={getTableData}/>
			</div>

		</React.Fragment>
	)
}

export default Cars
