import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest, faLinkedin  } from '@fortawesome/free-brands-svg-icons'
import IMAGES from "../images/IMAGES";

const TopBar = () => {
  const user = true;
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
            <Link className="link" to="/home">
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
          {user && <li className="topListItem">LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
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
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
      <div id="detail" >
        <Outlet />
      </div>
    </>
  );
};

export default TopBar;
