import React from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, checkFavorite, handleFavorite } = this.props;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track
            kind="captions"
          />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <input
            onChange={ handleFavorite }
            type="checkbox"
            name="favoriteSong"
            id={ trackId }
            checked={ checkFavorite }
          />
          Favorita
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  checkFavorite: PropTypes.bool.isRequired,
};
