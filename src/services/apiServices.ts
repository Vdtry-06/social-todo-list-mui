import axios from 'axios';
import { 
    ListItemsResponse,
    ListItemsParams,
    RequestItem,
} from '../types';

const BASE_URL = 'http://localhost:8080';



export const listItems = async (params?: ListItemsParams): Promise<ListItemsResponse> => {
    const response = await axios.get<ListItemsResponse>(`${BASE_URL}/v1/items`, {
        params,
    });
    return response.data;
};

export const createItems = async (request: RequestItem) => {
    const response = await axios.post(
        `${BASE_URL}/v1/items`,
        request,
    )
    return response.data;
}