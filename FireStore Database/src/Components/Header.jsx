import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            <div>
                <Link to="/">
                    AddStu
                </Link>
                <Link to="/StuList">
                    StuList
                </Link>
                <Link to="/AddSir">
                    AddSir
                </Link>
                <Link to="/SirList">
                    SirList
                </Link>
            </div>
        </>
    );
}
export default Header;