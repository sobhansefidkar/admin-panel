/** @format */

import Filtering from "../../components/OrderFiltering/Filtering";
import Table from "../../components/OrderTable/Table";
import "./order.scss";

function Order() {
  return (
    <div className='order'>
      <div className='container'>
        <h1>صفحه سفارشات</h1>
        <Filtering />
        <Table/>
      </div>
    </div>
  );
}

export default Order;
