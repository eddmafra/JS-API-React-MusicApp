import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUser: '',
      loading: false,
      validateBtn: false,
    };
  }

  validateText = () => {
    const { loginUser } = this.state;
    const textSizeMin = 3;
    if (loginUser.length < textSizeMin) {
      this.setState({ validateBtn: false });
    } else {
      this.setState({ validateBtn: true });
    }
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ loginUser: value }, this.validateText);
  };

  submitBtn = async () => {
    const { history } = this.props;
    const { loginUser } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginUser });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { loading, validateBtn } = this.state;
    return (
      <div data-testid="page-login">
        { loading
          ? <p>Carregando...</p>
          : (
            <form>

              <label htmlFor="username">
                <input
                  data-testid="login-name-input"
                  type="text"
                  placeholder="Nome"
                  id="username"
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                id="submitBtn"
                disabled={ !validateBtn }
                onClick={ this.submitBtn }
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: propTypes.shape().isRequired,
};
