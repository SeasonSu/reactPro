import React from 'react'
import { connect } from 'dva'
import styles from './index.less'
import {getList} from 'services/api'
import WaterFall from 'components/WaterFall'

class IndexPage extends React.Component{
    render(){
        return (
            <div className={styles.main}>
                <WaterFall />
            </div>
        )
    }
}

IndexPage.propTypes = {
}

export default connect(({user}) => ({
    user
}))(IndexPage)
