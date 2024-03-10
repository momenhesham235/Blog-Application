import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@/presentations/styles/form.css";
import useAuthStore from "@/application/stores/auth.stores";
// import swal from "sweetalert";

const Register = () => {
  const { registerUser } = useAuthStore();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = user;
  const navigate = useNavigate();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    registerUser(user);
    navigate("/");
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <button className="form-btn" type="submit">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;

// Momen123@*
