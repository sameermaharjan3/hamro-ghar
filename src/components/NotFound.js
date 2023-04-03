import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className="not-found-page">
            <h1>404 ERROR</h1>
            <p>Page not found</p>
            <div className="home-page-lnk">
                <Link to="/">Go to Homepage</Link>
            </div>
        </div>
    );
}

export default NotFound;