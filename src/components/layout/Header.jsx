import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1>React Blog</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
