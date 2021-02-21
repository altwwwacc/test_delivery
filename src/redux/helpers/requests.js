import axios from 'axios';
import api from "./../api";

// export const apiGetPorts = () => axios.post(`/ports `).then(result => console.log(result));
export const apiGetPorts = () => api.get(`https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ports `).then(result => result.data);

export const apiGetRates = ({origin, destination}) => api.get(`https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=${origin}&destination=${destination}`).then(result => result.data);


// https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=CNSGH&destination=NLRTM
// https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=NLRTM&destination=DEHAM
