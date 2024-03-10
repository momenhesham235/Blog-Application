import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "@/application/stores/auth.stores";
import {
  BsHouse,
  BsStickies,
  BsJournalPlus,
  BsPersonFillCheck,
} from "react-icons/bs";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useAuthStore();

  const token = JSON.parse(localStorage.getItem("blog-token"));

  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <BsHouse /> Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          <BsStickies /> Posts
        </Link>
        {token && (
          <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <BsJournalPlus /> Create
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <BsPersonFillCheck /> Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default Navbar;
