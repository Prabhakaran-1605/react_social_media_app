import { FaMobile } from "react-icons/fa";
import { FaTablet } from "react-icons/fa6";
import { IoDesktop } from "react-icons/io5";
import { useContext } from "react";
import DataContext from "./context/DataContext";
const Header = ({title}) => {
    const {width} = useContext(DataContext)
    return (
        <header className="Header">
        <h1>{title}</h1>
        {width < 768 ? <FaMobile/> : width < 992 ? <FaTablet/> : <IoDesktop/> }
        </header>
    )
}

export default Header;