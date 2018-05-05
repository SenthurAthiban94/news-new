import React, { Component } from 'react';
var trends=require('node-google-search-trends');
export default class Blogcontent extends Component {
    componentWillMount(){
        trends('India', 10, function(err, data) {
            if (err) return console.err(err);
            let topSites=[];
            topSites=Object.keys(data).map((e)=>{
            var singlesite={};
                singlesite.title=(data[e]['title'].length) ? data[e]['title'][0] : "";
                singlesite.description=data[e]['description'].length ? data[e]['description'][0] : "";
                singlesite.traffic=data[e]['ht:approx_traffic'].length ? data[e]['ht:approx_traffic'][0].replace(/,/g,'').replace('+','') : "";
                singlesite.contentLink=data[e]['ht:news_item'].length ? ((data[e]['ht:news_item'][0]['ht:news_item_url'].length) ? data[e]['ht:news_item'][0]['ht:news_item_url'][0] : "" ) : "";
                singlesite.contentImageUrl=data[e]['ht:picture'].length ? data[e]['ht:picture'][0] : "";
                singlesite.dateTracked=data[e]['pubDate'].length ? data[e]['pubDate'][0] : "";
                topSites.push(singlesite);
                return topSites;
            });
        });
    }
    render() {
        return (
            <div className="content-wrapper">
                <h3 className="Heading">THIS IS THE TITLEdsfsafsf asdfsafsa dfsdf</h3>
                <div className="contenttab">
                </div>
                <div className="contenttab">
                </div>
                <div className="contenttab">
                </div>
                <div className="contenttab">
                </div>
                <div className="contenttab">
                </div>
        </div>
        )
    }
}
