import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import '../custom.css';
import fetch from 'auth/FetchInterceptor'

function ListCar({ google, locations = [] }) {
    const [owners, setOwners] = useState([]);
    const [markers, setMarkers] = useState([{ title: "Thek marker's title will appear as a tooltip", name: "SOMA", position: {  lat: -1.2884,
        lng: 36.8233 } }])
   

    const onClick = (t, map, coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(lat, lng);
        setMarkers( [{title:"", name:"",position: { lat, lng }}]);
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


    return (
        <>
            <div className='car_list_header'>
                <h1>Eligbility</h1>
            </div>
            <div className='car_list_body row'>
                <div className='car_list_user_search col-sm-3'>
                    <Select
                        showSearch
                        placeholder="Select a person"
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

            </div>
        </>
    )
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA2vMx4B8g6zWCf3xYUxC40xePaunWQ6Tc'
})(ListCar);