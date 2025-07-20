import { useState } from "react";

function DynamicForm() {
  const [formData, setFormData] = useState([{ input: "", select: "" }]);

  const [submittedData, setSubmittedData] = useState(null);

  const [errors, setErrors] = useState([]);

  // input change handler
  const handleInputChange = (value, index) => {
    const newInputData = [...formData];
    newInputData[index].input = value;
    setFormData(newInputData);
  };

  // select change handler
  const handleSelectChange = (value, index) => {
    const newSelectData = [...formData];
    newSelectData[index].select = value;
    setFormData(newSelectData);
  };

  // add new field handler
  const addNewField = (e) => {
    e.preventDefault();
    setFormData([...formData, { input: "", select: "" }]);
  };

  // delete field handler
  const deleteField = (index) => {
    const updateFormData = [...formData];
    updateFormData.splice(index, 1);
    setFormData(updateFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = formData.map((item) => {
      const inputError = item.input === "" ? "Input is required" : "";
      const selectError = item.select === "" ? "Select is required" : "";
      return { input: inputError, select: selectError };
    });

    setErrors(newErrors);

    // check if there is any errors
    const hasErrors = newErrors.some((item) => item.input || item.select);
    if (!hasErrors) {
      setSubmittedData(formData);
    }
  };

  return (
    <>
      <section className="py-10 md:py-20 max-w-3xl px-4 mx-auto">
        {/* form with text input and select options */}
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-base-100 shadow-md rounded-lg"
        >
          {/* dynamicaly render input and select */}
          {formData.map((field, index) => (
            <div
              className="flex items-center gap-3 mb-2 pb-1 border-b border-gray-300"
              key={index}
            >
              {/* text input */}
              <fieldset className="fieldset flex-2">
                <div>
                  <legend className="fieldset-legend">
                    What is your name?
                  </legend>
                  <input
                    className="input w-full"
                    type="text"
                    placeholder="Enter text"
                    value={field.input}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                  />
                  {errors[index]?.input ? (
                    <span className="text-xs text-red-500">
                      {errors[index].input}
                    </span>
                  ) : (
                    <p className="invisible">_</p>
                  )}
                </div>
              </fieldset>

              {/* select with options */}
              <fieldset className="fieldset flex-1">
                <div>
                  <legend className="fieldset-legend">Your role?</legend>
                  <select
                    value={field.select}
                    className="select w-full"
                    onChange={(e) => handleSelectChange(e.target.value, index)}
                  >
                    <option value="" disabled={true}>
                      Select Role
                    </option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                  </select>
                  {errors[index]?.select ? (
                    <span className="text-xs text-red-500">
                      {errors[index].select}
                    </span>
                  ) : (
                    <p className="invisible">_</p>
                  )}
                </div>
              </fieldset>

              {/* delete field button */}
              <button
                title="Delete this input field"
                className="btn btn-error mt-3 text-white"
                onClick={() => deleteField(index)}
              >
                X
              </button>
            </div>
          ))}

          {/* submit and add new field buttons */}
          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn btn-primary flex-3">
              Submit
            </button>
            <button
              title="Add New Field"
              type="submit"
              className="btn btn-secondary text-2xl flex-1"
              onClick={addNewField}
            >
              +
            </button>
          </div>
        </form>

        {/* display form state */}
        <div className="mt-8">
          <h2 className="text-3xl border-b border-gray-400 pb-3 mb-3">
            Form State:
          </h2>
          {formData.map((item, index) => (
            <h3 key={index} className="text-xl pb-2">
              {index + 1}. Input:{" "}
              <span className="bg-primary/10 font-semibold">
                {item.input || "(empty)"}
              </span>{" "}
              | Select:{" "}
              <span className="bg-primary/10 font-semibold">
                {item.select || "(empty)"}
              </span>
            </h3>
          ))}
        </div>

        {/* display submitted form data in table */}
        <h2 className="text-3xl border-b border-gray-400 pb-3 mb-3 mt-8">
          Submitted Form Data:
        </h2>
        {submittedData && (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-md">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Input</th>
                  <th>Selected</th>
                </tr>
              </thead>
              <tbody>
                {/* dynamicaly show submitted data */}
                {submittedData.map((item, idx) => (
                  <tr className="hover:bg-base-300">
                    <th>{idx + 1}</th>
                    <td>{item?.input}</td>
                    <td>{item?.select}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

export default DynamicForm;
