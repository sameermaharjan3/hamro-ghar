import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className = "navbar">
            <h1><Link to="/hamro-ghar/">KHAJA GHAR</Link></h1>
            <div className = "links">
                
                <Link to="/hamro-ghar/create" style={{color: "#61DAFB"}}>
                    Create Order
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;