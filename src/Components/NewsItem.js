import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url,author,date,source,mode } = this.props;
    return (
      <div>
        <div className="card my-3" style={{ width: "18rem", border:mode==='dark'?"1px solid #FFC107":"",background:mode==='dark'?'#163639':"", color:mode==='dark'? "white":""}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." height={'150px'}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text" ><small className="text-body-secondary text-dark" >By - {author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">Read Full Article Here</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
