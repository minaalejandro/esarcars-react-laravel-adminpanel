import React from "react";
import { Button, Modal, Input , Form, Select,} from "antd";
import Table from './components/table';
import '../custom.css';

const CarsData = () => {
    return (
		<React.Fragment>
			
			<div className='RoleBtn'>
				<h1>CARS DATA MANAGEMENT</h1>
				<Button type="primary" >ADD CAR</Button>
			</div>
			<div>
				<Table/>
			</div>
			{/* <Modal title="Add Admin" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item label="Name" rules={[{required: true, }, ]}>
                        <Input onChange={handleNameChange} value={name} />
                    </Form.Item>
                    <Form.Item label="Description" rules={[{required: true, }, ]} >
                        <Input  onChange={handleDescriptionChange} value={description} />
                    </Form.Item>
                    <Form.Item label="Select Level" rules={[{required: true, }, ]}>
                        <Select value={level} onChange={handleSelectLevel} >
							<Select.Option   value="1" >1</Select.Option>
							<Select.Option   value="2" >2</Select.Option>
							<Select.Option   value="3" >3</Select.Option>
                            <Select.Option   value="4" >4</Select.Option>
							<Select.Option   value="5" >5</Select.Option>
							<Select.Option   value="6" >6</Select.Option>
							<Select.Option   value="7" >7</Select.Option>
							<Select.Option   value="8" >8</Select.Option>
							<Select.Option   value="9" >9</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>

            </Modal> */}

		</React.Fragment>
	)
}

export default CarsData