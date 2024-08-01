import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateInventory, getInventoryData } from '../Json/Db'; // Import the functions
import { Context } from './GlobeData';
import './Products.css';
import image1 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image1.jpg';
import image2 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image2.jpg';
import image3 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image3.jpg';
import image4 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image4.jpg';
import image5 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image5.jpg';
import image6 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image6.jpg';

const Products = () => {
  const { isAdmin, updateQuantities } = useContext(Context);
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});

  const fetchInventoryData = async () => {
    const data = await getInventoryData(); // Fetch the data
    const initialCounts = data.reduce((acc, item) => {
      acc[item.pname] = item.Quantity;
      return acc;
    }, {});
    console.log("Fetched inventory data: ", initialCounts);
    setCounts(initialCounts);
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const plans = [
    { id: 1, name: 'Refrigirator', image: image1 },
    { id: 2, name: 'Dishwasher', image: image2 },
    { id: 3, name: 'Washing Machine', image: image3 },
    { id: 4, name: 'Hair Dryer', image: image4 },
    { id: 5, name: 'Microwave Oven', image: image5 },
    { id: 6, name: 'Kettle', image: image6 }
  ];

  const handleIncrement = async (product) => {
    const currentQuantity = counts[product.name] || 0;
    const newQuantity = currentQuantity + 1;

    const updatedProduct = { id: product.id, pname: product.name, Quantity: newQuantity };
    await updateInventory(product.id, updatedProduct);
    console.log(`Incremented ${product.name} to ${newQuantity}`);

    await fetchInventoryData(); // Fetch the updated data
  };

  const handleDecrement = async (product) => {
    const currentQuantity = counts[product.name] || 0;
    const newQuantity = Math.max(0, currentQuantity - 1);

    const updatedProduct = { id: product.id, pname: product.name, Quantity: newQuantity };
    await updateInventory(product.id, updatedProduct);
    console.log(`Decremented ${product.name} to ${newQuantity}`);

    await fetchInventoryData(); // Fetch the updated data
  };

  const handleInputChange = (product, value) => {
    if (value === '' || /^[0-9]+$/.test(value)) {
      const numericValue = value === '' ? '-' : parseInt(value, 10);
      setCounts((prevCounts) => ({
        ...prevCounts,
        [product.name]: numericValue,
      }));
    }
  };

  const handleKeyDown = (product, e) => {
    if (e.key === 'Backspace' && counts[product.name] === '0') {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [product.name]: '-',
      }));
    }
  };

  const handleSave = () => {
    updateQuantities(counts);
    navigate('/Inventory');
  };

  return (
    <div className='plan'>
      <h1>Products In Inventory</h1>
      <div className='planlist1'>
        {plans.slice(0, 3).map((plan, index) => (
          <div className='planItem' key={index}>
            <div className='planPic'>
              <img src={plan.image} alt={plan.name} width={'300px'} height={"200px"} />
            </div>  
            <div className='planText'>
              <h2>{plan.name}</h2>
              <div className='quantityControl'>
                <button onClick={() => handleDecrement(plan)}>-</button>
                <input 
                  type="text"
                  value={counts[plan.name] || 0} 
                  onChange={(e) => handleInputChange(plan, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(plan, e)}
                />
                <button onClick={() => handleIncrement(plan)}>+</button>
              </div>
              {isAdmin && <button className='viewDetails'>Details</button>}
              {!isAdmin && <button className='saveButton' onClick={handleSave}>Save</button>}
            </div>
          </div>
        ))}
      </div>
      <div className='planlist2'>
        {plans.slice(3).map((plan, index) => (
          <div className='planItem' key={index}>
            <div className='planPic'>
              <img src={plan.image} alt={plan.name} />
            </div>
            <div className='planText'>
              <h2>{plan.name}</h2>
              <div className='quantityControl'>
                <button onClick={() => handleDecrement(plan)}>-</button>
                <input 
                  type="text"
                  value={counts[plan.name] || 0} 
                  onChange={(e) => handleInputChange(plan, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(plan, e)}
                />
                <button onClick={() => handleIncrement(plan)}>+</button>
              </div>
              {isAdmin && <button className='viewDetails'>View Details</button>}
              {!isAdmin && <button className='saveButton' onClick={handleSave}>Save</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
