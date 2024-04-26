import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);

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

  const handlePasswordFocus = () => {
    setPasswordError(true);
  };

  const handlePasswordBlur = () => {
    setPasswordError(false);
  };

  const onFinish = (values) => {
    // Here you can add further logic if needed
    console.log('Received values of form:', values);
    
    // Navigate to movie list page
    navigate('/list');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '200px', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Title level={3} style={{ marginBottom: '20px', textAlign: 'center' }}>Sign UP</Title>
      <Form
        initialValues={{ email: '', password: '' }}
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
          <Input prefix={<UserOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password.',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
        </Form.Item>
        {passwordError && (
          <div style={{ color: 'red' }}>Please enter your password.</div>
        )}

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
