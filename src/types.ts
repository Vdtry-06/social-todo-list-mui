export interface Item {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    status: string;
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