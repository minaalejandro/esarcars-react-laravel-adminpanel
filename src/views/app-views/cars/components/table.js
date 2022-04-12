import React, { useState, useEffect } from "react";
import { Table, Modal } from 'antd';
import fetch from 'auth/FetchInterceptor'
import '../../custom.css';
import { 
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  UpOutlined,
  CheckOutlined,
  DeleteOutlined   
} from '@ant-design/icons';

export default function Expand(props) {
  console.log(props.searchText);
  console.log(props)
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const [selCar, setSelCar] = useState(-1);
  const [photo_show, setPhotoShow] = useState(false);
  const [car_insurance_show, setCarInsuranceShow] = useState(false);
  const [car_registration_show, setCarRegistrationShow] = useState(false);
  const [owner_show, setOwnerShow] = useState(false);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [changeButton, setChangeButton] = useState(true);
  const showConfirmDelete = (id) => () => {
    confirm({
      title: "Do you want to delete these items?",
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        fetch({
          url: '/cars/restore/' + id,
          method: 'post',
          headers: {
            'public-request': 'true'
          },
        }).then((resp) => {
          if(changeButton == true) {
            setChangeButton(false);
          } else {
            setChangeButton(true);
          }
        })
      },
      onCancel() { }
    });
  }
  const showConfirmRestore = (id) => () => {
    confirm({
      title: "Do you want to restore these items?",
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        fetch({
          url: '/cars/delete/' + id,
          method: 'post',
          headers: {
            'public-request': 'true'
          },
        }).then((resp) => {
          if(changeButton == true) {
            setChangeButton(false);
          } else {
            setChangeButton(true);
          }
        })
      },
      onCancel() { }
    });
  }
  const columns = [
    { title: 'CARD ID', dataIndex: 'id', key: 'card_id' },
    { title: 'Manufactuer', dataIndex: 'car_manufacturer', key: 'manufacuer' },
    { title: 'Model', dataIndex: 'car_model', key: 'model' },
    { title: 'Year', dataIndex: 'production_year', key: 'year' },
    { title: 'City', dataIndex: 'car_city', key: 'city' },
    { title: 'Active', dataIndex: 'active', key: 'active' },
    { title: 'OwnerId', dataIndex: 'owner_id', key: 'owner_id' },
    { title: 'OwnerName', dataIndex: 'owner_name', key: 'owner_name' },
    { title: 'CreatedOn', dataIndex: 'updated_at', key: 'create_on' },
    {
      title: 'Delete/Restore',
      render: (rowData) => {
        if (rowData.active == "NO") {
          const button = (
            <CheckOutlined
              onClick={showConfirmDelete(rowData.id)}
            >
            </CheckOutlined>
          );
          return button;
        } else {
          const button = (
            <DeleteOutlined
              onClick={showConfirmRestore(rowData.id)}
            >
            </DeleteOutlined >
          );
          return button;
        }

      }
    },
    {
      title: 'Verefied',
      render: (rowData) => {
        if (rowData.verified_insurance == 0) {

          return <div> <CloseCircleOutlined /> </div>

        } else {
          return <div> <CheckCircleOutlined /> </div>
        }
      },
    }
  ];
 
  console.log(props)
  useEffect(() => {
    if (props.startDate === undefined || props.searchText === undefined)
      fetchProducts({ page: 1 });
    else
      fetchProducts({ page: 1, dates: props.startDate + "," + props.endDate, search: props.searchText });
  }, []);

  useEffect(() => {
    if (props.startDate === undefined)
      fetchProducts({ page: 1 });
    else
      fetchProducts({ page: 1, dates: props.startDate + "," + props.endDate, search: props.searchText });
  }, [props.startDate, props.endDate, props.searchText]);

  useEffect(() => {
    fetchProducts();
  }, [changeButton, props.reloadState]);
  // const handleData =(val)=>{
  //   console.log('sdsdfsdf');
  //   props.testProp(val)
  // }
  const fetchProducts = (params) => {
    setLoading(true);
    fetch({
      url: '/cars',
      method: 'get',
      headers: {
        'public-request': 'true'
      },
      params
    }).then((resp) => {
      var data = [];
      var new_data = {};
      setPagination({ ...pagination, total: resp.meta.total });
      setLoading(false);
      resp.data.cars.map((item) => {
        item.active = item.active == 1 ? "Yes" : "NO";
        new_data = {
          key: item.id,
          id: item.id,
          car_manufacturer: item.car_manufacturer,
          car_model: item.car_model,
          production_year: item.production_year,
          car_city: item.car_city,
          active: item.active,
          owner_id: item.owner.id,
          owner_name: item.owner.first_name + item.owner.last_name,
          updated_at: item.created_at,
          style: item.style,
          type: item.type,
          car_odometer: item.car_odometer,
          created_at: item.created_at,
          deposit: item.deposit,
          value: item.value,
          stars: item.stars,
          shortest_trip: item.shortest_trip,
          lolongest_trip: item.longest_trip,
          notice: item.notice,
          guest_location_notice: item.guest_location_notice,
          car_location_notice: item.car_location_notice,
          airport_notice: item.airport_notice,
          key_handoff: item.key_handoff,
          parking_details: item.parking_details,
          verified_insurance: item.verified_insurance,
          verified_registration: item.verified_registration,
          weekend_trip: item.weekend_trip,
          long_term_trip: item.long_term_trip,
          paid_advertising: item.paid_advertising,
          reviews: item.reviews
          // description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        }
        data.push(new_data);
      })
      setData(data);
      props.getTableData(data)
      
    })
  }

  const expandPhotoDiv = (key) => () => {
    if (selCar !== key) {
      setSelCar(key);

      fetch({
        url: '/car/' + key,
        method: 'get',
        headers: {
          'public-request': 'true'
        },
      }).then((resp) => {
        setImages({ ...images, [key]: resp.images });
        setPhotoShow(true);
      })
    } else
      setPhotoShow(s => !s);
  }
  const expandCarInsuranceDiv = () => {
    setCarInsuranceShow(s => !s);
  }
  const expandCarRegistrationDiv = () => {
    setCarRegistrationShow(s => !s);
  }
  const expendOwnerDiv = () => {
    setOwnerShow(s => !s);
  }

  const handleTableChange = (pager, filters, sorter) => {
    setPagination({ ...pagination, current: pager.current });
    fetchProducts({
      page: pager.current,
      results: pager.pageSize,
      dates: props.startDate + "," + props.endDate,
      search: props.searchText
    });
  };

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: record =>
          <div style={{ margin: 0 }}>
            <div>
              <div className="car_info_tab">
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Car style</div>
                    <div className="car_item_detail">{record.style}</div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Car type</div>
                    <div className="car_item_detail">{record.type} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Odometer</div>
                    <div className="car_item_detail">{record.car_odometer} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Created at</div>
                    <div className="car_item_detail">{record.created_at} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Updated at</div>
                    <div className="car_item_detail">{record.updated_at} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Deposit</div>
                    <div className="car_item_detail">{record.deposit} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Value</div>
                    <div className="car_item_detail">{record.value} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Star</div>
                    <div className="car_item_detail">{record.stars} </div>
                  </div>
                </div>
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Shortest trip</div>
                    <div className="car_item_detail">{record.shortest_trip} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Longest trip</div>
                    <div className="car_item_detail">{record.lolongest_trip} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Car notice</div>
                    <div className="car_item_detail">{record.notice} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Guest location notice</div>
                    <div className="car_item_detail">{record.guest_location_notice} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Car location notice</div>
                    <div className="car_item_detail">{record.car_location_notice} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Airport notice</div>
                    <div className="car_item_detail">{record.airport_notice} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Key handoff</div>
                    <div className="car_item_detail">{record.key_handoff} </div>
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Parking details</div>
                    <div className="car_item_detail">{record.parking_details} </div>
                  </div>
                </div>
              </div>
              <div className="car_info">
                <div className="car_item">
                  <div className="car_info_detail1">Car active</div>
                  <div className="car_info_icon">
                    {record.active == "Yes" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Verified insurance</div>
                  <div className="car_info_icon">
                    {record.verified_insurance == 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Verified registration</div>
                  <div className="car_info_icon">
                    {record.verified_registration == 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Weekend trip</div>
                  <div className="car_info_icon">
                    {record.weekend_trip == 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Long term trip</div>
                  <div className="car_info_icon">
                    {record.long_term_trip == 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Paid advertaising</div>
                  <div className="car_info_icon">
                    {record.paid_advertising == 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </div>
                </div>
                <div className="car_item">
                  <div className="car_info_detail1">Reviews</div>
                  <div className="car_info_icon">
                    {record.review}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="photo_info"><h3>Photos:{record.key in images ? images[record.key].length : 0}</h3>
                <button onClick={expandPhotoDiv(record.key)}>{photo_show && selCar === record.key ? <UpOutlined /> : <DownOutlined />}</button>
              </div>
              {photo_show && selCar === record.key && <div className="car_image">{
                record.key in images && images[record.key].map(item => {
                  return <div ><img src={"https://s3.ap-south-1.amazonaws.com/esarcar/" + item.small_image_path} width="350" height="230" /></div>
                })
              }</div>}
              <div className="photo_info"><h3>Car insurance:</h3>
                <button onClick={expandCarInsuranceDiv}>{car_insurance_show ? <UpOutlined /> : <DownOutlined />}</button>
              </div>
              {car_insurance_show && <div>ssss222</div>}
              <div className="photo_info"><h3>Car registration:</h3>
                <button onClick={expandCarRegistrationDiv}>{car_registration_show ? <UpOutlined /> : <DownOutlined />}</button>
                {/* <button onClick={expandCarRegistrationDiv}>{car_registration_show ? '+' : '-'}</button> */}
              </div>
              {car_registration_show && <div>ssss333</div>}
            </div>
            <div className="photo_info"><h3>Owner:</h3>
              <button onClick={expendOwnerDiv}>{owner_show ? <UpOutlined /> : <DownOutlined />}</button>
              {/* <button onClick={expendOwnerDiv}>{owner_show ? '+' : '-'}</button> */}
            </div>
            {owner_show && <div>ssss111</div>}
          </div>,
      }}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
      loading={loading}
    />
  );
}
