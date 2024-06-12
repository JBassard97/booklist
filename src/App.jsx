import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookView from "./components/bookView/BookView";
import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <div>
        <header>
          <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
            Doctoral Book List
          </h2>
          <div>
            Font Color: <input type="color" class="color-input" />
          </div>
        </header>
        <BookForm />
        <BookView />
      </div>
    </>
  );
}

export default App;
