import React, { useState } from 'react';
import product1 from '../assets/images/image1.jpg';
import product2 from '../assets/images/image2.jpg';

interface CartItem {
  id: number;
  image: string;
  description: string;
  price: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    image: product1,
    description: 'This is a great product.',
    price: 29.99,
  },
  {
    id: 2,
    image: product2,
    description: 'This is another great product.',
    price: 39.99,
  },
];

const CartComponent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div style={styles.container}>
      {cartItems.map(item => (
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.description} style={styles.image} />
          <div style={styles.info}>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleRemoveItem(item.id)} style={styles.button}>Remove</button>
          </div>
        </div>
      ))}
      {cartItems.length === 0 && <p>Your cart is empty</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    width: '300px',
    textAlign: 'center',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '8px 0 0 8px',
  },
  info: {
    flex: '1',
    padding: '10px',
  },
  button: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default CartComponent;
