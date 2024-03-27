/** @format */

import "./sidebar.scss";
import Icon from "react-icons-kit";
import { close } from "react-icons-kit/fa/close";
import { database } from "react-icons-kit/fa/database";
import { users } from "react-icons-kit/fa/users";
import { productHunt } from "react-icons-kit/fa/productHunt";
import { creditCard } from "react-icons-kit/fa/creditCard";
import { train } from "react-icons-kit/fa/train";
import { bell } from "react-icons-kit/fa/bell";
import { barChart } from "react-icons-kit/fa/barChart";
import { stickyNote } from "react-icons-kit/fa/stickyNote";
import { user } from "react-icons-kit/fa/user";
import { signOut } from "react-icons-kit/fa/signOut";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

function Sidebar() {
  const { openSidebar, setOpenSidebar } = useGlobalContext();
  return (
    <div className={openSidebar ? "sidebar open" : "sidebar"}>
      <div className='top-sidebar'>
        <span onClick={() => setOpenSidebar(false)}>
          <Icon size={25} icon={close}></Icon>
        </span>
      </div>
      <div className='center-sidebar'>
        <ul>
          <p className='title'>لیست ها</p>
          <Link to={"/"} style={{ color: "black" }}>
            <li>
              <Icon style={{ color: "rgb(91, 0, 165)" }} icon={database} />
              <span>داشبورد</span>
            </li>
          </Link>
          <Link to={"/users"} style={{ color: "black" }}>
            <li>
              <Icon style={{ color: "rgb(91, 0, 165)" }} icon={users} />
              <span>کاربران</span>
            </li>
          </Link>
          <Link to={"/products"} style={{ color: "black" }}>
            <li>
              <Icon style={{ color: "rgb(91, 0, 165)" }} icon={productHunt} />
              <span>محصولات</span>
            </li>
          </Link>
          <Link to={"/orders"} style={{ color: "black" }}>
            <li>
              <Icon style={{ color: "rgb(91, 0, 165)" }} icon={creditCard} />
              <span>سفارشات</span>
            </li>
          </Link>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={train} />
            <span>تحویل</span>
          </li>
          <p className='title'>لاگ ها</p>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={barChart} />
            <span>وضعیت</span>
          </li>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={bell} />
            <span>اعلان ها</span>
          </li>
          <p className='title'>خدمات</p>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={stickyNote} />
            <span>گزارشات</span>
          </li>
          <p className='title'>کاربر</p>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={user} />
            <span>پروفایل</span>
          </li>
          <li>
            <Icon style={{ color: "rgb(91, 0, 165)" }} icon={signOut} />
            <span>خروج</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
