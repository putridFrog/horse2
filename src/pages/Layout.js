import { Link, Outlet } from "react-router-dom";

const Layout = ({money}) => {
    return (
    <>
    <nav>
        <ul className="navList">
        <li className="navItem">
            <Link to="/">Home</Link>
        </li>
        <li className="navItem">
            <Link to="/SmallRace"> Race </Link>
        </li>
        <li className="navItem">
            <Link to="/settings"> Settings</Link>
        </li>
        <li className="navItem">your money is: ${money}</li>
        </ul>
    </nav>
    <Outlet />
    </>
)
};

export default Layout;