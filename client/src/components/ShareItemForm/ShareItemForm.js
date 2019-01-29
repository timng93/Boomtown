import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }

  onSubmit(o) {
    console.log('Submitting', o);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
        <h3 style={{ fontSize: '40px', paddingBottom: '20px' }}>
          {' '}
          Share. Borrow. Prosper.
        </h3>
        <Form
          className={classes.shareForm}
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Button
                style={{ padding: '10px 70px' }}
                className={classes.imageButton}
              >
                Select An Image
              </Button>

              <Field
                name="name"
                render={({ input, meta }) => {
                  console.log('Insidename', meta);
                  return (
                    <div className="field">
                      {/*<label for="name"> Name: </label>*/}
                      <TextField
                        style={{ width: '270px', paddingTop: '20px' }}
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
                        style={{ width: '270px', paddingTop: '20px' }}
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
              <Field
                name="tags"
                render={({ input, meta }) => (
                  <FormControl className={classes.form}>
                    <InputLabel
                      className={classes.multipleSelect}
                      htmlFor="select-multiple-checkbox"
                    >
                      Add some tags
                    </InputLabel>
                    <Select
                      style={{ width: '270px', paddingTop: '20px' }}
                      className={classes.dropdownMenu}
                      multiple
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'tag',
                        id: 'tag'
                      }}
                      value={this.state.checked}
                    >
                      {tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.title}>
                          <Checkbox />
                          <ListItemText>{tag.title}</ListItemText>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <div>
                <Button
                  style={{ marginTop: '20px', backgroundColor: '#f9a825' }}
                >
                  Share
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareItemForm);
