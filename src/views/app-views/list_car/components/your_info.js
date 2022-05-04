import React from 'react';
import { Select, Input, Steps, Button, message } from 'antd';

function YourInfo() {
    const { Option } = Select;
    function handleChange(value) {

        console.log(`selected ${value}`);
    }

    return (
        <>
            <h1>Car availability</h1>
            <div >
                <h4>How nuch advance do you need to confirom a trip?</h4>
                <div className='advance_notice'>
                    <div>Advance notice</div>
                    <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="1">1 hours</Option>
                        <Option value="2">2 hours</Option>
                        <Option value="3">3 hours</Option>
                        <Option value="4">6 hours</Option>
                        <Option value="5">12 hours</Option>
                        <Option value="6">1 days</Option>
                        <Option value="7">2 days</Option>
                        <Option value="8">3 days</Option>
                        <Option value="9">1 weeks</Option>
                    </Select>
                </div>
                <div className='advance_notice'>Block tripts that don't give you enough notice</div>
            </div>
            <div>
                <h4>How long would you like trips to last?</h4>
                <div className='advance_notice'>
                    <div>Shortest possible trip</div>
                    <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="1">Any</Option>
                        <Option value="2">1 days</Option>
                        <Option value="3">2 days</Option>
                        <Option value="4">3 days</Option>
                        <Option value="5">5 days</Option>
                        <Option value="6">1 week</Option>
                        <Option value="7">2 weeks</Option>
                        <Option value="8">1 month</Option>
                    </Select>
                </div>
                <div className='advance_notice'>
                    <div>Longest possible trip</div>
                    <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="1">Any</Option>
                        <Option value="4">3 days</Option>
                        <Option value="5">5 days</Option>
                        <Option value="6">1 week</Option>
                        <Option value="7">2 weeks</Option>
                        <Option value="8">1 month</Option>
                        <Option value="8">3 months</Option>
                    </Select>
                </div>
            </div>
        </>

    )
}

export default YourInfo;