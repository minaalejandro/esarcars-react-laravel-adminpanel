import React, { useEffect, useState } from 'react';
import { Select, Input, Steps, Button, message } from 'antd';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import '../custom.css';
import fetch from 'auth/FetchInterceptor'
import YourInfo from './components/your_info'
import Customize from './components/customize'
import VehicleProtection from './components/vehicle_protection'
import Photos from './components/photos'
import Publish from './components/publish'
import { PhotoshopPicker } from 'react-color';

function ListCar({ google, locations = [] }) {
    const [owners, setOwners] = useState([]);
    const [markers, setMarkers] = useState([{
        title: "Thek marker's title will appear as a tooltip", name: "SOMA", position: {
            lat: -1.2884,
            lng: 36.8233
        }
    }])
    const [year, setYear] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [model_disabled, setModelDisabled] = useState(true);
    const [transmission_disabled, setTransmissionDisable] = useState(true);
    const [manufacturer, setManufacturer] = useState([]);
    const [make, setMake] = useState("");
    const [model, setModel] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [transmission, setTransmission] = useState([]);
    const [selectedTransmission, setSeletedTransmission] = useState("");
    const [trimStyleData, setTrimStyleData] = useState([]);
    const [step, setStep] = useState(0);

    //step
    const { Step } = Steps;

    const steps = [
        {
            title: "Eligibility",
            content: "First-content"
        },
        {
            title: "Your Info",
            content: "Second-content"
        },
        {
            title: "Customize",
            content: "Last-content"
        },
        {
            title: "Vehicle protection",
            content: "Last-content"
        }
        ,
        {
            title: "Photos",
            content: "Last-content"
        },
        {
            title: "Public",
            content: "Last-content"
        }
    ];
    const next = () => {
        const current = step + 1;
        setStep(current);
    }

    const prev = () => {
        const current = step - 1;
        setStep(current);

    }

    const onClick = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(lat, lng);
        setMarkers([{ title: "", name: "", position: { lat, lng } }]);
        console.log(markers);
    }


    useEffect(() => {
        onSearch();
    }, []);
    const { Option } = Select;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(params) {
        fetch({
            url: '/car_owner',
            method: 'get',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            var data = [];
            resp.owners.map((item) => {
                data.push(item.email);
            })
            setOwners(data);
        })
    }
    const mapStyles = {
        width: '100%',
        height: '100%'
    };


    const selectYear = (e) => {
        setYear(e.target.value);
        if (e.target.value != "") {
            if (e.target.value.length == 4) {
                setDisabled(false);
                fetch({
                    url: '/choose-manufacturer/' + e.target.value,
                    method: 'get',
                    headers: {
                        'public-request': 'true'
                    },

                }).then((resp) => {
                    console.log(resp.data);
                    setManufacturer(resp.data);
                })
            }
        }
    }
    const selectModel = (e) => {
        setMake(e);
        let params = {
            manufacturer: e,
            year: year
        }
        setModelDisabled(false);

        fetch({
            url: '/choose-model',
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            console.log(resp.data);
            setModel(resp.data);
        })
    }
    const selectTransmisstion = (e) => {
        setTransmissionDisable(false);
        setSelectedModel(e);
        let params = {
            manufacturer: make,
            year: year,
            model: e,
        }

        fetch({
            url: '/choose-transmission',
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            // console.log(resp.data);
            setTransmission(resp.data);
        })
    }
    const selectTrimStyle = (e) => {
        setSeletedTransmission(e);
        let params = {
            manufacturer: make,
            year: year,
            model: selectedModel,
            transmission: e
        }

        fetch({
            url: '/choose-car',
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            console.log(resp.data);
            setTrimStyleData(resp.data);
        })
    }
    return (
        <>
            <div className='car_list_header'>
                <div>
                    <Steps current={step}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    {/* <div className="steps-content">{steps[current].content}</div> */}

                </div>
            </div>
            {step == 0  &&
             <div>
                <div className='car_list_body row'>
                    <div className='car_list_user_search col-sm-3'>
                        <Select
                            showSearch
                            placeholder="Select a email"
                            optionFilterProp="children"
                            className='input-width'
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                owners.map((item) => {
                                    return <Option key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div className='car_list_map col-sm-9'>
                        <Map
                            google={google}
                            zoom={4}
                            style={mapStyles}
                            onClick={onClick}
                            initialCenter={
                                {
                                    lat: -1.2884,
                                    lng: 36.8233
                                }
                            }
                        >
                            {markers.map((marker, index) =>
                                <Marker
                                    key={index}
                                    title={marker.title}
                                    name={marker.name}
                                    position={marker.position}
                                />

                            )}
                        </Map>

                    </div>
                </div>
                <div className='car_list_footer'>
                    <div style={{ display: 'flex' }}>
                        <div className='col'>
                            <Input style={{ width: 200 }} placeholder="Select a Year" onChange={selectYear} value={year} />
                        </div>
                        {disabled ?
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Make" disabled />
                            </div> :
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Make" onChange={selectModel} >
                                    {
                                        manufacturer.map((item) => {
                                            return <Option key={item.manufacturer}>{item.manufacturer}</Option>
                                        })
                                    }
                                </Select>
                            </div>

                        }
                        {model_disabled ?
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Model" disabled />
                            </div> :
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Model" onChange={selectTransmisstion} >

                                    {
                                        model.map((item) =>
                                            <Option key={item}>{item}</Option>
                                        )
                                    }
                                </Select>
                            </div>
                        }
                        {transmission_disabled ?
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Transmission" disabled />
                            </div> :
                            <div className='col'>
                                <Select style={{ width: 200 }} placeholder="Select a Transmission" onChange={selectTrimStyle}  >
                                    {
                                        transmission.map((item) => {
                                            return <Option key={item.modelTransmissionType}>{item.modelTransmissionType}</Option>
                                        })
                                    }
                                </Select>
                            </div>}

                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='col'>
                            <Select style={{ width: 200 }} placeholder="Select a Odometer" >
                                <Option value="0-70k">0-70k</Option>
                                <Option value="70k-140k">70k-140k</Option>
                                <Option value="140k-210k">140k-210k</Option>
                                <Option value="210k-250k">210k-250k</Option>
                            </Select>
                        </div>
                        <div className='col'>
                            <Select style={{ width: 200 }} placeholder="Select a Trim"  >
                                {
                                    trimStyleData.map((item) => {
                                        return <Option key={item.num}>{item.model_trim}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <Select style={{ width: 200 }} placeholder="Select a Style"  >
                                {
                                    trimStyleData.map((item) => {
                                        return <Option key={item.model_body}>{item.model_body}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <Input style={{ width: 200 }} placeholder="Select a Value" />
                        </div>
                    </div>
                </div>
            </div>}
            {step ==1 && <YourInfo/>}
            {step ==2 && <Customize/>}
            {step ==3 && <VehicleProtection/>}
            {step ==4 && <Photos/>}
            {step ==5 && <Publish/>}                   
            <div className="steps-action">
                {step < steps.length - 1 && (

                    <>
                        <table></table>
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    </>
                )}
                {step === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success("Processing complete!")}
                    >
                        Done
                    </Button>
                )}
                {step > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    )
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA2vMx4B8g6zWCf3xYUxC40xePaunWQ6Tc'
})(ListCar);