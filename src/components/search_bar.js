import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term:'',
    };
  }
  onInputChange = (term) => {
    this.setState({ term });
  }
  searchButtonClick = () => {
    this.props.onSearchTermChange(this.state.term);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={ this.state.term }
          onChange={e => this.onInputChange(e.target.value) }
          placeholder="type something" />
        <button onClick={ this.searchButtonClick }>search</button>
      </div>
    )
  }


}

export default SearchBar;
