import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, description , imageurl , newsUrl , date , author , source} = this.props;
    return (
      <div className='my-3'>
        <div className="card bg-secondary my-2 ">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style = {{left : "93%",zIndex:'1'}}>{source}
            </span>
          <img src={imageurl?imageurl:"https://inteng-storage.s3.amazonaws.com/2022/10/16/image/jpeg/qquqIZ4H0a92aNfBr0KFh0niQftD6zfRHTt0xqzX.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title} </h5>
              <span className='badge bg-light text-dark'>{new Date(date).toGMTString()}</span>
              <p className="card-text">{description}</p>
              <span className="badge bg-light text-dark">Author : {!author?"Unknown":author}</span> <br /> <br />
              <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
