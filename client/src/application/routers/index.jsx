import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Header,
  Home,
  Login,
  Register,
  Blog,
  NotFound,
} from "@/application/routers/lazyLoading";
import PrivateRoutes from "@/application/routers/PrivateRoutes";
import { Suspense } from "react";

const MainRouter = () => {
  const user = JSON.parse(localStorage.getItem("blog-token"));

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/blog" element={<Blog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default MainRouter;
