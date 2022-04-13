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



