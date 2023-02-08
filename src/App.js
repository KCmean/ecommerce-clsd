import React, { useState, useEffect } from "react";
import { Products, Navbar } from "./components";
import { commerce } from "./assets/lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart , setCart] = useState({});


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId , quantity) =>{
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.cart);
  }

  useEffect(()=>{
    fetchProducts(); 
    fetchCart();
  } ,[]);


  return (
    <div>
      <Navbar totalItems = {cart.totalItems}/>
      <Products products={products} onAddToCart = {handleAddToCart} />
    </div>
  );
};

export default App;
