export default function validate(values) {
  const errors = {};

  /**
   * @TODO: Write the validation rules for the share form.
   * 
   * 
   *
   * An item title, description, and at least one tag is required for all items.
   */
  if (
  values.title != '' && 
  values.description !=='' &&
  values.fileSelected == !false && 
  values.tag >= 1
  } {
    
  }

  return errors;
}
