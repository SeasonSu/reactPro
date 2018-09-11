import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import omit from 'omit.js'
import styles from './index.less'
import Map from './Map'
const FormItem = Form.Item

function generator({ defaultProps, defaultRules, type }) {
    return WrappedComponent => {
        return class BasicComponent extends Component {
            static contextTypes = {
                form: PropTypes.object,
                updateActive: PropTypes.func,
            }
            constructor(props) {
                super(props)
                this.state = {
                    count: 0,
                }
            }
            componentDidMount() {
                const { updateActive } = this.context
                const { name } = this.props
                if (updateActive) {
                    updateActive(name)
                }
            }
            componentWillUnmount() {
                clearInterval(this.interval)
            }
            onGetCaptcha = () => {
                const { onGetCaptcha } = this.props
                const { form } = this.context
                if (!onGetCaptcha) {
                    return
                }
                form.validateFields(["mobile"], (err, values) => {
                    if(err){
                        return
                    }
                    var count = 59
                    this.setState({ count })
                    onGetCaptcha(values)
                    this.interval = setInterval(() => {
                        count -= 1
                        this.setState({ count })
                        if (count === 0) {
                            clearInterval(this.interval)
                        }
                    }, 1000)
                })
            }
            render() {
                const { form } = this.context
                const { getFieldDecorator } = form
                const { onChange, defaultValue, rules, name, ...restProps } = this.props
                const { count } = this.state
                var options = {}
                var otherProps = {}
                options.rules = rules || defaultRules
                if(onChange) {options.onChange = onChange}
                if(defaultValue) {options.initialValue = defaultValue}
                otherProps = restProps || otherProps
                if (type === 'Captcha') {
                    const inputProps = omit(otherProps, ['onGetCaptcha'])
                    return (
                        <FormItem>
                            <Row gutter={8}>
                                <Col span={16}>
                                    {getFieldDecorator(name, options)(
                                        <WrappedComponent {...defaultProps} {...inputProps} />
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Button
                                        disabled={count}
                                        className={styles.getCaptcha}
                                        size="large"
                                        onClick={this.onGetCaptcha}
                                    >
                                        {count ? `${count} s` : '获取验证码'}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    )
                }
                return (
                    <FormItem>
                        {getFieldDecorator(name, options)(
                            <WrappedComponent {...defaultProps} {...otherProps} />
                        )}
                    </FormItem>
                )
            }
        }
    }
}

const LoginItem = {}
Object.keys(Map).forEach(item => {
    LoginItem[item] = generator({
        defaultProps: Map[item].props,
        defaultRules: Map[item].rules,
        type: item,
    })(Map[item].component)
})

export default LoginItem
