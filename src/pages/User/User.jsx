/** @format */

import Table from "../../components/UserTable/Table";
import "./user.scss";
import { useGlobalContext } from "../../context";

function User() {
  const {setSearchUser} = useGlobalContext()
  return (
    <div className='user'>
      <div className='container'>
        <div className='header'>
          <h1>صفحه کاربران</h1>
          <input
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
            type='text'
            placeholder='جستجو...'
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <Table />
      </div>
    </div>
  );
}

export default User;
