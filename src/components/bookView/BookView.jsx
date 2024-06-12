import { useState, useEffect } from "react";
import "./bookView.css";
import StatView from "../statView/StatView";
import { todaysDate } from "../../utils/todaysDate";

export default function BookView() {
  const [bookList, setBookList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    const books = localStorage.getItem("books");
    if (books) {
      setBookList(JSON.parse(books));
    }
  }, []);

  useEffect(() => {
    if (bookList.length > 0) {
      console.log(bookList);
    }
  }, [bookList]);

  const handleDelete = (index) => {
    const updatedBookList = bookList.filter((_, i) => i !== index);
    setBookList(updatedBookList);
    localStorage.setItem("books", JSON.stringify(updatedBookList));
    // Optionally reload the page
    window.location.reload();
  };

  const toggleReadStatus = (index) => {
    const updatedBookList = bookList.map((book, i) => {
      if (i === index) {
        return {
          ...book,
          hasRead: !book.hasRead,
          dateRead: !book.hasRead ? todaysDate() : "",
        };
      }
      return book;
    });
    setBookList(updatedBookList);
    localStorage.setItem("books", JSON.stringify(updatedBookList));
  };

  const handleClick = (index, field, currentValue) => {
    setEditIndex(index);
    setEditField(field);
    setEditedValue(currentValue);
  };

  const handleBlur = () => {
    if (editIndex !== null && editField !== null) {
      const updatedBookList = bookList.map((book, i) => {
        if (i === editIndex) {
          return {
            ...book,
            [editField]: editedValue,
          };
        }
        return book;
      });
      setBookList(updatedBookList);
      localStorage.setItem("books", JSON.stringify(updatedBookList));
      setEditIndex(null);
      setEditField(null);
    }
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <>
      <div className="bookview-full">
        {bookList.length > 0 ? (
          <>
            <StatView bookCount={bookList.length} />
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Editor</th>
                  <th>Publisher</th>
                  <th>Year</th>
                  <th>Edition</th>
                  <th>Type</th>
                  <th>List</th>
                  <th>Read?</th>
                  <th>Date Read</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, index) => (
                  <tr key={index}>
                    {[
                      "title",
                      "author",
                      "editOrTrans",
                      "publisher",
                      "year",
                      "edition",
                      "type",
                      "list",
                    ].map((field) => (
                      <td
                        key={field}
                        onClick={() => handleClick(index, field, book[field])}
                      >
                        {editIndex === index && editField === field ? (
                          <input
                            type="text"
                            value={editedValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                          />
                        ) : (
                          book[field]
                        )}
                      </td>
                    ))}
                    <td
                      onClick={() => toggleReadStatus(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {book.hasRead ? "✅" : "❌"}
                    </td>
                    <td>{book.dateRead}</td>
                    <td>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Add books to view table</p>
        )}
      </div>
    </>
  );
}
