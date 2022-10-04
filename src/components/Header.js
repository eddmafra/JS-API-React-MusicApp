import React from 'react';
import { getUser } from '../services/userAPI';
// import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.findUser();
  }

  findUser = async () => {
    const username = await getUser();
    this.setState({
      user: username,
    }, () => this.setState({
      loading: false,
    }));
  };

  render() {
    const { loading, user: { name } } = this.state;
    return (
      <header data-testid="header-component">
        Isso é um header
        {(loading && <p>Carregando...</p>)}
        {{ name } && <h4 data-testid="header-user-name">{name}</h4>}
      </header>
    );
  }
}

export default Header;
