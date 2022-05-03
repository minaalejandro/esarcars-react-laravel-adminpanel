import React, { useEffect, useState } from 'react';
import { Select, Input } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import '../custom.css';
import fetch from 'auth/FetchInterceptor'
import Flex from 'components/shared-components/Flex';

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
    return (
        <>
            <div className='car_list_header'>
                <h1>Eligbility</h1>
            </div>
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
                     <Select style={{ width: 200 }} placeholder="Select a Transmission"  >
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
                        <Select style={{ width: 200 }} placeholder="Select a Odometer" disabled />
                    </div>
                    <div className='col'>
                        <Select style={{ width: 200 }} placeholder="Select a Trim" disabled />
                    </div>
                    <div className='col'>
                        <Select style={{ width: 200 }} placeholder="Select a Style" disabled />
                    </div>
                    <div className='col'>
                        <Select style={{ width: 200 }} placeholder="Select a Value" disabled />
                    </div>
                </div>
            </div>
        </>
    )
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA2vMx4B8g6zWCf3xYUxC40xePaunWQ6Tc'
})(ListCar);