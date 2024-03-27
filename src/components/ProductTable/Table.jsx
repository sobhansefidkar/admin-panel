/** @format */

import { useEffect } from "react";
import "./table.scss";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Table() {
  const { searchProduct , filtering} = useGlobalContext();
  const [data, setData] = useState([]);
  let counter = 1;

  useEffect(() => {
    if (searchProduct == "") {
      axios
        .get(`http://localhost:3000/api/getProducts?${filtering}=true`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const find = data.filter((item) => item.title.includes(searchProduct));
      setData(find);
    }
  }, [searchProduct , filtering]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/deleteProduct/${id}`)
      .then(
        Swal.fire({
          title: "موفق",
          text: "محصول حذف شد",
          icon: "success",
          timer: 3000,
          confirmButtonText: "باشه",
        })
      )
      .catch((err) => {
        Swal.fire({
          title: "خطا",
          text: "مشکلی در حذف محصول به وجود آمده",
          icon: "error",
          timer: 3000,
          confirmButtonText: "باشه",
        });
      });
  };
  return (
    <>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th className='row'>ردیف</th>
              <th className='profile'>عکس محصول</th>
              <th>نام محصول</th>
              <th className='instock'>انبار</th>
              <th>قیمت</th>
              <th>تخفیف</th>
              <th>رنگ ها</th>
              <th>عملگرها</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{counter++}</td>
                  <td className='prof'>
                    <img className='sobhan' src={item.img[0]} alt='' />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.instock ? "موجود" : "ناموجود"}</td>
                  <td>
                    {item.discount
                      ? item.price - (item.price * item.discountPercent) / 100
                      : item.price}
                  </td>
                  <td>
                    {item.discount ? `دارد(${item.discountPercent}%)` : "ندارد"}
                  </td>
                  <td style={{ display: "flex" , justifyContent : "center"}}>
                    {item.color.length >= 2 &&
                      item.color.map((item, i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: `#${item}`,
                            }}></div>
                        );
                      })}
                  </td>
                  <td className='funcs'>
                    <button onClick={() => handleDelete(item._id)}>حذف</button>
                    <button>
                      <Link to={`/updateProduct/${item._id}`}>ویرایش</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
