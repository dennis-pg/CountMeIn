import React from "react";
import { Link } from "react-router-dom";


const linkStyle = {
  margin: "1rem",
  textDecoration: "None",
  color: 'blue',
  fontFamily: 'Thiccboi',
};

const MailUs = ({ mailto, label }) => {
    return (
        <Link
            to='#'
            style={linkStyle}
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default MailUs;