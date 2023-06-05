import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Load from "./Load";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
    apiKey: process.env.REACT_APP_NEWS_API,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string,
  };
  articles = [];
  constructor(props) {
    super(props);
    // console.log("constructor of news");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      // totalResults: 0,
      totalResults: this.articles.totalResults,
    };
    document.title = `GetNews - ${this.props.category !== "general"  ? this.props.category.charAt(0).toUpperCase() +    this.props.category.slice(1)  : "Home"}`;
  }
  // https://newsapi.org/v2/top-headlines/sources?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}
  async componentDidMount() {
    this.props.setProgress(10)
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40)
    data = await data.json();
    this.props.setProgress(60)
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
    // document.title = `GetNews - ${this.props.category!=='general'?this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1):"Home"}`
  }
  handleNextClick = async () => {
    let url = ` https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    data = await data.json();
    this.setState({
      articles: data.articles,
      loading: false,
      page: this.state.page + 1,
    });
  };
  handlePreviousClick = async () => {
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    data = await data.json();
    this.setState({
      articles: data.articles,
      loading: false,
      page: this.state.page - 1,
    });
  };
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });
    let data = await fetch(url);
    data = await data.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: false,
    });
  };
  render() {
    // console.log(this.state.totalResults)
    // console.log(this.state.articles.length)
    return (
      <>
        <h2  className="text-center my-3" style={{ color: this.props.mode === "light" ? "black" : "white" }}>Get News - Top{" "}{this.props.category !== "general" ? this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) : "General"}{" "}headlines</h2>
        {/* {this.state.loading && <Load/>} */}
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // hasMore={true}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col md-4" key={element.urlToImage}>
                    <NewsItem
                      source={element.source.name}
                      date={element.publishedAt}
                      author={element.author ? element.author : "Unknown"}
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={ element.urlToImage ? element.urlToImage : "https://techcrunch.com/wp-content/uploads/2023/05/Screenshot-2023-05-04-at-1.44.54-PM.jpg?resize=1200,659"}
                      url={element.url}
                      mode={this.props.mode}
                    />
                  </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page === 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page>this.state.totalResults/this.props.pageSize} onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    );
  }
}

export default News;
