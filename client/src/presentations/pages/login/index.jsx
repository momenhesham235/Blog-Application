import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "@/application/stores/auth.stores";
import "@/presentations/styles/form.css";

const Login = () => {
  const { loginUser } = useAuthStore();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const navigate = useNavigate();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    loginUser(user);
    navigate("/");
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <section className="form-container">
      <h1 className="form-title">Login to your account</h1>
      <form onSubmit={formSubmitHandler} className="form">
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
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password ?
        <Link to="/forgot-password">Frogot Password</Link>
      </div>
    </section>
  );
};

export default Login;
