import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: 'general',
    Heading: 'Signews - Top Headlines'
  }

  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalArticles: 0,
      loading: true,
      page: 1,
    }
    document.title = `SigNews -${this.props.category} Headlines`
  }
  fetchMoreData = async()=>{
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({
      page: (this.state.page) + 1
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${(this.state.page) + 1}&apiKey=d262828a9aa549d79bf5089898406c66&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false
    })
  };

  async update(url) {
    
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(100)
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=d262828a9aa549d79bf5089898406c66&page=${this.state.page}&category=${this.props.category}&pageSize=${this.props.pageSize}`;
    this.update(url);

  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${(this.state.page) + 1}&apiKey=d262828a9aa549d79bf5089898406c66&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.update(url);
    this.setState({
      page: (this.state.page) + 1
    })


  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${(this.state.page) - 1}&apiKey=d262828a9aa549d79bf5089898406c66&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.update(url);
    this.setState({
      page: (this.state.page) - 1
    })


  }

  render() {
    return (
      <>
      
        <h1 className='text-center my-4'>SigNews - Top {this.props.Heading} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={! (this.state.articles.length === this.state.totalArticles)}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (<div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} imageurl={element.urlToImage} description={element.description ? element.description : ""} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
              </div>)
            })}

          </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}
