import React, { PureComponent } from 'react'
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip,Button } from 'antd'
import moment from 'moment'
import routerRedux from 'dva/router'
// import groupBy from 'lodash/groupBy'
// import Debounce from 'lodash-decorators/debounce'
import { Link } from 'dva/router'
// import NoticeIcon from '../NoticeIcon'
// import HeaderSearch from '../HeaderSearch'
import styles from './index.less'

export default class GlobalHeader extends PureComponent {
    toBase(){
        const path = this.props.location.pathname
        if(path == '/'){
            return
        }
        routerRedux.replace(path)
    }
    render() {
        const {
            currentUser = {},
            isMobile,
            logo,
            onMenuClick,
        } = this.props
        const me = this
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item disabled>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        )
        return (
            <div className={styles.header}>
                <div className={styles.logo} onClick={()=>{this.toBase()}}>
                    <img src={logo} alt="logo" width="32" />
                </div>
                <Divider type="vertical" key="line" />
                <div className={styles.right}>
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                                <span className={styles.name}>{currentUser.name}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <div className="buttonBox">
                            <Link to="/user/login"  key="login">
                                <Button>登陆</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
