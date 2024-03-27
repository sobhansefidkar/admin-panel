import "./home.css"
import Widget from "../../components/Widget/Widget";
import UserChart from "../../components/UsersChart/Chart";
import OrderChart from "../../components/OrderChart/Chart"

function Home() {
    return ( 
        <div className="home">
            <Widget/>
            <UserChart/>
            <OrderChart/>
        </div>
     );
}

export default Home;