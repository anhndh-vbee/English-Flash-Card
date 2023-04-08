import axios from 'axios';
import DOMAIN from '../config';

export const getAllCards = async () => {
    try {
        const result = await axios.get(`${DOMAIN}/card/get-all-cards`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCard = async (id) => {
    try {
        const result = await axios.get(`${DOMAIN}/card/get-card/` + id);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}
