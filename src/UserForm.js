import { withFormik, Field, FieldArray } from "formik";
import { useEffect } from "react";
import isEqual from "lodash/isEqual";

const UserForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    dirty,
    initialValues,
    updateValues,
    index
  } = props;
  console.log("props: ", props);
  useEffect(() => {
    if (!isEqual(values, initialValues)) {
      console.log("form has changed");
      updateValues(values);
    }
  }, [values]);
  return (
    <form>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name.first}
        name="name.first"
      />
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name.last}
        name="name.last"
      />
      <FieldArray
        name="friends"
        render={(arrayHelpers) => (
          <div>
            {values.friends && values.friends.length > 0 ? (
              values.friends.map((friend, index) => (
                <div key={index}>
                  <Field name={`friends.${index}.first`} />
                  <Field name={`friends.${index}.last`} />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                {/* show this when user has removed all friends from the list */}
                Add a friend
              </button>
            )}
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default withFormik({
  displayName: "BasicForm",
  mapPropsToValues: (props) => props.item,
  enableReinitialize: true
})(UserForm);
