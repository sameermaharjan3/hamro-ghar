import { useState } from "react";
import { useHistory } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [items, setItems] = useState([{itemName:'Biryani',quantity:1},]);
    const [specialReq, setSpecialReq] = useState('n/a');
    const [paid, setPaid] = useState(false);
    const [fulfilled, setFulfilled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            name, 
            address, 
            phone, 
            items, 
            specialReq, 
            dateOrdered: new Date().toISOString(),
            dateDelivered: "",
            paid,
            fulfilled
        };
        setIsPending(true);
        
        fetch('/data/orders/', {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-Type":"application/json"},
        })
        .then(() => {
            setIsPending(false);
            history.push('/');
        });
    }

    const handleAddItem = () => {
        const itemList = [...items,{itemName:'Biryani',quantity:1}];
        setItems(itemList);
        console.log(itemList);
    }

    const handleDeleteItem = (index) => {
        const itemList = [...items];
        itemList.splice(index, 1);
        setItems(itemList);
    }

    const handleItemChange = (value, type, index) => {
        const itemList = [...items];
        itemList[index][type] = value;
        setItems(itemList);
        console.log(itemList);
    }

    const handleIsPaid = (e) => {
        if(e.target.checked){
            setPaid(true);
        }else{
            setPaid(false);
        }
    }

    const handleIsFulfilled = (e) => {
        if(e.target.checked && paid){
            setFulfilled(true);
        }else{
            setFulfilled(false);
        }
    }

    return(
        <div className="create">
            <h3>Create a new order</h3>
            <form onSubmit={handleSubmit}>
                <label>Full Name : </label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <label>Address :</label>
                <input 
                    type="text"
                    required
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />
                <label>Phone :</label>
                <input 
                    type ="text"
                    required
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />
                <div className="item-details">
                    <h4>Menu :</h4>
                    {items.map((item, index) => (
                        <div className = "select-item-container" key={index}>
                            <div className="select-item">
                                <select name="items"
                                    value={item.itemName}
                                    onChange={(e)=> handleItemChange(e.target.value,'itemName',index)}>
                                    <option value="Biryani">Biryani</option>
                                    <option value="Chicken Curry">Chicken Curry</option>
                                    <option value="Chow Mein">Chow Mein</option>
                                    <option value="Momo">Momo</option>
                                    <option value="Taco">Taco</option>                            
                                </select>
                            </div>
                            <div className = "item-quantity">
                                <span>Quantity : </span>
                                <input type ="number"
                                            required
                                            min="1"
                                            max="10"
                                            value={item.quantity}
                                            onChange={(e)=> handleItemChange(parseInt(e.target.value, 10),'quantity',index)}/>
                            </div>
                            {items.length > 1 && (
                                <div className = "delete-item-btn">
                                    <button type="button" onClick={()=>handleDeleteItem(index)}>Delete</button>
                                </div>)}
                            
                        </div>
                    ))}
                    <div className = "add-item-btn">
                        <button type="button" onClick={handleAddItem}>Add Item</button>
                    </div>
                    
                </div>
                
                <p>Special Request :</p>
                <textarea 
                    type ="text"
                    value={specialReq}
                    onChange={(e)=>setSpecialReq(e.target.value)}
                />
                <div className="order-status-block">
                    <label className="checkbox-block">
                        <input type="checkbox"
                                onChange = {handleIsPaid}
                        /> Paid
                    </label>
                    <label className="checkbox-block">
                        <input type="checkbox"
                                onChange = {handleIsFulfilled}
                        /> Fulfilled
                    </label>
                </div>
                {!isPending && <button className="create-order-btn" type="submit">Create Order</button>}
                {isPending && <p>Creating order...</p>}
            </form>
        </div>
    );
}

export default Create;