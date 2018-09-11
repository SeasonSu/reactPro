import React from 'react'
import styles from './index.less'
import Masonry from 'react-masonry-component'
import LazyLoad from 'react-lazy-load'
import { getList } from 'services/api'
import ReactDOM from 'react-dom'
import InfiniteScroll from 'react-infinite-scroller'

class WaterFall extends React.Component{
    constructor(props) {
        super(props);
        console.log('waterfall')
        this.state = {
            data:[],
            count:0,
            hasMoreItems:true
        }
    }
    componentWillMount() {
        // this.getData()
    }
    async getData(page) {
        var res = await getList({
            page:page
        })
        setTimeout(()=>{
            var newData = {
                data:this.state.data.concat(res.data.list)
            }
            // if(!res.hasNext){
            //     newData.hasMoreItems = false
            // }
            console.log(this)
            this.setState(newData)
            this.resizeLayout()
            // this.masonry.layout()
        },2000)
        // var this.state.data.push(res.data)

    }
    resizeLayout(){
        this.masonry.layout()
    }
    loadItems(page){
        console.log(page)
        this.getData(page)
    }
    getLoader(){
        if(this.state.hasMoreItems){
            return ( <div className={styles.loadMore} key={-2}>Loading ...</div>)
        }else{
            return ''
        }
    }
    renderList(){
        return this.state.data.map((item,index) => {
            return (
                <div className={styles.galleryBox} key={this.state.count++} data-id={item.id}>
                    <div className={styles.item}>
                         <a href="#">
                             <div className={styles.coverImg}>
                                <img
                                    src={item.coverUrl}
                                 />
                                 <div className={styles.coverbox}>
                                     <div className={styles.bg}></div>
                                     <img src={require('assets/waterfall/read2.png')} width="238" height="89" />
                                 </div>
                             </div>
                          </a>
                         <div className={styles.item_content}>
                             <div className={styles.item_name}>{item.title}</div>
                             <div className={styles.item_head}>
                                 <img src={item.headimg} />
                             </div>
                         </div>
                         <div className={styles.item_box}>
                             <div className={styles.item_type}>{item.type}</div>
                                 <div className={styles.item_zan} data-id="1" data-flag="true">{item.like}</div>
                             <div className={styles.item_forward}>{item.forward}</div>
                         </div>
                     </div>
                 </div>
            )
        })
    }
    render(){
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                threshold={100}
                loader= {<div className={styles.loadMore} key={-1}>Loading ...</div>}
            >
                <Masonry
                    className={styles.Masonry}
                    elementType={'div'}
                    options={{
                        transitionDuration: 500
                    }}
                    ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                >
                        {this.renderList()}
                </Masonry>
            </InfiniteScroll>
        )
    }
}



WaterFall.propTypes = {
}


export default WaterFall
