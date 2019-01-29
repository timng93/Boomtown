import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SelectTags from './SelectTags';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class ShareItemForm extends Component {
  onSubmit(o) {
    console.log('Submitting', o);
  }

  validate(o) {
    console.log('Validating', o);

    const error = {};
    if (!o.name) {
      error.name = 'Name is required';
    }
    if (!o.description) {
      error.description = 'Description is required';
    }
    return error;
  }
  render() {
    const { classes, tags } = this.props;
    return (
      <div>
        <h3 style={{ fontSize: '40px', paddingBottom: '20px' }}> Share. Borrow. Prosper.</h3>
        <Form className={classes.shareForm}
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Button style={{ padding: '10px 70px'}}className={classes.imageButton}>Select An Image</Button>

              <Field
                name="name"
                render={({ input, meta }) => {
                  console.log('Insidename', meta);
                  return (
                    <div className="field">
                      {/*<label for="name"> Name: </label>*/}
                      <TextField
                        inputProps={input}
                        placeholder="Name Your Item"
                      />
                      {/*<input type="text" {...input} />*/}
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
              />
              <Field
                name="description"
                render={({ input, meta }) => {
                  console.log('Description', meta);
                  return (
                    <div className="field">
                      {/* <label for="email"> Email: </label> */}
                      <TextField
                        inputProps={input}
                        placeholder="Describe Your Item"
                        multiline
                        rows="3"
                      />

                      {/* <input type="text" placeholder="Describe your item" {...input} /> */}
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
              />
              <SelectTags />

              <Button>Share</Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ShareItemForm);
