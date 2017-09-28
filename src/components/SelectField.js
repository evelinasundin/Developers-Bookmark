import React from "react";

/* Stateless component, only state in App.js. the event handling
 * is just passed down but is being performed in App.js, same as
 * the selected value */
function SelectField(props) {
  return (
    <select onChange={props.onChange} value={props.value} className="form-control">
      <option value=""> All </option>
      <option value="Websites"> Beautiful websites </option>
      <option value="Javascript"> Javascript </option>
      <option value="Typography"> Typography </option>
      <option value="HTML"> HTML </option>
      <option value="Grapicdesign"> Graphic Design </option>
      <option value="Photoshop"> Photoshop </option>
      <option value="Illustrator"> Illustrator </option>
      <option value="Indesign"> Indesign </option>
      <option value="Premierepro"> Premiere Pro </option>
      <option value="API"> API </option>
    </select>
  );
}
export default SelectField;