import React from 'react';
import { Select, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function Photos() {
  const { Option } = Select;
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
      <h1>Car photos</h1>
      <div className='customize_style'>
        <div className='customize_padding'>
          <div>
            It's important for travels to see  your car before the request it. Once you have a good photo that<br/>
            shows the whole car, add more photos displaying the car's details and interior. Learn more about<br/>
            taking great photos.
          </div>      
        </div>   
      </div>
      
      <div className='upload_photo'> 
        <div className='customize_padding'>
          <div>
            Photo must be at least 640px by 320px
          </div>
         
          <div className="customize_padding">
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
              style={{width: '200px'}}
            >
              {fileList.length >= 8 ? null : uploadButton}
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

export default Photos;