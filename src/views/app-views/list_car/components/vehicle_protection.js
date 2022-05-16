import React from 'react';
import { Select, Input, Upload, Modal, DatePicker, Space  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function VehicleProtection() {
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
    setFileList([ ...fileList ]);
  }

  return (
    <>
      <h1>Detail</h1>
      <div className='customize_style'>
        <div className='customize_padding'>
          <div>
            Detectable amount
          </div>
          <div>
            <Input style={{ width: '200px' }} placeholder="Plate number" />
          </div>
        </div>
        <div className='customize_padding'>
          <div>
            Policy number
          </div>
          <div>
            <Input style={{ width: '200px' }} placeholder="start typing...." />
          </div>
        </div>
      </div>
      <div className='customize_style'>
        <div className='customize_padding'>
          <div>
            Date of issue
          </div>
          <div>
          <DatePicker renderExtraFooter={() => 'extra footer'} />
          </div>
        </div>
        <div className='customize_padding'>
          <div>
            Expiration date
          </div>
          <div>
          <DatePicker renderExtraFooter={() => 'extra footer'} />
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

    </>

  )
}

export default VehicleProtection;