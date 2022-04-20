import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const Role = () => {
	return (
		<React.Fragment>
			
			<div className='RoleBtn'>
				<h1>ROLE MANAGEMENT</h1>
				<Button type="primary">ADD ROLE</Button>
			</div>
			<div>
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Role
