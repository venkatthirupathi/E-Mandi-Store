import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerDashComponent from './CustomerDashComponent';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/download.jpeg';
import '../component.css/HomeStyle.css';

const images = [
  image1,
  image2,
  image3
];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [homeContent, setHomeContent] = useState('');
  const buttonText = 'Shop Online';

  const navigate = useNavigate()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 5000); // Change image every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const fetchHomeContent = async () => {
  //     try {
  //       const response = await axios.get('/home');
  //       console.log(response.data);
  //       setHomeContent(response.data.homeContent);
  //     } catch (error) {
  //       console.error('Error fetching home content:', error);
  //     }
  //   };

  //   fetchHomeContent();
  // }, []);

  const handleClick = () =>{
      navigate("/api/user/dashboard")
  }

  return (
    <>
     {/* <div className="home">
       <div className="slideshow">
         {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="content"> */}
        <h1>Hamsters</h1> 
        <img className = 'img' src= {image4}/>
        <button className = "btn" onClick={handleClick}>{buttonText}</button>
       {/* </div>
     </div> */}
    </>
  );
};

export default Home;


// function Welcome() {
//   return <h1>Hello CVR</h1>;
// }

// export default Welcome;

