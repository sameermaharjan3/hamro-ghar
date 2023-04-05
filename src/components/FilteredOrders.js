import { useLocation, Link } from "react-router-dom";
import FilterOptions from "./FilterOptions";
import useFetch from "./useFetch";

const FilteredOrders = () => {
    const {data: orders, isPending, error} = useFetch('https://hamro-ghar.onrender.com/orders');
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const paidOrder = queryParameters.get("paid") === "true"?true:false;
    const fulfilledOrder = queryParameters.get("fulfilled") === "true"?true:false;

    return(
        <div className="order-list">
            {isPending && <h5>Loading...</h5>}
            {!paidOrder && !fulfilledOrder && <><h1>Unpaid Orders</h1><FilterOptions filterValue="unpaid" /></>}
            {paidOrder && !fulfilledOrder && <><h1>Paid Orders</h1><FilterOptions filterValue="paid" /></>}
            {paidOrder && fulfilledOrder && <><h1>Fulfilled Orders</h1><FilterOptions filterValue="fulfilled" /></>}
            {!paidOrder && fulfilledOrder && <><h1>No Orders</h1></>}
            {orders && orders.filter((data) => data.paid == paidOrder && data.fulfilled == fulfilledOrder).sort((a,b) => a.name > b.name ? 1:-1).map((order) => (
                <div className={`order-preview ${order.fulfilled ? "fulfilled-order" : ""} ${order.paid ? "paid-order" : ""}`} key={order.id}>
                    <div className="order-content">
                        <Link to={`/hamro-ghar/orders/${order.id}`}>
                            <h2>{order.name}</h2>
                            <p>Address: { order.address }</p>
                            <hr />
                            <h4>Items Ordered:</h4>
                            <p>
                                { order.items.map((item, index) => (
                                    <span key={index}>
                                        { item.itemName } : { item.quantity }{ index + 1 != order.items.length && <span> | </span>} 
                                    </span>
                                ))}
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilteredOrders;