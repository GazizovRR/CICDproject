import fetch from 'node-fetch';
import { urls, header } from '../config/index';

const Email = {
    verificate: async(email) => {
        const response = await fetch(`${urls.apilayer}email_verification/check?email=${email}`, { method: 'GET', headers: header.apilayer });
        return response;
    },
    verificateWithoutAPIKey: async(email) => {
        const response = await fetch(`${urls.apilayer}email_verification/check?email=${email}`, { method: 'GET' });
        return response;
    },
};

export default Email;