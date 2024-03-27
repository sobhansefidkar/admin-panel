/** @format */

import { useEffect } from "react";
import "./table.scss";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Table() {
  const {searchUser} = useGlobalContext()
  const [data, setData] = useState([]);

  useEffect(() => {
    if(searchUser == ""){
      axios
      .get("http://localhost:3000/api/getUsers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      const find = data.filter((item) => item.username.includes(searchUser))
      setData(find)
    }
  } , [searchUser])

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

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:3000/api/deleteUser/${id}`)
    .then(res => {
      Swal.fire({
        icon : "success",
        text : "با موفقیت حذف گردید",
        title : "موفق",
        timer : 3000
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div className='table'>
        <table>
            <thead>
                <tr>
                    <th className="row">ردیف</th>
                    <th className="profile">پروفایل</th>
                    <th>نام کاربری</th>
                    <th>شماره موبایل</th>
                    <th>عملگرها</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems.map((item , i) => {
                        return(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td className="prof"><img className="sobhan" src="../images/sobhan.jpg" alt="" /></td>
                                <td>{item.username}</td>
                                <td>{item.phone}</td>
                                <td className="funcs">
                                    <button onClick={() => handleDeleteUser(item._id)}>حذف</button>
                                    <Link to={`/user/${item._id}`}>جزعیات</Link>
                                </td>
                            </tr>
                        )
                    })
                }
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
