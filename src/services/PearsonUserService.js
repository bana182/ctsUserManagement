import axios from 'axios';



export const PearsonUserService = async api => {
    const response = await axios.get(api);
    return response.data;
};