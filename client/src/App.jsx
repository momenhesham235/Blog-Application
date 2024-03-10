import "@/presentations/styles/App.css";
import MainRouter from "@/application/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  );
}

export default App;
