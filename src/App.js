import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      sequence: -1
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    if(this.state.quotes.length > 0 &&
       this.state.sequence < this.state.quotes.length - 1) {
      this.setState({
        sequence: this.state.sequence + 1
      });
      return;
    }

    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyURL + 'https://favqs.com/api/quotes', {
      headers: { 'Authorization': 'Token token="43d6ba8555e5b64e6d0c8e9d7eb9a563"' }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          quotes: data.quotes,
          sequence: 0
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });

  }

  render() {
    const sequence = this.state.sequence;
    let quote = "Ops... no quote here";
    let author = "Me";
    if(sequence >= 0 && this.state.quotes.length > 0) {
      quote = this.state.quotes[sequence].body;
      author = this.state.quotes[sequence].author;
    }
    return (
      <div className="App">
        <h1>"{ quote }"</h1>
        <h3>{ author || "Unknown Author" }</h3>
        <p style={{ marginTop: "30px" }}>
          <button
            style={{
              height: "40px",
              backgroundColor: "white",
              border: 0,
              fontSize: "16px",
              cursor: "pointer"
            }}
            onClick={ this.fetchData }
          >
            Next Quote
          </button>
        </p>
      </div>
    );
  }
}

export default App;
