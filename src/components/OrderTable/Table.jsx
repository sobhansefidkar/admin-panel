/** @format */

import { useEffect } from "react";
import "./table.scss";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import CurrencyFormat from "react-currency-format";

function Table() {
  const { filterOrders, setTotal } = useGlobalContext();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  let counter = 1;
  setTotal(data.reduce((a, c) => a + c.amount, 0));

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 30;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
    // name color price qty
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getOrders?${filterOrders}=true`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterOrders]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const getPhone = (id) => {
  //   if (users.length >= 1) {
  //     const find = users.find((item) => item._id == id);
  //     return find.phone;
  //   } else {
  //     return "no data";
  //   }
  // };

  return (
    <>
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
              <th style={{ width: "300px" }}>محصولات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{counter++}</td>
                    <td>{item.transfree}</td>
                    <td className="td">{item.state}</td>
                    <td className="td">{item.city}</td>
                    <td className="td">{item.address}</td>
                    <td className="td">
                      {/* {getPhone(item.userId)} */}
                    </td>
                    <td className='funcs'>
                      {item.status}
                    </td>
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
                            <td className="td">
                              {item.productName}
                            </td>
                            <td className="td">
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  background: `#${item.color}`,
                                  borderRadius: "50%",
                                }}></div>
                            </td>
                            <td className="td">
                              {item.quentity}
                            </td>
                            <td className="td">
                              <CurrencyFormat
                                thousandSeparator={true}
                                value={item.price}
                                displayType='text'></CurrencyFormat>
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
        {currentItems.length == 0 && <h1>سفارشی نداریم!</h1>}
      </div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Table;
