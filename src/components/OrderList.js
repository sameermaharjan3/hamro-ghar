import { Link } from "react-router-dom";
import { useState } from "react";

const OrderList = ({orders,paidFilter,fulfilledFilter}) => {
    //const orders = props.orders;
    
    const [filteredOrder, setFilteredOrder] = useState(orders);

    if(paidFilter){
        const paidOrders = [...orders].filter((order) => order.paid == true);
        setFilteredOrder(paidOrders);
    }else if(fulfilledFilter){
        const fulfilledOrders = [...orders].filter((order) => order.fulfilled == true);
        setFilteredOrder(fulfilledOrders);
    }

    return(
        <div className="order-list">
            {filteredOrder.sort((a,b) => a.paid > b.paid ? 1:-1).map((order) => (
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
                    {/* <button onClick={() => handleDelete(order.id)}>Delete</button> */}
                </div>
            ))}
        </div>
    );
}

export default OrderList;