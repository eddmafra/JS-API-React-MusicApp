import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album"> Conteúdo de Album </div>
      </>
    );
  }
}

export default Album;
