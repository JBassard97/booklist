import "./bookForm.css";
import { useState, useEffect } from "react";
import { todaysDate } from "../../utils/todaysDate";

export default function BookForm({ borderColor }) {
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    editOrTrans: "",
    publisher: "",
    year: "",
    edition: "",
    type: "",
    hasRead: false,
    list: "",
    dateRead: "",
  });

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormState = {
      ...formState,
      dateRead: formState.hasRead ? todaysDate() : formState.dateRead,
    };
    const booksJSON = localStorage.getItem("books");
    const books = booksJSON ? JSON.parse(booksJSON) : [];
    books.push(newFormState);
    localStorage.setItem("books", JSON.stringify(books));
    setFormState({
      title: "",
      author: "",
      editOrTrans: "",
      publisher: "",
      year: "",
      edition: "",
      type: "",
      hasRead: false,
      list: "",
      dateRead: "",
    });
    window.location.reload();
  };

  return (
    <>
      <form className="book-form" onSubmit={handleSubmit}>
        <h3>Book Form</h3>
        <div className="eight-inputs">
          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formState.author}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />

            <label htmlFor="editOrTrans">Editor/Translator:</label>
            <input
              type="text"
              id="editOrTrans"
              name="editOrTrans"
              value={formState.editOrTrans}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />

            <label htmlFor="publisher">Publisher:</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formState.publisher}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              name="year"
              value={formState.year}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />

            <label htmlFor="edition">Edition:</label>
            <input
              type="text"
              id="edition"
              name="edition"
              value={formState.edition}
              style={{ border: `2px solid ${borderColor}` }}
              onChange={handleChange}
            />

            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={formState.type}
              onChange={handleChange}
              style={{ border: `2px solid ${borderColor}` }}
            >
              <option value="">Select Type</option>
              <option value="Anthology/Collection">Anthology/Collection</option>
              <option value="Personal Narrative/Autobiography">
                Personal Narrative/Autobiography
              </option>
              <option value="Historical Secondary">Historical Secondary</option>
              <option value="Literary Criticism">Literary Criticism</option>
              <option value="Poetry">Poetry</option>
              <option value="Prose/Novel">Prose/Novel</option>
              <option value="Primary Source">Primary Source</option>
            </select>

            <label htmlFor="list">List:</label>
            <select
              value={formState.list}
              onChange={handleChange}
              id="list"
              name="list"
              style={{ border: `2px solid ${borderColor}` }}
            >
              <option value="">Select List</option>
              <option value="Field 1">Field 1</option>
              <option value="Field 2">Field 2</option>
              <option value="Focus">Focus</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="hasRead">Already Read?</label>
          <input
            type="checkbox"
            id="hasRead"
            name="hasRead"
            checked={formState.hasRead}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
