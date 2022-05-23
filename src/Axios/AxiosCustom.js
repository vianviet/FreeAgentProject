import axios from 'axios';

const axiosCustom = axios.create({
    // baseURL: 'http://localhost:3001',
    baseURL: 'https://free-agent.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
// Add a request interceptor
axiosCustom.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
axiosCustom.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // log xem thu cai error nhu nao truoc da
        // console.log('Error response: ', error.response);
        const { config, status, data } = error.response;
        console.log("config", config)
        console.log("status", status)
        console.log("data", data)
            // const URLS = ['/register', '/authenticate'];
            // if (URLS.includes(config.url) && status === 400) {
            //     const errorMessage = data || [];
            //     // console.log(data);
            //     // console.log(errorMessage.message);
            //     throw new Error(errorMessage.message); // Cai throw ni la neu vo day thi show cai error nay khong phai cai error duoi return.
            // }
        return Promise.reject(error);
    }
);
export default axiosCustom