import { useTheme } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";


const linkStyle = (theme) => {
  return{
    margin: "1rem",
    textDecoration: "underline",
    color: theme.palette.primary.main,
    fontFamily: 'Thiccboi',
  };  
};

const MailUs = ({ mailto, label }) => {
    const theme = useTheme();
    
    return (
        <Link
            to='#'
            style={linkStyle(theme)}
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