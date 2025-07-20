import { useState } from "react";

function DynamicForm() {
  const [formData, setFormData] = useState([
    { input: "", select: "" },
    { input: "", select: "" },
  ]);

  const [submittedData, setSubmittedData] = useState(null);

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", e.target);
  };

  return (
    <>
      <section className="pt-10 md:pt-20 max-w-3xl px-4 mx-auto">
        {/* form with text input and select options */}
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-base-100 shadow-xl rounded-xl"
        >
          {formData.map((field, index) => (
            <div
              className="flex gap-3 mb-3 pb-3 border-b border-gray-300"
              key={index}
            >
              <fieldset className="fieldset flex-3">
                <div>
                  <legend className="fieldset-legend">
                    What is your name?
                  </legend>
                  <input
                    className="input w-full"
                    type="text"
                    placeholder="Enter text"
                    value={field.input}
                  />
                </div>
              </fieldset>

              <fieldset className="fieldset flex-1">
                <div>
                  <legend className="fieldset-legend">Your role?</legend>
                  <select
                    defaultValue="Pick a browser"
                    className="select w-full"
                  >
                    <option disabled={true}>Select</option>
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Fullstack Developer</option>
                    <option>Junior Developer</option>
                    <option>Senior Developer</option>
                  </select>
                </div>
              </fieldset>
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn btn-primary flex-3">
              Submit
            </button>
            <button
              title="Add Field"
              type="submit"
              className="btn btn-secondary text-2xl flex-1"
            >
              +
            </button>
          </div>
        </form>

        {/* Display form state */}
        <div className="mt-5">
          <h2 className="text-3xl border-b border-gray-400 pb-3 mb-3">
            Form State:
          </h2>
          {formData.map((item, index) => (
            <h3 key={index} className="text-xl pb-2">
              {index + 1}. Input: {item.input || "(empty)"} | Select:{" "}
              {item.select || "(empty)"}
            </h3>
          ))}
        </div>
      </section>
    </>
  );
}

export default DynamicForm;
