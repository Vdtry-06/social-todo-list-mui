import { useState, useEffect } from "react";
import { Item } from "../types";
import { listItems } from "../services/apiServices";

type UseItemListFetcherResult = {
    items: Item[];
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rows: number) => void;
    status: string | undefined;
    setStatus: (status: string | undefined) => void;
    totalItems: number;
    loading: boolean;
    error: string | null;
};

export default function useItemListFetcher(initialRowsPerPage = 5): UseItemListFetcherResult {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await listItems({ page, status, limit: rowsPerPage });
                setItems(response.data);
                setTotalItems(response.paging.total);
                setRowsPerPage(response.paging.limit);
            } catch (err) {
                setError("Failed to fetch items. Please try again later.");
                console.error("Failed to fetch items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page, status, rowsPerPage]);

    return {
        items,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        status,
        setStatus,
        totalItems,
        loading,
        error,
    };
}