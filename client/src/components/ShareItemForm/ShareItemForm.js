import React, { Component } from 'react';
import {Form, Field} from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SelectTags from './SelectTags';




class ShareForm extends Component {
  onSubmit(o) {
    console.log("Submitting", o)
};

validate(o) {
    console.log("Validating", o);

    const error = {};
    if(!o.name) {
      error.name = "Name is required";
    }
    if (!o.description){

      error.description = "Description is required";
    } 
    return error;
}
  render() {
    return (
      <div>
        <h3>Share. Borrow. Prosper.</h3>
           <Form
           onSubmit= {this.onSubmit}
           validate = {this.validate}
           render = { ({ handleSubmit})  => (
                  <form onSubmit={handleSubmit}>
                          <Button>
                            Select An Image
                          </Button>

                          <Field 
                          name= "name"
                          render = { ({input, meta})      => {
                                  console.log("Insidename", meta);
                                  return(
                                  <div className="field">
                                         {/*<label for="name"> Name: </label>*/}
                                         <TextField inputProps={input} placeholder="Name Your Item"/>
                                         {/*<input type="text" {...input} />*/}
                                         {meta.touched && meta.invalid &&
                                         <div className = "error"
                                             style={{ color: "red", fontSize: "10px"}}>
                                             {meta.error}
                                             </div>
                                        }
                                  </div>
                                  );
                          }}/>
                          <Field 
                          name= "description"
                          render = { ({input, meta})      => {
                                  console.log("Description", meta);
                                  return(
                                  <div className="field">
                                        {/* <label for="email"> Email: </label> */}
                                         <TextField inputProps={input} placeholder="Describe Your Item" multiline rows="3"/>

                                  {/* <input type="text" placeholder="Describe your item" {...input} /> */}
                                         {meta.touched && meta.invalid &&
                                         <div className = "error"
                                             style={{ color: "red", fontSize: "10px"}}>
                                             {meta.error}
                                             </div>
                                        }
                                  </div>
                                  );
                          }}/>
                          <SelectTags />



                          <Button>
                            Share
                          </Button>

                  </form>
           ) }
          />
       
      </div>
    );
  }
}

export default ShareForm;
