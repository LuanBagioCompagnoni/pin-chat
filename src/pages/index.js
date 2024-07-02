export const getServerSideProps = async (context) => {
    return {
        redirect: {
            destination: '/login',
            permanent: false, 
        },
    };
};

const HomePage = () => {
    return 
};

export default HomePage;