import React from 'react';
import { Input, Upload, Modal, Checkbox, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
const options1 = [
  { label: 'GPS', value: 'Apple' },
  { label: 'Child seat', value: 'Pear' },
  { label: 'USB input', value: 'Orange' },
];
const options2 = [
  { label: 'Sunroof', value: 'Apple' },
  { label: 'Bluthooh', value: 'Pear' },
  { label: 'Audio input', value: 'Orange' },
];
const options3 = [
  { label: 'All-wheel drive', value: 'Apple' },
  { label: 'Heated seats', value: 'Pear' },
  { label: 'Bike rack', value: 'Orange' },
];
const options4 = [
  { label: 'Ventialed seats', value: 'Apple' },
  { label: 'EV / Hybrid', value: 'Pear' },
  { label: 'Pet friendly', value: 'Orange' },
];
const options5 = [
  { label: 'Convertible', value: 'Apple' },
  { label: 'Toll pass', value: 'Pear' },
  { label: 'Roof rack', value: 'Orange' },
];
function Customiz() {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [fileList, setFileList] = React.useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Add Car Image</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setFileList([...fileList]); 
  }

  return (
    <>
      <h1>Detail</h1>
      <div className='customize_style'>
        <div className='customize_padding'>
          <div>
            License plate details
          </div>
          <div>
            <Input style={{ width: '200px' }} placeholder="Plate number" />
          </div>
        </div>
        <div className='customize_padding'>
          <div>
            City,state,country
          </div>
          <div>
            <Input style={{ width: '350px' }} placeholder="start typing...." />
          </div>
        </div>
      </div>
      <div className='customize_style'>
        <div className='customize_padding'>
          <div>
            Date of issue
          </div>
          <div>
            <Space direction="vertical" size={12}>
            <DatePicker renderExtraFooter={() => 'extra footer'} />
            </Space>
          </div>
        </div>
        <div className='customize_padding'>
          <div>
            Expiration date
          </div>
          <div>
          <Space direction="vertical" size={12}>
          <DatePicker renderExtraFooter={() => 'extra footer'} />
            </Space>
          </div>
        </div>
      </div>
      <div className='upload_photo'>
        <div className='customize_padding'>
          <div>
            Upload photo of car registration
          </div>

          <div className="clearfix">
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
      </div>
      <div className='upload_photo'>
        <div className='customize_padding'>
          <h4>Car description</h4>
          <div className='upload_photo'>
            A detailed description will  help you get more trips
          </div>
          <TextArea rows={4} style={{ width: '750px' }} />
          <div className='padding-top'>
            No need to includ your contact info; travels will receive  it once you've confirmed their trip.
          </div>
        </div>
      </div>
      <div className='upload_photo'>
        <div className='customize_padding'>
          <h3>
            Car features
          </h3>
          <div>
            <Checkbox.Group options={options1} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group options={options2} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group options={options3} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group options={options4} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group options={options5} onChange={onChange} />
            <br />
            <br />
          </div>
        </div>
      </div>

    </>

  )
}

export default Customiz;