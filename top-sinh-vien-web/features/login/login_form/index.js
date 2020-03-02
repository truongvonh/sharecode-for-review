// @flow
import React from 'react';
import FormInput from 'features/login/login_form/components/form_input';
import ClipLoader from 'react-spinners/ClipLoader';
import { REGEX } from 'constants/common';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import Router from 'next/router';

import i18n from 'i18n';

type Props = {};

class LoginForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.listInputs = [];
    this.formInputs = [
      {
        type: 'text',
        field: 'username',
        placeholder: i18n.t('login_form.email'),
        icon: 'email',
        validator: username => {
          const isValidEmail = new RegExp(REGEX.IS_EMAIL).test(username);

          return {
            error: !isValidEmail,
            errorMessage: i18n.t('auth_validator.email_invalid')
          };
        }
      },
      {
        type: 'password',
        field: 'password',
        placeholder: i18n.t('login_form.password'),
        icon: 'lock',
        validator: password => {
          const isValidPassword = new RegExp(REGEX.PASSWORD_VALIDATION).test(password);

          return {
            error: !isValidPassword,
            errorMessage: i18n.t('auth_validator.password_invalid')
          };
        }
      }
    ];

    this.payload = {};
    this.state = {
      isSubmitting: false
    };
  }

  static defaultProps: Props = {};

  /**
   * Component life cycle
   **/
  componentDidMount() {}

  /**
   * Handler
   **/

  handleChangeText = payload => {
    console.log('TCL: LoginForm -> componentDidMount -> payload', payload);
    this.payload = {
      ...this.payload,
      ...payload
    };
  };

  handleNotify({ icon = 'add_alert', type = 'danger', message = '' }) {
    window.$.notify(
      {
        icon,
        message
      },
      {
        type,
        timer: 3000,
        allow_dismiss: true,
        allow_duplicates: false
      }
    );
  }

  handleSubmitForm = async e => {
    e.preventDefault();

    // Re-Validate form

    let checkValid = true;

    this.listInputs.forEach(input => {
      if (!input.isValid()) {
        checkValid = false;
      }
    });

    if (!checkValid) return null;

    this.setState({
      isSubmitting: true
    });

    try {
      const response = await AUTH_ENDPOINT.LOGIN(this.payload);
      this.handleNotify({
        type: 'success',
        message: i18n.t('auth.login_success')
      });
      window.location.href = '/';
    } catch (e) {
      this.handleNotify({ type: 'danger', message: i18n.t(`error.${e}`) });
    }
    this.setState({
      isSubmitting: false
    });
  };

  /**
   * Renderer
   **/
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmitForm}>
        <div className="card card-login">
          <div className="card-header card-header-rose text-center">
            <h4 className="card-title">{i18n.t('auth.login')}</h4>
          </div>
          <div className="card-body">
            {this.formInputs.map((input, index) => (
              <FormInput
                onChangeText={this.handleChangeText}
                validator={input.validator}
                ref={ref => (this.listInputs[index] = ref)}
                key={`FORM_INPUT_${index}`}
                {...input}
              />
            ))}
          </div>
          <div className="card-footer justify-content-center">
            <button disabled={this.state.isSubmitting} type="submit" className="btn btn-rose btn-simple btn-wd btn-lg">
              {this.state.isSubmitting ? (
                <ClipLoader sizeUnit={'px'} size={20} color={'#e91e63'} loading={true} />
              ) : (
                <span>{i18n.t('auth.login').toUpperCase()}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
