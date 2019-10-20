import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      url: "https://api.pexels.com/v1/curated?per_page=10&page=",
      page: 0,
      hasMoreItems: true,
      items: 20,
      isLoading: true,
      cursor: 0
    };
  }

  componentDidMount() {
    this.loadMore()

  }

  loadMore() {
    setTimeout(() => {
      axios.get("https://api.pexels.com/v1/curated?per_page=10&page="+this.state.page+1, { 'headers': { 'Authorization': "563492ad6f91700001000001a65233e371e14da7b35d21419876746b" } })
        .then(res => {
          this.setState({ images: [...this.state.images,...res.data.photos],page:this.state.page+1 })
        })
        .catch(error => {
          console.log(error);
        });
    }, 5000);

  }

  render() {
    console.log(this.state.images);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Welcome to React </h1>{" "}
        </header>
        <InfiniteScroll
          loadMore={this.loadMore.bind(this)}
          hasMore={true}
          loader={
            <div>loading...</div>
          }
        >
          <div>
            {this.state.images.length > 1 ?
              this.state.images.map((image, index) => (
                <img src={image.src.medium} alt={index} key={index} />
              )) : ""}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
