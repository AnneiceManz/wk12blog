import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IMAGES from '../images/IMAGES'
import { AuthContext } from "../context/authContext";
import { Image } from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest, faLinkedin  } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <Image
        rounded
        size="medium"
          src={currentUser.profile_pic}
          alt=""
        />
        <p className="sidebarP">
        League chase spirits mizzenmast gangplank hulk handsomely yo-ho-ho snow bilge water. Landlubber or just lubber ye hands dead men tell no tales rutters bilge no prey, no pay hempen halter Gold Road skysail. Keelhaul fore parrel matey hempen halter hail-shot Buccaneer boatswain mizzen yawl.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="catlink" to="/posts?cat=Life">
              Life
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="catlink" to="/posts?cat=Broadway">
              Broadway
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="catlink" to="/posts?cat=Movies">
              Movies
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="catlink" to="/posts?cat=Hamilton">
              Hamilton
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        <FontAwesomeIcon icon={faFacebook} className="sidebarIcon"/>
      <FontAwesomeIcon icon={faInstagram} className="sidebarIcon"/>
      <FontAwesomeIcon icon={faPinterest} className="sidebarIcon"/>
      <FontAwesomeIcon icon={faTwitter} className="sidebarIcon"/>
      <FontAwesomeIcon icon={faLinkedin} className="sidebarIcon"/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
