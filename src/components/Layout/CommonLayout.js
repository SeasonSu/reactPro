import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, message } from 'antd'
import DocumentTitle from 'react-document-title'
import { connect } from 'dva'
import { Route, Redirect, Switch, routerRedux } from 'dva/router'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import pathToRegexp from 'path-to-regexp'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import HeaderComp from 'components/Header'
import FooterComp from 'components/Footer'
import SiderMenu from 'components/SiderMenu'
import NotFound from 'components/Exception/404'
import { getRoutes } from 'utils/utilsRoutes'
import { getMenuData } from 'components/menu'
import logo from 'assets/logo.jpg'
const { Content, Header, Footer } = Layout

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
}

let isMobile
enquireScreen(b => {
    isMobile = b
})

class BasicLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    }
    state = {
        isMobile,
    }
    getChildContext() {
        const { location, routerData } = this.props
        return {
            location,
            // breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
        }
    }

    componentDidMount() {
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
                isMobile: mobile,
            })
        })
        const { dispatch } = this.props
        // dispatch({
        //     type: 'user/fetchCurrent',
        // })
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler)
    }

    getPageTitle() {
        const { routerData, location } = this.props
        const { pathname } = location
        let title = 'Ant Design Pro'
        let currRouterData = null
        // match params path
        Object.keys(routerData).forEach(key => {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key]
            }
        })
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - Ant Design Pro`
        }
        return title
    }

    handleMenuClick = ({ key }) => {
        const { dispatch } = this.props
        console.log(key)
        if (key === 'logout') {
            dispatch({
                type: 'user/logout',
            })
        }
    }

    render() {
        const {
            currentUser,
            collapsed,
            fetchingNotices,
            notices,
            routerData,
            match,
            location,
        } = this.props
        const { isMobile: mb } = this.state
        // const bashRedirect = this.getBaseRedirect()
        const layoutCommon = (
            <Layout>

                <Layout>
                    <Header style={{ padding: 0 }}>
                        <HeaderComp
                            logo={logo}
                            currentUser={currentUser}
                            fetchingNotices={fetchingNotices}
                            notices={notices}
                            collapsed={collapsed}
                            isMobile={mb}
                            location={location}
                            onMenuClick={this.handleMenuClick}

                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            {getRoutes(match.path, routerData).map(item => (
                                <Route
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    authority={item.authority}
                                />
                            ))}
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <FooterComp
                            links={[
                                {
                                    key: 'Pro 首页',
                                    title: 'Pro 首页',
                                    href: 'http://pro.ant.design',
                                    blankTarget: true,
                                },
                                {
                                    key: 'github',
                                    title: <Icon type="github" />,
                                    href: 'https://github.com/ant-design/ant-design-pro',
                                    blankTarget: true,
                                },
                                {
                                    key: 'Ant Design',
                                    title: 'Ant Design',
                                    href: 'http://ant.design',
                                    blankTarget: true,
                                },
                            ]}
                            copyright={
                                <Fragment>
                                  Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
                                </Fragment>
                            }
                        />
                        </Footer>
                  </Layout>
            </Layout>
        )
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layoutCommon}</div>}
                </ContainerQuery>
            </DocumentTitle>
        )
    }
}

export default connect(({ user = {}, menu = {}, loading }) => ({
    currentUser: user.currentUser,
    collapsed: menu.collapsed,
    // fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
}))(BasicLayout)
