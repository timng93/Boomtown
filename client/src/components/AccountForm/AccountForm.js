import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Form, Field } from 'react-final-form';
import {Mutation} from 'react-apollo';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import {validate} from './helpers/validation';

import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
    };
  };





  onSubmit = async values => {

      
     if (this.state.formToggle) {
        await this.props.loginMutation({
         variables: {
          user: {
             email: values.email,
              password: values.password
          }
          }
         });
     } else {
      await  this.props.signupMutation({
           variables: {
            user: {
                fullname: values.fullname,
            email: values.email,
             password: values.password
            }
  }})
}
}
  


  render() {
    
    console.log(this.props);
    const { classes, loginMutation, signupMutation} = this.props;

    return (
      // @TODO: Wrap in Final Form <Form />
    
  
      <Form
        onSubmit={this.onSubmit}

        validate = {values => {
          return validate(values, this.state.formToggle)

        }}

        render={({ handleSubmit, pristine, invalid, values, submitting, form}) => (
          <form
            onSubmit={handleSubmit}
            className={classes.accountForm}
          >
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                {/* @TODO: Wrap in a Final Form <Field /> */}
                <Field name="fullname" component="input">
                  {({ input, meta }) => {
                    return (
                      <div className="fullName">
                        <Input
                          id="fullName"
                          type="text"
                          inputProps={{ autoComplete: 'off' }}
                          {...input}
                        />
                        {meta.touched &&
                              meta.invalid && (
                                <div
                                  className="error"
                                  style={{ color: 'red', fontSize: '10px' }}
                                >
                                  {meta.error}
                                </div>
                              )}
                      </div>
                    );
                  }}
                </Field>
                {/* @TODO: Close Final Form <Field /> */}
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              {/* @TODO: Wrap in a Final Form <Field /> */}
              <Field name="email" component="input">
                {({ input, meta }) => {
                  return (
                    <div className="email">
                      <Input
                        id="email"
                        type="text"
                        inputProps={{ autoComplete: 'off' }}
                        {...input}
                      />
                      {meta.touched &&
                              meta.invalid && (
                                <div
                                  className="error"
                                  style={{ color: 'red', fontSize: '10px' }}
                                >
                                  {meta.error}
                                </div>
                              )}
                    </div>
                  );
                }}
              </Field>

              {/* @TODO: Close Final Form <Field /> */}
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              {/* @TODO: Wrap in a Final Form <Field /> */}
              <Field name="password" component="input">
                {({ input, meta }) => {
                  return (
                    <div className="password">
                      <Input
                        id="password"
                        type="password"
                        inputProps={{ autoComplete: 'off' }}
                        {...input}
                      />
                      {meta.touched &&
                              meta.invalid && (
                                <div
                                  className="error"
                                  style={{ color: 'red', fontSize: '10px' }}
                                >
                                  {meta.error}
                                </div>
                              )}
                    </div>
                  );
                }}
              </Field>
              {/* @TODO: Close Final Form <Field /> */}
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={ submitting||pristine||invalid}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                      form.reset();
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
            {loginMutation.error
                ? 'Email Or Password is Incorrect.'
                : ''}
              {signupMutation.error
                ? 'Account with this email already exists.'
                : ''}
            </Typography>
          </form>
        )}
      />

      /*
      )
    }}
    </Mutation>
  </Fragment>
  */
      // @TODO: Close Final Form <Form />
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.

// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);