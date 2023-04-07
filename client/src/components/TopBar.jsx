import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest, faLinkedin  } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import IMAGES from "../images/IMAGES";
import { AuthContext } from "../context/authContext";

const TopBar = (props) => {
  const { currentUser, logout } = useContext(AuthContext)
  return (
    <>
    <div className="top">
      <div className="topLeft">
      <FontAwesomeIcon icon={faFacebook} className="icon"/>
      <FontAwesomeIcon icon={faInstagram} className="icon"/>
      <FontAwesomeIcon icon={faPinterest} className="icon"/>
      <FontAwesomeIcon icon={faTwitter} className="icon"/>
      <FontAwesomeIcon icon={faLinkedin} className="icon"/>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/newpost">
              NEW POST
            </Link>
          </li>
          {currentUser && <li className="topListItem" onClick={logout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {currentUser ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={IMAGES.anneiceavatar}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      </div>
    </div>
      <div id="detail" >
        <Outlet />
      </div>
    </>
  );
};

export default TopBar;
