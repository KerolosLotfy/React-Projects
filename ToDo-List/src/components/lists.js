import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { Update } from "./LocalStorage";
import sound from "../static/ding-36029.mp3";
import "../css/lists.css";
function Mapping(value, setValue) {
  if (value !== null) {
    let arr = value.map((obj, i) => {
      return (
        <li
          key={obj.id}
          id={"item" + obj.id}
          className={obj.complete ? "completed" : ""}
          status={obj.status}
        >
          <p spellCheck="true">{obj.title}</p>
          <div className="cont">
            <div className="icons">
              <FaCheckCircle
                className="check"
                onClick={() => Check(obj.id, value, setValue)}
              />
              <FaEdit
                className="edit"
                onClick={() => Edit(obj.id, value, setValue)}
              />
              <FaTrash
                className="del"
                onClick={() => Delete(obj.id, value, setValue)}
              />
            </div>
            <p id="date">{obj.date}</p>
          </div>
          <div id="msg">
            {obj.msg !== null ? obj.msg : console.log(obj.msg)}
          </div>
        </li>
      );
    });
    return <ul className="list">{arr}</ul>;
  } else {
    return <h1>No List</h1>;
  }
}

function Check(id, value, setValue) {
  let item = document.querySelector(`#item${id}`);
  let newObj = value.filter((obj) => {
    if (obj.id === id) {
      return obj;
    } else {
      return false;
    }
  });

  if (newObj[0].complete) {
    newObj[0].complete = false;
    newObj[0].status = "Active";
    item.classList.remove("completed");
  } else {
    item.classList.add("completed");
    newObj[0].complete = true;
    newObj[0].status = "Completed";
    newObj[0].msg = diffDate(id);
    // Play Sound Effect
    new Audio(sound).play();
  }
  // Update list in Local Storage
  newObj = [...value];
  Update(newObj);
  setValue(newObj);
}

function Edit(id, value, setValue) {
  let item = document.querySelector(`#item${id} > p`);

  let newObj = value.filter((obj) => {
    if (obj.id === id) {
      return obj;
    } else {
      return false;
    }
  });

  if (newObj[0].status === "Active") {
    if (item.getAttribute("contenteditable") !== "true") {
      item.setAttribute("contenteditable", true);
      item.focus();
    } else {
      // Save Update
      item.setAttribute("contenteditable", false);
      let header = Matching(item.innerHTML);
      console.log(header);
      newObj[0].title = item.innerHTML;
      newObj = [...value];
      // Update list in Local Storage
      Update(newObj);
      // Update Value
      setValue(newObj);
    }
  } else {
    item.setAttribute("contenteditable", "false");
  }
}

function Delete(id, value, setValue) {
  let newObj = value.filter((obj) => {
    if (obj.id !== id) {
      return obj;
    } else {
      return false;
    }
  });
  newObj = [...value];
  // Update list in Local Storage
  Update(newObj);
  setValue(newObj);
}

function Matching(str) {
  const regex = /#[a-zA-z\s]/gm;
  const matches = str.match(regex);
  return matches ? matches.map((match) => match.slice(1, -1)) : [];
}

function diffDate(idDate) {
  let createdTask = new Date(idDate).getTime();
  let completeTask = Date.now();
  let diff = completeTask - createdTask;
  let days = diff / (1000 * 60 * 60 * 24);
  let hrs = (diff / (1000 * 60 * 60)).toFixed(2);
  if (days <= 1) {
    return `You have completed this task after ${
      hrs <= 1 ? parseInt(hrs * 60) + " Mins" : parseInt(hrs) + " Hrs"
    } `;
  } else {
    return `You have completed this task after ${parseInt(days)} days and ${
      hrs <= 1 ? parseInt(hrs * 60) + " Mins" : parseInt(hrs) + " Hrs"
    } `;
  }
}

export { Mapping };
