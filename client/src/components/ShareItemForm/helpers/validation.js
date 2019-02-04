export const validate = (values, fileSelected, selectedTags) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is missing';
  }
  if (!values.description) {
    errors.description = 'Description is missing';
  }
  if (selectedTags.length < 1) {
    errors.selectedTags = 'Required Tags';
  }
  if (!fileSelected) {
    errors.imageurl = 'Required Image';
  }
  return errors;
};
