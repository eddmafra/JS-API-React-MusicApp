import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile"> Conteúdo de Profile </div>
      </>
    );
  }
}

export default Profile;
