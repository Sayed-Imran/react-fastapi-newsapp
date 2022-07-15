import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl, newsUrl,author, date} = this.props
    return (
      <>
        <div className="card" style={{width: "18rem", backgroundColor: "#042743"}}>
          <img src={`${imgUrl?imgUrl:"https://c8.alamy.com/comp/R1P5YB/important-news-icon-flat-illustration-of-important-news-vector-icon-for-web-R1P5YB.jpg"}`} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title" style={{color: "white"}}>{title}...</h5>
            <p className="card-text" style={{color: "white"}}>{description}...</p>
            <small class="text-muted"><p className="card-text" style={{color: "white"}}>by {author?author:"Unknown"} on {new Date(date).toGMTString()}</p></small>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem