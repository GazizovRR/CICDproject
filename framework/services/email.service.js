import fetch from 'node-fetch';
import urls from '../config/urls';

const Email = {
    verificate: async(email, key='') => {
        const response = await fetch(`${urls.apilayer}email_verification/check?email=${email}`, { method: 'GET', headers: { apikey: key } });
        return response;
    },
};

export default Email;