import React, {Component} from 'react'
import styles from './preload.less'
import loadingIcon from 'assets/waterfall/loading4.gif'
const PlaceholderComponent = () => {
    return (
        <div className={styles.placeLoader}>
            <img src={loadingIcon}/>
        </div>
    )
}
class PreLoad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoad: false
        }
        this.preload(this.props.src)
    }
    preload(url){
        var Img = new Image()
        Img.src = url
        Img.onload = this.imgLoad.bind(this)
        Img.onerror = this.imgError.bind(this)
    }
    imgLoad(){
        this.setState({
            isLoad:true
        })
        this.props.onLoad && this.props.onLoad()
    }
    imgError(){
        console.log('error')
    }
    render() {
        return (
            <div className="preLoadImg">
                {
                    this.state.isLoad ? (
                        <img src={this.props.src} />
                    ):(
                        <PlaceholderComponent />
                    )
                }
            </div>
        )
    }
}

export default PreLoad
