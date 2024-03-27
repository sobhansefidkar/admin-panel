/** @format */

import "./widget.scss";
import Icon from "react-icons-kit";
import { arrowUp } from "react-icons-kit/fa/arrowUp";
import { group } from "react-icons-kit/fa/group";
import { dollar } from "react-icons-kit/fa/dollar";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { Link } from "react-router-dom";

function Widget() {
  const mount = "200,000";

  const data = [
    {
      id: 1,
      title: "کابران",
      isMoney: false,
      link: "دیدن تمام کاربران",
      icon: <Icon style={{ color: "lightgreen" }} size={25} icon={group} />,
    },
    {
      id: 2,
      title: "سفارشات",
      isMoney: false,
      link: "دیدن تمام سفاراشات",
      icon: (
        <Icon
          style={{ color: "paleturquoise" }}
          size={25}
          icon={shoppingCart}
        />
      ),
    },
    {
      id: 3,
      title: "دریافتی",
      isMoney: true,
      link: "جزعیات",
      icon: <Icon style={{ color: "peru" }} size={25} icon={dollar} />,
    },
    {
      id: 4,
      title: "پیشرفت",
      isMoney: false,
      link: "جزعیات",
      icon: <Icon style={{ color: "palevioletred" }} size={25} icon={group} />,
    },
  ];
  return (
    <div className='widget'>
      {data.map((item , i) => {
        return (
          <div className='item-widget' key={i}>
            <div className='title'>
              <span>{item.title}</span>
              <div className='percent positive'>
                <Icon icon={arrowUp} />
                <span>2+</span>%
              </div>
            </div>
            <div className='number-users'>
              {item.isMoney ? `تومان${mount}` : 700}
            </div>
            <div className='observe'>
              <Link to={"/users"}>
                <span>{item.link}</span>
                {item.icon}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Widget;
