import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <br />
      <div>Twitter</div>
      <br />
      <Link to="/">Home</Link> /// <Link to="/profile">Profile</Link>
      <br />
    </header>
  );
};