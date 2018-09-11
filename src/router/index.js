import React from 'react'
import routes from './routes'
import dynamic from 'dva/dynamic'
import _ from 'lodash'
import Loading from 'components/Loading/index'
import { routerRedux, Route, Switch,Redirect} from 'dva/router'
import NotFound from 'components/Exception/404'
import { CommonLayout, UserLayout } from 'components/Layout'
import { checkRoutes } from 'utils/utilsRoutes'
const { ConnectedRouter } = routerRedux

const dynamicWrapper = _.values(routes).map((item,index) => (
    <Route
        exact
        key = {index}
        path = {item.path}
        component = {
            dynamic({
                app,
                models:() => item.models,
                component:() => item.component
            })
        }
    />
))

const RouterConfig = ({ history,app }) => {
    return (
        <ConnectedRouter history={history}>
            <Switch>

                <Route path="/user"
                    render={props => {
                        props.routerData = routes
                        return checkRoutes(props) ? (
                            <UserLayout {...props} />
                        ) : (
                            <Redirect key={props.location.pathname} exact from={props.location.pathname} to='/user/login' />
                        )
                    }}
                />
                <Route path="/"
                    render={props => {
                        props.routerData = routes
                        return checkRoutes(props) ? (
                            <CommonLayout {...props} />
                        ) : (
                            <NotFound />
                        )
                    }}
                />
            </Switch>
        </ConnectedRouter>
    )
}
export default RouterConfig
