import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaHeart, FaUserCircle } from 'react-icons/fa';
import { getUser } from '../services/userAPI';

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
        <nav>
          <NavLink data-testid="link-to-search" to="/search">
            <FaSearch />
            Busca
          </NavLink>
          <NavLink data-testid="link-to-favorites" to="/favorites">
            <FaHeart />
            Favoritos
          </NavLink>
          <NavLink data-testid="link-to-profile" to="/profile">
            <FaUserCircle />
            Perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
