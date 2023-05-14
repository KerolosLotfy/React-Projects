import logo from "../logo.svg";
export default function MainHeader() {
  return (
    <h1>
      <div className="react-logo">
        <img src={logo} alt="React Logo" />
      </div>
      <span>ToDo List</span>
    </h1>
  );
}
