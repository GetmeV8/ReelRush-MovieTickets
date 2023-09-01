import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import "./home.scss";
import Widget from "../../Components/widget/Widget";
import DailyRevenueGraph from "../../Components/chart/daily/Daily";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Year from "../../Components/chart/Year/Year";
import Weekly from "../../Components/chart/Weekly/Weekly";
import Month from "../../Components/chart/Monthly/Month";
const TheaterHome = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div style={{padding:"20px"}}>
          <Link  style={{textDecoration:"none"}} to='/salesreport'>
          <Button variant="contained">SALES REPORT</Button>
          </Link>
          </div>
        
        <div className="charts">
          <DailyRevenueGraph title="DAILY  BOOKING" aspect={2 / 1} />
          <Weekly title="WEEKLY  BOOKING" aspect={2 / 1} />
        </div>
        <div className="charts">
          <Month title="MONTHLY BOOKING" aspect={2 / 1} />
          <Year title="YEARLY BOOKNIG" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default TheaterHome;

