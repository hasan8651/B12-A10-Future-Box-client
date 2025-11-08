import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
    return (
        <div className='w-full mx-auto flex-1'>
            <Helmet><title>Error 404</title></Helmet>
            <div className='flex flex-col items-center justify-center text-center py-12 px-6'>
                <img src='/error-page.jpg' alt='404 page' className='w-100 my-4' />
                <h1 className='text-4xl font-extrabold text-blue-500 mb-2'>Oops, page not found!</h1>
                <p className='text-blue-500 mb-6'>The page you are looking for is not available.</p>
                <a href='/'
                    className="btn h-14  bg-blue-500 text-white hover:bg-blue-700">
                    Go to Homepage
                </a>
            </div>
        </div>

    );
};

export default ErrorPage;