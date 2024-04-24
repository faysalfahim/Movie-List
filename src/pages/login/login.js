import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

  // Email validation function
  const validateEmail = (_, value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value) {
      return Promise.reject(new Error('Please enter your email.'));
    }
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }

    return Promise.resolve();
  };

  const onFinish = (values) => {
    // Here you can add further logic if needed
    console.log('Received values of form:', values);
    
    // Navigate to movie list page
    navigate('/list');
  };

  return (
    <div style={{ width: '300px', margin: 'auto', marginTop: '100px' }}>
      <Form
        initialValues={{ email: '' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
