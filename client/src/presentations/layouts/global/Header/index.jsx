import { useState } from "react";
import "@/presentations/styles/header.css";
import HeaderLeft from "@/presentations/components/global/Header/HeaderLeft";
import HeaderRight from "@/presentations/components/global/Header/HeaderRight";
import Navbar from "@/presentations/components/global/Header/Navbar";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <HeaderLeft toggle={toggle} setToggle={setToggle} />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight />
    </header>
  );
};

export default Header;
