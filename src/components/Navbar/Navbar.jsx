/** @format */

import "./navbar.scss";
import Icon from "react-icons-kit";
import { moonO } from "react-icons-kit/fa/moonO";
import { sunO } from "react-icons-kit/fa/sunO";
import { bell } from "react-icons-kit/fa/bell";
import { reorder } from "react-icons-kit/fa/reorder";
import { androidTextsms } from "react-icons-kit/ionicons/androidTextsms";
import { useGlobalContext } from "../../context";

function Navbar() {
    const {setOpenSidebar} = useGlobalContext()
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='menu'>
          <div onClick={() => setOpenSidebar(true)} className='item'>
            <Icon size={20} icon={reorder} />
          </div>
        </div>
        <div className='items'>
          <div className='item'>
            <img src='../../images/sobhan.jpg' alt='' className='avatar' />
          </div>
          <div className='item'>
            <Icon size={20} icon={moonO} />
          </div>
          <div className='item'>
            <Icon size={20} icon={bell} />
            <span className='counter'>5</span>
          </div>
          <div className='item'>
            <Icon size={20} icon={androidTextsms} />
            <span className='counter'>2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
