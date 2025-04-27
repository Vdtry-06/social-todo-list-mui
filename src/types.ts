export interface Item extends RequestItem {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Paging {
    page: number;
    limit: number;
    total: number;
}

export interface Filter {
    status: string;
}

export interface ListItemsResponse {
    data: Item[];
    paging: Paging;
    filter: Filter;
}

export interface ListItemsParams {
    page?: number;
    status?: string;
    limit?: number;
}

export interface RequestItem {
    title: string;
    description: string;
    status: string;
}