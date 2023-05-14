import { FaClipboardList, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { Mapping } from "./lists";
import { Add, Get } from "./LocalStorage";
import Filtering from "./filter";

function Form() {
  const [value, setValue] = useState(null);
  window.onload = () => {
    if (Get()) {
      setValue(Get());
    }
  };
  return (
    <>
      <form onSubmit={(e) => HandleSubmit(e, value, setValue)}>
        <input type="text" placeholder="New TODo" id="add" name="title" />
        <FaClipboardList
          className="icon "
          onClick={(event) => {
            if (
              event.target.localName === "path" ||
              event.target.localName === "svg"
            ) {
              document.querySelector("#add").focus();
            }
          }}
        />
        <button type="submit">
          <FaArrowRight className="icon" />
        </button>
      </form>
      <div className="container">
        <Filtering />
        {Mapping(value, setValue)}
      </div>
    </>
  );
}

function HandleSubmit(e, value, setValue) {
  e.preventDefault();

  if (document.querySelector("#add").value === "") {
    return null;
  }

  if (value !== null) {
    value.push({
      id: Date.now(),
      title: document.querySelector("#add").value,
      date:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      status: "Active",
      complete: false,
      msg: null,
    });
    let newValue = [...value]; // why [...value] working  but value
    Add(newValue);
    setValue(newValue);
  } else {
    let newValue = [
      {
        id: Date.now(),
        title: document.querySelector("#add").value,
        date:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        status: "Active",
        complete: false,
        msg: null,
      },
    ];
    Add(newValue);
    setValue(newValue);
  }
}

export default Form;
