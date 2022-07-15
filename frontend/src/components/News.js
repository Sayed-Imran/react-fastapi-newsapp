import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {

    static propTypes = {
        country: propTypes.string,

    }

    static defaultProps = {
        country: "in",

    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `http://3.109.157.35:9090/?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ 
            articles: parsedData.articles, 
            totalCount: parsedData.totalCount,
            loading: false 
        })
    }
    handleNext = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalCount / this.props.pageSize))) { 
            let url = `http://3.109.157.35:9090/?country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    handlePrevious = async () => {
        let url = `http://3.109.157.35:9090/?country=${this.props.country}&category=${this.props.category}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    render() {
        return (
            <>
            
            <div className='container my-3'>
                <h1 className='text-center' style={{color: "white" , margin: "35px 0px"}}>News Headlines</h1>
                {this.state.loading && <Spinner />  }              
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 35) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}
                </div>
            </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalCount / this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News