import React from 'react';
import { Select, Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Customiz() {
  const { Option } = Select;

 
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
            License plate details
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
            <Input style={{ width: '200px' }} placeholder="Plate number" />
          </div>
        </div>
        <div className='customize_padding'>
          <div>
            Expiration date
          </div>
          <div>
            <Input style={{ width: '200px' }} placeholder="start typing...." />
          </div>
        </div>
      </div>
      <div>
        <div className='customize_padding'>
          <div>
            Upload photo of car registration
          </div>
         
          {/* <div className="clearfix">
            <Upload         
              listType="picture-card"
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div> */}
        </div>
      </div>

    </>

  )
}

export default Customiz;