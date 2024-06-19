import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookView from "./components/bookView/BookView";
import { useState, useEffect } from "react";

function App() {
  const [fontColor, setFontColor] = useState("black");
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    let storedFontColor = localStorage.getItem("font-color");
    if (storedFontColor) {
      setFontColor(storedFontColor);
    }

    let storedBgColor = localStorage.getItem("bg-color");
    if (storedBgColor) {
      setBgColor(storedBgColor);
    }
  }, []);

  const handleColorSetting = (setting, color) => {
    if (setting == "font-color") {
      setFontColor(color);
      localStorage.setItem("font-color", color);
    }

    if (setting == "bg-color") {
      setBgColor(color);
      localStorage.setItem("bg-color", color);
    }
  };

  return (
    <>
      <div
        className="app"
        style={{ color: fontColor, backgroundColor: bgColor }}
      >
        <header>
          <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
            Doctoral Book List
          </h2>
          <div className="color-row">
            <div>
              Font Color:{" "}
              <input
                type="color"
                className="color-input"
                value={fontColor}
                onChange={(e) =>
                  handleColorSetting("font-color", e.target.value)
                }
              />
            </div>
            <div>
              BG Color:{" "}
              <input
                type="color"
                className="color-input"
                value={bgColor}
                onChange={(e) => handleColorSetting("bg-color", e.target.value)}
              />
            </div>
          </div>
        </header>
        <BookForm borderColor={fontColor} />
        <BookView />
      </div>
    </>
  );
}

export default App;
