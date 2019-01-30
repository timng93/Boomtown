export const validate = (values, fileSelected, selectedTags) => {
  const errors = {};

  /**
   * @TODO: Write the validation rules for the share form.
   *
   *
   *
   * An item title, description, and at least one tag is required for all items.
   */
  if (!values.title) {
    errors.title = 'Title is missing';
  }
  if (!values.description) {
    errors.description = 'Description is missing';
  }
  if (!selectedTags) {
    errors.selectedTags = 'Required Tags';
  }
  if (!fileSelected) {
    errors.imageurl = 'Required Image';
  }
  //if (values.tags.length === 0) {
  //errors.tags = " Add some tags"
  //}
  console.log(errors);
  return errors;
};
