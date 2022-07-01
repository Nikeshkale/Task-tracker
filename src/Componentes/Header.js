import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  // const onClick = () => {
  //   console.log("Click")
  // }

  const location = useLocation();
  return (
    <>
      <header className="header">
        <h1> {title} </h1>
        {
          (location.pathname = "/" && (
            <Button
              color={!showAdd ? "#27B72D" : "#E10C0C"}
              text={!showAdd ? "Add" : "Close"}
              onClick={onAdd}
            />
          ))
        }
      </header>
    </>
  );
};

//****CSS IN JS ****/
// const headingStyling = {
//     color: "red" ,
//     backgroundColor: "black",
// }

Header.defaultProps = {
  title: "Today's Task",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
