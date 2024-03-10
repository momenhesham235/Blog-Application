import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "@/application/stores/auth.stores";
import { CiLogin } from "react-icons/ci";
import { BsPersonPlus } from "react-icons/bs";

const HeaderRight = () => {
  const { user, logoutUser } = useAuthStore();
  const token = JSON.parse(localStorage.getItem("blog-token"));

  // console.log(token);
  // console.log(user);

  const [dropdown, setDropdown] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    // console.log("logout");
    setDropdown(false);
    logoutUser();
  };

  return (
    <div className="header-right">
      {token ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
              style={{ cursor: "pointer", letterSpacing: "1px" }}
            >
              {user?.username}
            </span>
            <img
              src={user?.avatar}
              alt="user photo"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <BsPersonPlus />
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                  <CiLogin />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <CiLogin
              style={{ marginRight: "5px", transform: "translateY(3px)" }}
            />
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <BsPersonPlus
              style={{ marginRight: "5px", transform: "translateY(3px)" }}
            />
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
