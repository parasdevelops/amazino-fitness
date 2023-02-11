import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.scss";
import Button from "react-bootstrap/Button";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <div className="header">
      <div className="header-title">
        <span className="big">A</span>
        <span className="small">MAZINO</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span className="big">F</span>
        <span className="second-small">ITNESS</span>
      </div>
      <div className="header-right">
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Name ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <Button
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
            variant="primary"
            size="sm"
            active
          >
            Home
          </Button>
        </Link>
        <Link to="/add">
          <Button
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => setActiveTab("AddContact")}
            variant="primary"
            size="sm"
            active
          >
            Add Contact
          </Button>
        </Link>
        <Link to="/about">
          <Button
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
            variant="primary"
            size="sm"
            active
          >
            About
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
