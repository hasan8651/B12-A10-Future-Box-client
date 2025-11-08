import { useEffect } from 'react';


import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider';
import FeaturedCourses from '../components/FeaturedCourses';


const Home = () => {

  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <div>
      <Helmet><title>Study Pilot - Home</title></Helmet>
      <Slider />
      <FeaturedCourses/>
      
    </div>
  );
};

export default Home;