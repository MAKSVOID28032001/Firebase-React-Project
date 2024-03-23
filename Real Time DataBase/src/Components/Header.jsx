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
            </div>
        </>
    );
}
export default Header;