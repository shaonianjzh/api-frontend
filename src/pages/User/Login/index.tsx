import Footer from '@/components/Footer';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {history, useModel} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import styles from './index.less';
import {userLoginUsingPOST, userRegisterUsingPOST} from '@/services/xcapi-backend/userController';

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
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
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {setInitialState} = useModel('@@initialState');
  const handleSubmit = async (values: any) => {
    if (type === 'account') {
      try {
        // 登录
        const res = await userLoginUsingPOST({
          ...values,
        });
        if (res.data) {
          const urlParams = new URL(window.location.href).searchParams;
          setInitialState({
            loginUser: res.data
          });
          history.push(urlParams.get('redirect') || '/');
          return;
        }
      } catch (error) {
        const defaultLoginFailureMessage = '登录失败，请重试！';
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    } else {
      try {
        // 注册
        const res = await userRegisterUsingPOST({
          ...values,
        });
        if (res.data) {
          message.success("注册成功");
          history.push('/')
          return;
        }
      } catch (error) {
        const defaultLoginFailureMessage = '用户名重复或两次密码不一致';
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    }

  };
  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg"/>}
          title="API接口平台"
          subTitle={'API 开放平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                placeholder={"请输入用户名"}
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                placeholder={"请输入密码"}
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'register' && (
            <LoginMessage content={'用户名重复或者两次输入密码不一样'}/>
          )}
          {type === 'register' && (
            <>
              <ProFormText
                placeholder={"请输入用户名"}
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                placeholder={"请输入密码"}
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                placeholder={"请再次输入密码"}
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {type === 'account' ?
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </div> : <div></div>}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
