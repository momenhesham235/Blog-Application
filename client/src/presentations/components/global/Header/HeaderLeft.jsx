import PropTypes from "prop-types";
import { GoPencil } from "react-icons/go";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const HeaderLeft = ({ toggle, setToggle }) => {
  return (
    <div className="header-left">
      <div className="header-logo">
        <strong>BLOG</strong>
        <GoPencil />
      </div>
      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <IoMdClose style={{ fontSize: "30px", color: "white" }} />
        ) : (
          <CiMenuFries style={{ fontSize: "25px", color: "white" }} />
        )}
      </div>
    </div>
  );
};

HeaderLeft.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default HeaderLeft;
