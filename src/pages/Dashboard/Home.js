import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Checkbox, Alert, Icon } from 'antd'
import LoginComp from 'components/User/Login'
import styles from './index.less'
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComp

class LoginPage extends React.Component {
    state = {
        type: 'account',
        autoLogin: true
    }
    onTabChange = type => {
        this.setState({ type })
    }
    handleSubmit = (err, values) => {
        const { type } = this.state
        const { dispatch } = this.props
        console.log(this)
        if (!err) {
            dispatch({
                type: 'user/login',
                payload: {
                    ...values,
                    type,
                },
            })
        }
    }
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        })
    }
    onGetCaptcha = values => {
        console.log(values)
        console.log('getCaptcha')
    }
    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    }
    render() {
        console.log(this)
        const { user, submitting } = this.props
        const { type, autoLogin } = this.state
        return (
            <div className={styles.main}>
                <LoginComp defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
                    <Tab key="account" tab="账户密码登录">
                        {user.status === 'error' && login.type === 'account' &&!submitting && this.renderMessage('账户或密码错误（admin/888888）')}
                        <UserName name="userName" placeholder="admin/user" />
                        <Password name="password" placeholder="888888/123456" />
                    </Tab>
                    <Tab key="mobile" tab="手机号登录">
                        {user.status === 'error' && login.type === 'mobile' && !submitting && this.renderMessage('验证码错误')}
                        <Mobile name="mobile"/>
                        <Captcha name="captcha" onGetCaptcha={this.onGetCaptcha} />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            自动登录2
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            忘记密码
                        </a>
                    </div>
                    <Submit loading={submitting}>登录</Submit>
                    <div className={styles.other}>
                        其他登录方式
                        <Icon className={styles.icon} type="alipay-circle" />
                        <Icon className={styles.icon} type="taobao-circle" />
                        <Icon className={styles.icon} type="weibo-circle" />
                        <Link className={styles.register} to="/user/register">
                            注册账户
                        </Link>
                    </div>
                </LoginComp>
            </div>
        )
    }
}

LoginPage.Authority = 'admin'

export default connect(({ user, loading }) => ({
    user,
    submitting: loading.effects['user/login']
}))(LoginPage)
