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
      url: "https://picsum.photos/v2/list?limit=10&page=",
      page: 1,
    };
  }

  componentDidMount() {
    this.loadMore()

  }

  loadMore() {
    setTimeout(() => {
      axios.get(this.state.url+this.state.page+1)
        .then(res => {
          console.log(res);
          this.setState({ images: [...this.state.images,...res.data],page:this.state.page+1 })
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
                <img src={image.download_url} alt={index} key={index} width={Math.floor(Math.random() * 200)+200+"px"} height={Math.floor(Math.random() * 270)+200+"px"} />
              )) : ""}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
