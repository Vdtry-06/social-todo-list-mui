import axios from 'axios';
import { ListItemsResponse } from '../types';

const BASE_URL = 'http://localhost:8080';

interface ListItemsParams {
    page?: number;
    status?: string;
    limit?: number;
}

export const listItems = async (params?: ListItemsParams): Promise<ListItemsResponse> => {
    const response = await axios.get<ListItemsResponse>(`${BASE_URL}/v1/items`, {
        params,
    });
    return response.data;
};