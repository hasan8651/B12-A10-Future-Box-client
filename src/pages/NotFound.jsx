import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className='flex justify-center mx-auto'>
            <Helmet><title>ToyTopia - Not Found</title></Helmet>
            <img src='/not_found.png' alt='Not Found' className='w-200 my-4' />
        </div>
    );
};

export default NotFound;