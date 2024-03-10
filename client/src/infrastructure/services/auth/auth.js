import axios from "axios";

const registerUser = async (userData) => {
  const { username, email, password, role } = userData;

  // console.log(import.meta.env.VITE_API_BASE_URL);
  const {
    data: { data },
  } = await axios.post(
    "http://localhost:3000/api/v1/auth/register",
    {
      username,
      email,
      password,
      role,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!data) {
    throw new Error("Something went wrong");
  } else {
    console.log(data);
    console.log(data.user);
    console.log(data.user.token);
    localStorage.setItem("blog-token", JSON.stringify(data.user.token));
    return data.user;
  }
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  const {
    data: { data },
  } = await axios.post(
    "http://localhost:3000/api/v1/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!data) {
    throw new Error("Something went wrong");
  } else {
    // console.log(data);
    // console.log(data.user);
    // console.log(data.user.token);
    localStorage.setItem("blog-token", JSON.stringify(data.user.token));
    localStorage.setItem("blog-user", JSON.stringify(data.user));
    return data.user;
  }
};

const logoutUser = async () => {
  await localStorage.removeItem("blog-token");
};

export { registerUser, loginUser, logoutUser };
