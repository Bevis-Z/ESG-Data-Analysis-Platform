import {
  verifyCodeUsingPOST,
  verifyEmailUsingPOST,
} from '@/services/ant-design-pro/userController';
import { ContainerOutlined, LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';
import './index.less';

const ResetPassword: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [emailValue, setEmailValue] = useState(''); // 使用React的useState来保存email的值
  const [codeValue, setCodeValue] = useState(''); // 使用React的useState来保存email的值
  const [newPassword, setNewPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

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
  const handleSubmit = async (values: API.verifyCodeUsingPOSTParams) => {
    try {
      const response = await verifyCodeUsingPOST(values);
      if (response === 'Verification passed' || response === '201 CREATED') {
        // 根据实际情况判断
        const defaultResetPasswordSuccessMessage = 'Reset Password Successfully!';
        message.success(defaultResetPasswordSuccessMessage);

        if (!history) return;
        const currentQueryString = window.location.search;
        history.push(`/user/login${currentQueryString}`);
        return;
      } else {
        // 处理其他的响应状态
        throw new Error('Unexpected response');
      }
    } catch (error) {
      const defaultResetPasswordFailureMessage = 'Reset Password Fail, Please Try Again!';
      message.error(defaultResetPasswordFailureMessage);
    }
  };

  const [isCodeValidated, setIsCodeValidated] = useState(false);

  const handleSendCode = async (values: API.verifyEmailUsingPOSTParams) => {
    message.loading('Sending verification code', 5);
    try {
      const response = await verifyEmailUsingPOST(values);
      if (response === 'OK') {
        message.success('Verification code sent successfully!');
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      message.error('Failed to send verification code');
    }
  };

  return (
    <div className={'MainPage'}>
      <div className={'RegisterTable'}>
        <div className={'RegisterTitle'}>
          <img alt="logo" src="/logo2.svg" className="my-logo" />
          <h1 className={'Title'}>Reset your Password</h1>
          <h2 className={'Subtitle'}>Let's get started!</h2>
        </div>

        <div className={'RegisterForm'}>
          <LoginForm
            submitter={{
              searchConfig: {
                submitText: 'Reset Password',
                disabled: !isCodeValidated,
              },
            }}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values: API.verifyCodeUsingPOSTParams) => {
              await handleSubmit(values);
            }}
          >
            {type === 'account' && (
              <>
                <div className={"emailBox"}>

                  <ProFormText
                    name="email"
                    fieldProps={{
                      size: 'large',
                      prefix: <ContainerOutlined />,
                      style: {
                        backgroundColor: 'white',
                        marginBottom: 1,
                      },

                      onChange: (e) => {
                        setEmailValue(e.target.value);
                        setIsEmailValid(validateEmail(e.target.value));
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
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'white',
                      marginLeft: 15

                    }}
                    disabled={!isEmailValid}
                    onClick={() => handleSendCode({ email: emailValue })}
                    className={"verifyEmail"}
                  >
                    Get Code
                  </button>
                </div>
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                    style: {
                      backgroundColor: 'white',
                    },
                  }}
                  placeholder="Input Verify Code"
                  rules={[
                    {
                      required: true,
                      message: 'Please Input Code!',
                    },
                  ]}
                />
              </>
            )}
            <ProFormText.Password
              name="newPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
                style: {
                  backgroundColor: 'white',
                },
                onChange: (e) => setNewPassword(e.target.value),
              }}
              placeholder="Input New Password"
              rules={[
                {
                  required: true,
                  message: 'Please Input New Password!',
                },
                {
                  min: 8,
                  type: 'string',
                  message: 'Minimum length 8 characters',
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>

      <div className={'backgroundImage'}></div>
    </div>
  );
};
export default ResetPassword;
