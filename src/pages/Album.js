import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { removeSong, addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      artUrl: '',
      tracks: [],
      request: null,
      listFavorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false,
      listFavorites: favorites });
  };

  fetchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const record = await getMusics(id);
    // console.log(record);
    const tracks = record.filter((e) => e.kind === 'song');
    this.setState({ albumName: record[0].collectionName,
      artistName: record[0].artistName,
      artUrl: record[0].artworkUrl100,
      tracks,
      request: record });
  };

  handleFavorite = async ({ target }) => {
    const { tracks, listFavorites } = this.state;
    const findFavorite = tracks.find((e) => e.trackId === Number(target.id));
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(findFavorite);
      this.setState((prev) => ({
        listFavorites: [...prev.listFavorites, findFavorite],
        loading: false,
      }));
    } else {
      this.setState({ loading: true });
      await removeSong(findFavorite);
      this.setState({ loading: false,
        listFavorites: listFavorites.filter((e) => e.trackId !== findFavorite.trackId) });
    }
  };

  render() {
    const {
      albumName,
      artistName,
      artUrl,
      tracks,
      request,
      loading,
      listFavorites } = this.state;
    return (
      <>
        <Header />
        { (loading) ? (<p>Carregando...</p>) : (
          <>
            <div data-testid="page-album">
              <h1 data-testid="artist-name">{artistName}</h1>
              <h2 data-testid="album-name">{albumName}</h2>
              <img src={ artUrl } alt={ albumName } />
            </div>
            <section>
              {tracks.map((e, i) => (<MusicCard
                key={ i }
                trackName={ e.trackName }
                previewUrl={ e.previewUrl }
                trackId={ e.trackId }
                request={ request }
                checkFavorite={ listFavorites.some((el) => el.trackId === e.trackId) }
                handleFavorite={ this.handleFavorite }
              />))}
            </section>
          </>
        )}
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: propTypes.shape().isRequired,
};
