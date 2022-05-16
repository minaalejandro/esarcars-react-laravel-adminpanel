import React, { useEffect, useState } from 'react';
import { Select, Input, Steps, Button, message ,Checkbox} from 'antd';
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
    const [branded, setBranded] = useState(false);
    const [user_email, setUserEmail] = useState("");
    const [odometer, setOdometer] = useState("");
    const [trim, setTrim] = useState("");
    const [style, setStyle] = useState("");
    const [value, setVaule] = useState("");
    const [car_id, setCarId] = useState();
    const [second_step, setSecondStep] = useState({});
    console.log(second_step);
    // console.log(car_id);

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
    // console.log(make);
    const next = () => {
        if (branded != false && year.length == 4 ){
            
            if(step == 0) {
                handleFirstStep();
            }
            if (step == 1) {
                handleSecondStep();
            }
        }
    }

    const prev = () => {
        const current = step - 1;
        setStep(current);

    }

    const onClick = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setMarkers([{ title: "", name: "", position: { lat, lng } }]);
    }


    useEffect(() => {
        onSearch();
    }, []);
    const { Option } = Select;

    function onChange(value) {
        // console.log(`selected ${value}`);
        setUserEmail(value);
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
                    // console.log(resp.data);
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

    const selectedOdometer = (e) => {
        setOdometer(e);
    }

    const selectedTrim = (e) => {
        setTrim(e);
    } 

    const selectedStyle = (e) => {
        setStyle(e);
    } 

    const selectedValue = (e) => {
        setVaule(e.target.value);
    } 

    const onChangeBranded = (e) => {
        setBranded(e.target.checked)
    }

    const handleFirstStep = () => {
        let params =  {
            user_email: user_email,
            car_city: "Al Nabaniyah",
            car_manufacturer: make,
            car_model: selectedModel,
            car_model_id: "61515",
            car_odometer: odometer,
            car_transmission: selectedTransmission,
            car_value: value,
            lat_location:  markers[0].position.lat,
            long_location:  markers[0].position.lng,
            production_year: year,
            style: style,
            trim: trim
        }
        fetch({
            url: '/add_car',
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            setCarId(resp.car.id);
            setStep(step + 1);  
        })
    }

    const handleSecondStep =  () =>{
        let params = second_step;
        fetch({
            url: '/car-notice/'+ car_id,
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params
        }).then((resp) => {
            setStep(step + 1);  
        })
    }


    const handleSelectedValue = (data) =>{
        // console.log(data);
        setSecondStep(data);
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
                            <Select style={{ width: 200 }} placeholder="Select a Odometer"  onChange={selectedOdometer}>
                                <Option value="0-70k">0-70k</Option>
                                <Option value="70k-140k">70k-140k</Option>
                                <Option value="140k-210k">140k-210k</Option>
                                <Option value="210k-250k">210k-250k</Option>
                            </Select>
                        </div>
                        <div className='col'>
                            <Select style={{ width: 200 }} placeholder="Select a Trim" onChange={selectedTrim} value={trim} >
                                {
                                    trimStyleData.map((item) => {
                                        return <Option key={item.num} value={item.model_trim} >{item.model_trim}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <Select style={{ width: 200 }} placeholder="Select a Style" onChange={selectedStyle} value={style}>
                                {
                                    trimStyleData.map((item) => {
                                        return <Option key={item.num} value={item.model_body}>{item.model_body}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='col'>
                            <Input style={{ width: 200 }} placeholder="Select a Value" onChange={selectedValue} value={value}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Checkbox defaultChecked={branded} onChange={onChangeBranded}>My car has never had a branded or salvage title</Checkbox>           
                </div>
            </div>}
            {step ==1 && <YourInfo onSelectedValue={(d) => handleSelectedValue(d)}/>}
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
                        Finish
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