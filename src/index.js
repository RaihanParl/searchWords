import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const urlForUsername = searchWords =>
`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchWords}`

export default class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    searchWords: '',
    requestFailed:false,
    response:null,
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.getData = this.getData.bind(this)
}

  static defaultProps = {
    searchWordsData: 'first',
  };

getData = (searchWordsData) =>{
  if (!searchWordsData || searchWordsData === '' || searchWordsData === 'Undefined') {
    searchWordsData = this.props.searchWordsData
  }
  fetch(urlForUsername(searchWordsData))
  .then(response => {
    if (!response.ok) {
          return response
        }
return response
  })
  .then(d => d.json())
  .then(d => {
    this.setState({
      response:d
    })
    console.log(d);
  },() => {
    this.setState({
      requestFailed:true
    })
  })
}
componentWillUnmount(){
  this.getData()
}
createMarkup() {
  if (this.state.response.query.searchinfo.totalhits === 0) {
    return {__html:"cannot found " + this.props.searchWords};
  }
return {__html:this.state.response.query.search[0].snippet};
}

createChecker(){
  if (this.state.searchWords === '') {
  return <p>insert some word</p>
  }else {
    if (!this.state.response) {
      return <p>LOADING....</p>
      }
      return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.getData(event.target.search.value)
    this.setState({searchWords:event.target.search.value})
  }

  render(){
    return(
      <div className="search-bar">
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search some words"
          onChange = {this.handleChange}
        />
      </form>
      {this.createChecker()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
