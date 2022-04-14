import React, { useState, useEffect } from "react";
import { Table, Modal, Button  } from 'antd';
import fetch from 'auth/FetchInterceptor';
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
    const { confirm } = Modal;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [changeButton, setChangeButton] = useState(true);
    const [photo_show, setPhotoShow] = useState(false);
    const [profile_detail_show, setProfileDetailShow] = useState(false);
    const [car_show, setCarShow] = useState(false);
    const [selPhoto, setSelPhoto] = useState();
    const [selProfile, setSelProfile] = useState();
    const [selCar, setSelCar] = useState();
    const columns = [
        { title: 'USER ID', dataIndex: 'id', key: 'id' },
        { title: 'First name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Listed Cars', dataIndex: 'listed_cars', key: 'listed_cars' },
        { title: 'Joined', dataIndex: 'joined', key: 'joined' },
        { title: 'Phone number', dataIndex: 'phone_number', key: 'phone_number' },
        { title: 'Car trips', dataIndex: 'car_trips', key: 'car_trips' },
        { title: 'Active', dataIndex: 'active', key: 'active' },
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
        // { title: 'Verified', dataIndex: 'id_verified', key: 'id_verified' },
        // { title: 'Not Status', dataIndex: 'note_status', key: 'note_status' },
        // {
        //   title: 'Note',
        //   render: (rowData) => {
        //     // if (rowData.active == "NO") {
        //     //   const button = (
        //     //     <CheckOutlined
        //     //       onClick={showConfirmDelete(rowData.id)}
        //     //     >
        //     //     </CheckOutlined>
        //     //   );
        //     //   return button;
        //     // } else {
        //     //   const button = (
        //     //     <DeleteOutlined
        //     //       onClick={showConfirmRestore(rowData.id)}
        //     //     >
        //     //     </DeleteOutlined >
        //     //   );
        //     //   return button;
        //     // }
    
        //   }
        // },
      ];
      
    const fetchProducts = (params) => {
      setLoading(true);
        fetch({
          url: '/users',
          method: 'get',
          headers: {
            'public-request': 'true'
          },
          params
        }).then((resp) => {
          setLoading(false);
          var data = [];
          var new_data = {};
          setPagination({ ...pagination, total: resp.meta.total });
          resp.data.users.map((item) => {
              // console.log(item);
              item.active = item.active == 1 ? "Yes" : "NO";
              new_data = {
                key: item.id,
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                email: item.email,
                listed_car: item.listed_cars,
                joined: item.joined,
                phone_number: item.phone_number,
                car_trips: item.car_trips,
                active: item.active,
                // id_verified: item.id_verified,
                // note_status: item.note_status,
                // description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
              }
              data.push(new_data);
              console.log(data);
            })
            setData(data);   
        })
      }
      console.log(data);
    const handleTableChange = (pager, filters, sorter) => {

        setPagination({ ...pagination, current: pager.current });
        fetchProducts({
          page: pager.current,
          results: pager.pageSize,
          dates: props.startDate + "," + props.endDate,
          search: props.searchText,
          active: props.selectActive
        });
      };

    useEffect(() => {
        if (props.startDate === undefined)
          fetchProducts({ page: 1 });
        else
          fetchProducts({ page: 1, dates: props.startDate + "," + props.endDate, search: props.searchText, active: props.selectActive});
      }, [props.reloadState, props.startDate, props.endDate, props.searchText, props.selectActive, changeButton]);
    const showConfirmDelete = (id) => () => {
      confirm({
        title: "Do you want to delete these items?",
        content:
          "When clicked the OK button, this dialog will be closed after 1 second",
        onOk() {
          fetch({
            url: '/users/restore/' + id,
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
            url: '/users/delete/' + id,
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
    const expandPhotoDiv = (key) => () =>{
      if (selPhoto !== key) {
        if(photo_show == true) {
          setPhotoShow(false);
        }
        setSelPhoto(key);
      }
        setPhotoShow(s => !s);
    }
    const expandProfileDetail = (key) => () =>{
      if (selProfile !== key) {
        if(profile_detail_show == true) {
          setProfileDetailShow(false);
        }
        setSelProfile(key);
      }
      setProfileDetailShow(s => !s);
    }
    const expandCarsDiv = (key) => () =>{
      if (selCar !== key) {
        if(car_show == true) {
          setCarShow(false);
        }
        setSelCar(key);
      }
      setCarShow(s => !s);
    }
  

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
                    <div className="car_info_detail">Accepted trips in row</div>
                    {/* <div className="car_item_detail">{record.style}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Joined</div>
                    {/* <div className="car_item_detail">{record.type} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Listed cars</div>
                    {/* <div className="car_item_detail">{record.car_odometer} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Number of penalties</div>
                    {/* <div className="car_item_detail">{record.created_at} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Shortest trip</div>
                    {/* <div className="car_item_detail">{record.updated_at} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Penalty amount</div>
                    {/* <div className="car_item_detail">{record.deposit} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars</div>
                    {/* <div className="car_item_detail">{record.value} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars as owner</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars as renter</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Trips taken</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                </div>
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Active</div>
                    {/* <div className="car_item_detail">{record.shortest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Approved to drive</div>
                    {/* <div className="car_item_detail">{record.lolongest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">email verified</div>
                    {/* <div className="car_item_detail">{record.notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">id verified</div>
                    {/* <div className="car_item_detail">{record.guest_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Phone verified</div>
                    {/* <div className="car_item_detail">{record.car_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">reviewed</div>
                    {/* <div className="car_item_detail">{record.airport_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Bank name</div>
                    {/* <div className="car_item_detail">{record.key_handoff} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Account number</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">IBAN</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Holder name</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                </div>
              </div>
              <div className="photo_info"><h3>Photos</h3>
                <button onClick={expandPhotoDiv(record.key)}>{photo_show && selPhoto=== record.key ?  <UpOutlined /> : <DownOutlined />}</button>
               
              </div>
                {photo_show &&  selPhoto=== record.key && 
                <div>
                  <div className="car_info_tab">
                  <div className="car_info">
                    
                  </div>
                  <div className="car_info">
                    
                  </div>
                  <div className="car_info">
                    
                  </div>
                </div>
                </div>} 
              <div className="photo_info"><h3>Profile details</h3>
                <button onClick={expandProfileDetail(record.key)}>{profile_detail_show && selProfile=== record.key ?  <UpOutlined /> : <DownOutlined />}</button>
              </div>
              {profile_detail_show &&  selProfile=== record.key &&
               <div>
                <div className="car_insurance_body">
                  <div className="car_item">
                    <div className="car_insurance_detail">Address</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.car_id}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Created at</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.created_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Date of issue</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.date_of_issue}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Date of birth</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.detectable_amount}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Driver licence date of issue</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.expiration_date}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Driver licence expiration date</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.id}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Driver licence number</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.policy_number}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Expiration date</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail">Expired driver licence</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> City id</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Country id</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Number ID</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> State ID</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Issued by</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Language</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> First name</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Middle name</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Last name</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> School</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Updated at</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_insurance_detail"> Works</div>
                    {/* <div className="car_insurance_detail">{carInsuranceData.updated_at}</div> */}
                  </div>
                </div>
             </div>} 
              <div className="photo_info"><h3>ddddd</h3>
                <button onClick={expandCarsDiv(record.key)}>{car_show && selCar=== record.key ?  <UpOutlined /> : <DownOutlined />}</button>
              </div>
              {car_show &&  selCar=== record.key &&
               <div className="car_info_tab">
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Accepted trips in row</div>
                    {/* <div className="car_item_detail">{record.style}</div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Joined</div>
                    {/* <div className="car_item_detail">{record.type} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Listed cars</div>
                    {/* <div className="car_item_detail">{record.car_odometer} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Number of penalties</div>
                    {/* <div className="car_item_detail">{record.created_at} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Shortest trip</div>
                    {/* <div className="car_item_detail">{record.updated_at} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Penalty amount</div>
                    {/* <div className="car_item_detail">{record.deposit} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars</div>
                    {/* <div className="car_item_detail">{record.value} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars as owner</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Stars as renter</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Trips taken</div>
                    {/* <div className="car_item_detail">{record.stars} </div> */}
                  </div>
                </div>
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Active</div>
                    {/* <div className="car_item_detail">{record.shortest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Approved to drive</div>
                    {/* <div className="car_item_detail">{record.lolongest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">email verified</div>
                    {/* <div className="car_item_detail">{record.notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">id verified</div>
                    {/* <div className="car_item_detail">{record.guest_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Phone verified</div>
                    {/* <div className="car_item_detail">{record.car_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">reviewed</div>
                    {/* <div className="car_item_detail">{record.airport_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Bank name</div>
                    {/* <div className="car_item_detail">{record.key_handoff} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Account number</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">IBAN</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Holder name</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                </div>
                <div className="car_info">
                  <div className="car_item">
                    <div className="car_info_detail">Active</div>
                    {/* <div className="car_item_detail">{record.shortest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Approved to drive</div>
                    {/* <div className="car_item_detail">{record.lolongest_trip} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">email verified</div>
                    {/* <div className="car_item_detail">{record.notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">id verified</div>
                    {/* <div className="car_item_detail">{record.guest_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Phone verified</div>
                    {/* <div className="car_item_detail">{record.car_location_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">reviewed</div>
                    {/* <div className="car_item_detail">{record.airport_notice} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Bank name</div>
                    {/* <div className="car_item_detail">{record.key_handoff} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Account number</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">IBAN</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                  <div className="car_item">
                    <div className="car_info_detail">Holder name</div>
                    {/* <div className="car_item_detail">{record.parking_details} </div> */}
                  </div>
                </div>
             </div>} 
            </div>
          </div>,
        }}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    );
  }



