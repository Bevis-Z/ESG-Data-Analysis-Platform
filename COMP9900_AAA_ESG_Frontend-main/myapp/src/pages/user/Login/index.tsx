import { Footer } from '@/components';

import { getLoginUserUsingGET, userLoginUsingPOST } from '@/services/ant-design-pro/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
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
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGET();

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.loginUserParams) => {
    try {
      const res = await userLoginUsingPOST(values);
      const defaultLoginSuccessMessage = 'Login successful!';
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } catch (error) {
      const defaultLoginFailureMessage = 'Login failed, please try again!';
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'Login'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Login',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.loginUserParams);
          }}
        >
          <h2>Please Login</h2>

          {/* {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'Incorrect username/password(admin/ant.design)'} />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Input Username'}
                rules={[
                  {
                    required: true,
                    message: 'Input your username!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Input password'}
                rules={[
                  {
                    required: true,
                    message: 'Input your password!',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Remember me
            </ProFormCheckbox>
            <Link to="/user/resetPassword" style={{ float: 'right' }}>
              Forget Password?
            </Link>
          </div>
          <Link to="/user/register">Don't Have an Account? Sign Up</Link>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
