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
    const response = await axios.post(`${BASE_URL}/v1/items`,
        request,
    )
    return response.data;
}

export const getItem = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/v1/items/${id}`);
    return response.data;
}

export const updateItem = async (id: number, request: RequestItem) => {
    const response = await axios.patch(`${BASE_URL}/v1/items/${id}`, 
        request
    );
    return response.data;
}