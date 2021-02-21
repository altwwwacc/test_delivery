import axios from 'axios';

// const API = '//google.com';
export const api = (() => {
    const instaceConfig = {
        headers: {
            // 'API-KEY': '6BzfBn0Eij5v06dOMNKJL7CbPkUPDPwuzjAse44e',
            'Accept': 'application/json, text/plain, */*',
            'X-Api-Key': '6BzfBn0Eij5v06dOMNKJL7CbPkUPDPwuzjAse44e',
            // 'test': '6BzfBn0Eij5v06dOMNKJL7CbPkUPDPwuzjAse44e',
            // 'x-api-key': '6BzfBn0Eij5v06dOMNKJL7CbPkUPDPwuzjAse44e',
        }
    };

    return axios.create(instaceConfig);
})();

axios.defaults.baseURL = 'https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod';

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common['X-Api-Key'] = '6BzfBn0Eij5v06dOMNKJL7CbPkUPDPwuzjAse44';

export default api;