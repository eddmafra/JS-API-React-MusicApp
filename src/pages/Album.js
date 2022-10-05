import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      artUrl: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const record = await getMusics(id);
    console.log(record);
    const tracks = record.filter((e) => e.kind === 'song');
    this.setState({ albumName: record[0].collectionName,
      artistName: record[0].artistName,
      artUrl: record[0].artworkUrl100,
      tracks });
  };

  render() {
    const { albumName, artistName, artUrl, tracks } = this.state;
    return (
      <>
        <Header />
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
          />))}

        </section>
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: propTypes.shape().isRequired,
};
