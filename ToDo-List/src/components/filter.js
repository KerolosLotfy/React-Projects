import { FaFilter } from "react-icons/fa";

export default function Filtering() {
  return (
    <div className="filter">
      <p onClick={Filter}>
        <FaFilter />
        <div className="content">All</div>
      </p>
      <ul className="select">
        <li onClick={Select} value="All">
          All
        </li>
        <li onClick={Select} value="Completed">
          Completed
        </li>
        <li onClick={Select} value="Active">
          Active
        </li>
      </ul>
    </div>
  );
}

function Filter(e) {
  let select = document.querySelector(".filter > .select");
  e.target.classList.toggle("active");
  select.classList.toggle("active");
}

function Select(e) {
  let filter = document.querySelector(".filter > p > .content");
  filter.innerText = e.target.attributes.value.value;
  Show(filter.innerText);
}

function Show(filterValue) {
  let lists = document.querySelectorAll(".container > ul > li");
  lists.forEach((item) => {
    if (filterValue !== "All") {
      if (item.getAttribute("status") === filterValue) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    } else {
      item.style.display = "flex";
    }
  });
}
