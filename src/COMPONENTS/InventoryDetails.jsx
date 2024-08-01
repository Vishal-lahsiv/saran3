import React, { useState, useEffect } from 'react';
import { showInventory } from '../Json/Db';
import './InventoryDetails.css';
import image1 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image1.jpg';
import image2 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image2.jpg';
import image3 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image3.jpg';
import image4 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image4.jpg';
import image5 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image5.jpg';
import image6 from 'C:/Users/divya/OneDrive/Desktop/app-project/my-app/src/Assets/image6.jpg';

const images = [image1, image2, image3, image4, image5, image6];

const InventoryDetails = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showInventory(); 
      setInventoryData(response.data); 
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  return (
    <div className='inventoryDetails'>
      <h1>Inventory Details</h1>
      <div className='inventoryGrid'>
        {inventoryData.map((item, index) => (
          <div className='inventoryItem' key={item.id}>
            <img src={images[index % images.length]} alt={item.pname} />
            <div className='inventoryText'>
              <h2>{item.pname}</h2>
              <p><strong>Quantity:</strong> {item.Quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryDetails;
