import { userRegisterUsingPOST } from '@/services/ant-design-pro/userController';
import { ContainerOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';
import './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('/Login Page.svg')",
      backgroundSize: '100%',
    };
  });
  const handleSubmit = async (values: API.User) => {
    const { password } = values;
    try {
      const id = await userRegisterUsingPOST(values);
      if (id) {
        const defaultLoginSuccessMessage = 'Register Successfully!';
        message.success(defaultLoginSuccessMessage);

        if (!history) return;
        const currentQueryString = window.location.search;
        history.push(`/user/login${currentQueryString}`);
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Register Fail, Please Try Again!';
    }
  };
  const validateEmail = (email) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <div className={'MainPage'}>
      <div className={'RegisterTable'}>
        <div className={'RegisterTitle'}>
          <img alt="logo" src="/logo2.svg" className="my-logo" />
          <h1 className={'Title'}>Create an account</h1>
          <h2 className={'Subtitle'}>Let's get started!</h2>
        </div>

        <div className={'RegisterForm'}>
          <LoginForm
            submitter={{
              searchConfig: {
                submitText: 'Register Now',
              },
            }}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.User);
            }}
          >
            {type === 'account' && (
              <>
                <ProFormText
                  name="nickname"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                    style: {
                      backgroundColor: 'white',
                    },
                  }}
                  placeholder="Input NickName"
                  rules={[
                    {
                      required: true,
                      message: 'Please Input NickName',
                    },
                  ]}
                />
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <ContainerOutlined />,
                    style: {
                      backgroundColor: 'white',
                    },
                  }}
                  placeholder="Input Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Input Email!',
                    },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        return validateEmail(value)
                          ? Promise.resolve()
                          : Promise.reject(new Error('Invalid Email Format'));
                      },
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    style: {
                      backgroundColor: 'white',
                    },
                  }}
                  placeholder="Input Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Input Password!',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: 'Mini Length 8 digits',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    style: {
                      backgroundColor: 'white',
                    },
                  }}
                  placeholder="Double Input Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please Input Password!',
                    },
                    {
                      min: 8,
                      type: 'string',
                      message: 'Mini Length 8 digits',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) {
                          return Promise.resolve();
                        }
                        if (value.length < 8) {
                          return Promise.reject();
                        }
                        if (getFieldValue('password') !== value) {
                          return Promise.reject(new Error('The two passwords do not match!'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                />
              </>
            )}
          </LoginForm>
        </div>
      </div>

      <div className={'backgroundImage'}></div>
    </div>
  );
};
export default Register;
