import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      validateBtn: false,
      searchArtist: '',
      loading: false,
      listAlbuns: [],
      search: false,
      artist: '',
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

  findArtist = async (target) => {
    target.preventDefault();
    const { searchArtist } = this.state;
    this.setState({ loading: true });
    const albuns = await searchAlbumsAPI(searchArtist);
    this.setState({ loading: false,
      listAlbuns: albuns,
      artist: searchArtist,
      searchArtist: '',
      search: true });
  };

  render() {
    const { validateBtn, loading, listAlbuns, artist, search, searchArtist } = this.state;
    return (
      <>
        <Header />
        { loading && <p>Carregando...</p> }
        <div data-testid="page-search">
          <form>
            <label htmlFor="searchArtist">
              <input
                data-testid="search-artist-input"
                type="text"
                name=""
                id="searchArtist"
                placeholder="Artista"
                value={ searchArtist }
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ !validateBtn }
              onClick={ this.findArtist }
            >
              Pesquisar
            </button>
          </form>
          {search && (
            <section>
              <h2>
                {`Resultado de álbuns de: ${artist}`}
              </h2>
              <div>
                {listAlbuns.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
                  : (
                    <div>
                      {' '}
                      {listAlbuns
                        .map(({ collectionId, artworkUrl100, collectionName }) => (
                          <div
                            key={ collectionId }
                          >
                            <img
                              src={ artworkUrl100 }
                              alt={ collectionName }
                            />
                            <NavLink
                              to={ `/album/${collectionId}` }
                              data-testid={ `link-to-album-${collectionId}` }
                            >
                              {collectionName}
                            </NavLink>
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </section>)}
        </div>
      </>
    );
  }
}

export default Search;
