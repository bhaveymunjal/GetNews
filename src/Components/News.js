import React, { Component }from "react";
import NewsItem from "./NewsItem";
import Load from "./Load";
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8,
    apiKey: '4bd6958537784aaeb945df0a5eb136ac'
  }
  static propTypes = {
    country: PropTypes.string,
    category:PropTypes.string,
    pageSize:PropTypes.number,
    apiKey:PropTypes.string
  }
  articles=[];
  constructor() {
    super();
    // console.log("constructor of news");  
    this.state = {
      articles: this.articles,
      loading: false,
      page:1
    };
  }
  // https://newsapi.org/v2/top-headlines/sources?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}
  async componentDidMount() { 
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    data = await data.json();
    this.setState({ articles:data.articles,
                    totalResults:data.totalResults,
                    loading:false
                  })
    document.title = `GetNews - ${this.props.category!=='general'?this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1):"Home"}`
   }
  handleNextClick = async ()=>{
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    data = await data.json();
    this.setState({ articles:data.articles,
                    loading:false,
                    page:this.state.page+1
                  })
  }
    handlePreviousClick = async ()=>{
      let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      data = await data.json();
      this.setState({ articles:data.articles,
                      loading:false,
                      page:this.state.page-1
                    })
    }
  render() {
    return (
      <div className="container my-3">
        <h2 style={{color:this.props.mode==='light'?'black':'white'}}>NewsMonkey - Top headlines</h2>
        {this.state.loading && <Load/>}
        {!this.state.loading && <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.urlToImage}>
                <NewsItem source = {element.source.name} date = {element.publishedAt} author = {element.author?element.author:'Unknown'} title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2023/05/Screenshot-2023-05-04-at-1.44.54-PM.jpg?resize=1200,659"} url={element.url} mode={this.props.mode}/>
              </div>
            );
          })}
        </div>}
          <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page === 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page>this.state.totalResults/this.props.pageSize} onClick={this.handleNextClick}>Next &rarr;</button>
            
          </div>
      </div>
    );
  }
}

export default News;
