import { useHistory, useParams, Link } from "react-router-dom";
import useFetch from './useFetch';

const OrderDetails = () => {
    const {id} = useParams();
    const {data: orderDetails, isPending, error} = useFetch('https://sameermaharjan3.github.io/hamro-ghar-db/orders/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('https://sameermaharjan3.github.io/hamro-ghar-db/orders/' + orderDetails.id,{
            method:'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return(
        <div className="order-details">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {orderDetails && (
                <div className="order-details-frame">
                    <h1>Order Details</h1>
                    <div className="order-details-content">
                        <h3>Ordered by : {orderDetails.name}</h3>
                        <p>Address : {orderDetails.address}</p>
                        <p>Phone : {orderDetails.phone}</p>
                        <hr />
                        <div className="order-description">
                            <h4>Items Ordered</h4>
                            { orderDetails.items.map((item,index) => (
                                <span key={index}>
                                    <p key={index}>{ item.itemName } : { item.quantity }</p>
                                </span>
                            ))}
                            <hr />
                            <em>
                                <h5>Special Request</h5>
                                <p>{orderDetails.specialReq}</p>
                            </em>
                        </div>
                    </div>
                    <div className = "order-btn-block">
                        <div className="edit-order-btn">
                            <Link to={`/hamro-ghar/edit/${orderDetails.id}`}>
                                Edit
                            </Link>
                        </div>
                        <div className="delete-order-btn">
                            <button onClick={handleClick}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;