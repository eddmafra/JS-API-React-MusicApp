import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      validateBtn: false,
      searchArtist: '',
    };
  }

  validateSearch = () => {
    const { searchArtist } = this.state;
    const textSizeMin = 2;
    if (searchArtist.length < textSizeMin) {
      this.setState({ validateBtn: false });
    } else {
      this.setState({ validateBtn: true });
    }
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ searchArtist: value }, this.validateSearch);
  };

  render() {
    const { validateBtn } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="searchArtist">
              <input
                data-testid="search-artist-input"
                type="text"
                name=""
                id="searchArtist"
                placeholder="Artista"
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ !validateBtn }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
