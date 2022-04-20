import React, {useEffect, useState}from 'react';
import { Button, DatePicker, Input } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import Table from './components/table';
import '../custom.css';

const Admin = () => {
	return (
		<React.Fragment>
			
			<div className='RoleBtn'>
				<h1>ADMINISTRATORS</h1>
				<Button type="primary">ADD ADMIN</Button>
			</div>
			<div>
				<Table/>
			</div>

		</React.Fragment>
	)
}

export default Admin
