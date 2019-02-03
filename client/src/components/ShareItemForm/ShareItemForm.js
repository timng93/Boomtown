import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
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
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';

import {
  updateItem,
  resetImage,
  resetItem
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { validate } from './helpers/validation';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }


  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  handleSelectFile = event => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  handleChange = event => {
    this.setState({ selectedTags: event.target.value });
  };

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  render() {
    const { classes, tags, updateItem, resetImage, resetItem } = this.props;
    return (
      <div>
        <Typography>
          <h3 style={{ fontSize: '40px', paddingBottom: '20px' }}>
            {' '}
            Share. Borrow. Prosper.
          </h3>
        </Typography>

        <Mutation mutation={ADD_ITEM_MUTATION}>
          {addItemMutation => {
            return (
              <Form
                onSubmit={async values => {
                  addItemMutation({
                    variables: {
                      item: {
                        ...values,
                        tags: this.state.selectedTags.map(tag => ({
                          id: tag,
                          title: ''
                        }))
                      }
                    }
                  });
                         
                }}

                validate={values => {
                  return validate(
                    values,
                    this.state.fileSelected,
                    this.state.selectedTags
                  );
                }}
                
                render={({ handleSubmit, submitting, pristine, invalid, form}) => (
                  <form onSubmit={event => {

                    handleSubmit(event).then(() => {
                    this.fileInput.current.value = '';
                    this.setState({fileSelected: false});
                    form.reset();
                    resetItem();
                    this.setState({selectedTags: []});
                    })}}>

                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateItem);
                        }
                        return '';
                      }}
                    />

                    {!this.state.fileSelected ? (
                      <Button
                        style={{ padding: '10px 70px' }}
                        className={classes.imageButton}
                        onClick={() => {
                          this.fileInput.current.click();
                        }}
                      >
                        Select An Image
                      </Button>
                    ) : (
                      <Button
                        style={{ padding: '10px 70px' }}
                        className={classes.imageButton}
                        onClick={() => {
                          this.fileInput.current.value = '';
                          this.setState({ fileSelected: false });
                          resetImage();
                        }}
                      >
                        Reset An Image
                      </Button>
                    )}
                    <input
                      hidden
                      type="file"
                      id="file-input"
                      ref={this.fileInput}
                      accept="image/*"
                      onChange={() => {
                        this.handleSelectFile();
                      }}
                    />

                    <Field
                      name="title"
                      render={({ input, meta }) => {
                        return (
                          <div className="field">
                            <TextField
                              style={{ width: '270px', paddingTop: '20px' }}
                              inputProps={input}
                              placeholder="Name Your Item"
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
                    />
                    <Field
                      name="description"
                      render={({ input, meta }) => {
                        return (
                          <div className="field">
                            <TextField
                              style={{ width: '270px', paddingTop: '20px' }}
                              inputProps={input}
                              placeholder="Describe Your Item"
                              multiline
                              rows="3"
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
                            renderValue={selected => {
                              return this.generateTagsText(tags, selected);
                            }}
                            onChange={this.handleChange}
                            value={this.state.selectedTags}
                          >
                            {tags.map(tag => (
                              <MenuItem key={tag.id} value={tag.id}>
                                <Checkbox
                                  checked={
                                    this.state.selectedTags.indexOf(tag.id) > -1
                                  }
                                />
                                <ListItemText>{tag.title}</ListItemText>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <div>
                      <Button
                        style={{
                          marginTop: '20px',
                          backgroundColor: '#f9a825'
                        }}
                        type="submit"
                        /*
                        onClick = {()=> {

                          this.fileInput.current.value = '';
                          this.setState({fileSelected: false});
                          form.reset();
                          resetItem();
                          this.setState({selectedTags: []});

                        }}
                        */
                        disabled={submitting || pristine || invalid}
                      >
                        Share
                      </Button>
                    </div>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
      </div>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
