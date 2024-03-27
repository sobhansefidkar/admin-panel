/** @format */

import axios from "axios";
import "./userdetail.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);
  console.log(orders)
  // let productId
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getUser/${id}`)
      .then((res) => {
        const user = res.data;
        setData(user);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getOrder/${id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // نام محصول	رنگ	تعداد	قیمت
  return (
    <div className='userdetail'>
      <h1>اطلاعات کاربر</h1>
      <div className='container'>
        <div className='right'>
          <div className='user'>
            <div className='userimage'>
              <img src='../../images/sobhan.jpg' alt='' />
            </div>
            <div className='userinfo'>
              <div className='item'>
                <span>اسم : </span>
                <span>{data.username}</span>
              </div>
              <div className='item'>
                <span>شماره موبایل : </span>
                <span>{data.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='left'>
          <h3>سفارشات کاربر</h3>
          <div className='table'>
            <table>
              <thead>
                <tr>
                  <th className='row'>ردیف</th>
                  <th>تحویل گیرنده</th>
                  <th>استان</th>
                  <th>شهر</th>
                  <th>آدرس</th>
                  <th>شماره موبایل</th>
                  <th>وضعیت</th>
                  <th>محصولات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{item.transfree}</td>
                      <td style={{ fontSize: "12px" }}>{item.state}</td>
                      <td style={{ fontSize: "12px" }}>{item.city}</td>
                      <td style={{ fontSize: "12px" }}>{item.address}</td>
                      <td>{data.phone}</td>
                      <td className='funcs'>{item.status}</td>
                      <td>
                        <tr>
                          <th>نام محصول</th>
                          <th>رنگ</th>
                          <th>تعداد</th>
                          <th>قیمت</th>
                        </tr>
                        {item.products.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.productName} </td>
                              <td>{item.quentity}</td>
                              <td>
                                <div
                                  style={{ background: `#${item.color}` , width : "20px" , height : "20px" }}>
                                </div>
                              </td>
                              <td>
                                {item.price}
                              </td>
                            </tr>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {
              orders.length == 0 &&
              <h2 className="noorder">کاربر محصولی سفارش نداده</h2>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
