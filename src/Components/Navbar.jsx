import { Link } from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar = () => {

    return ( 
      
        <nav id="nav">
            <div>
            <Link to="/home" className="logo">Albatross </Link>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIUrxTzcJGc8SOdnFU5ZLemdh-idmmmR7sEhOBtp9adSi6VA9dga2zI0HYLr_2FId85o4&usqp=CAU"></img>
            </div>

            <div id="rightnav">
                <div >
                    <Link to="/bookbus" className="nav-link">BookBus</Link>
                </div>
                {/* <div>
                <Link className="nav-link" to="/">Flight</Link>
                </div> */}
                {/* <div>
                    <Link className="nav-link" to="/">Active</Link>
                </div> */}
                <div>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </div>
            </div>
        </nav>
        
     );
}
 
export default Navbar;