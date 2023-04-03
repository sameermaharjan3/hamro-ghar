import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';

const FilterOptions = ({filterValue}) => {

    const history = useHistory();
    const [filter, setFilter] = useState(filterValue);

    const handleNone = (e) => {
        if(e.target.checked){
            history.push('/');
            setFilter("none");
        }
    }

    const handleUnpaid = (e) => {
        if(e.target.checked){
            history.push('/orders/filter?unpaid=true');
            setFilter("unpaid");
        }
    }

    const handlePaid = (e) => {
        if(e.target.checked){
            history.push('/orders/filter?paid=true');
            setFilter("paid");
        }
        
    }

    const handleFulfilled = (e) => {
        if(e.target.checked){
            history.push('/orders/filter?fulfilled=true&paid=true');
            setFilter("fulfilled");
        }        
    }

    return(
        <div className="filter-radio-btn">
            <h5><em>Filters : </em></h5>
            <label>
                <input type="radio" onChange={handleNone} id="none" value="none" checked={filter === "none"}/><span>none</span>
            </label>
            <label>
                <input type="radio" onChange={handleUnpaid} id="unpaid" value="unpaid" checked={filter === "unpaid"}/><span>Unpaid</span>
            </label>
            <label >
                <input type="radio" onChange={handlePaid} id="paid" value="paid" checked={filter === "paid"}/><span>Paid</span>
            </label>
            <label>
                <input type="radio" onChange={handleFulfilled} id="fulfilled" value="fulfilled" checked={filter === "fulfilled"}/><span>Fulfilled</span>
            </label>
        </div>
    );
}

export default FilterOptions;