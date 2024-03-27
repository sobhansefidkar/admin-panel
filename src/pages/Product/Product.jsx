/** @format */

import Table from "../../components/ProductTable/Table";
import "./product.scss";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

function Product() {
  const { setSearchProduct , setFiltering} = useGlobalContext();
  return (
    <div className='products'>
      <div className='container'>
        <div className='header'>
          <h1>صفحه محصولات</h1>
          <div>
            <select onChange={(e) => setFiltering(e.target.value)}>
              <option value="all">همه</option>
              <option value="discount">تخفیف دارها</option>
              <option value="instock">موجودها</option>
              <option value="outOfStock">ناموجود</option>
            </select>
            <input
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid gray",
              }}
              type='text'
              placeholder='جستجو...'
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Link to={"/product"}>
              <button>افزودن محصول</button>
            </Link>
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
}

export default Product;
