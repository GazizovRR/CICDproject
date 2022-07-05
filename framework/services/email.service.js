import fetch from 'node-fetch';
import urls from '../config/urls';

const Email = {
    verificate: async(email, headers='') => {
        const response = await fetch(`${urls.apilayer}email_verification/check?email=${email}`, { method: 'GET', headers: headers });
        return response;
    },
};

export default Email;