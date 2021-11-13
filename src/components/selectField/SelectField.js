import "./selectField.scss";

const SelectField = ({ value = 30, onChange }) => {
  const options = [20, 30, 40, 50];

  return (
    <select name="" id="" onChange={onChange} value={value}>
      {options?.map((item, i) => (
        <option className="dropdown-item" key={i} defaultValue="" value={item}>
          {item} images
        </option>
      ))}
    </select>
  );
};
export default SelectField;
