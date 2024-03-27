/** @format */

import { useEffect } from "react";
import "./filtering.scss";
import { useGlobalContext } from "../../context";
import CurrencyFormat from "react-currency-format";

function Filtering() {
  const { setFilterOrders, total } = useGlobalContext();

  return (
    <div className='filtering'>
      <span>دسته بندی : </span>
      <select onChange={(e) => setFilterOrders(e.target.value)}>
        <option value='qlastDay'>امروز</option>
        <option value='qlastWeek'>یک هفته پیش</option>
        <option value='qlastMonth'>یک ماه پیش</option>
        <option value='qlastYear'>یک سال پیش</option>
      </select>
      <br />
      <span style={{ marginRight: "10px" }}>درآمد : </span>
      <span style={{ color: "teal", margin: "5px" }}>
        <CurrencyFormat
          thousandSeparator={true}
          value={total}
          prefix='تومان'
          displayType='text'></CurrencyFormat>
      </span>
    </div>
  );
}

export default Filtering;
