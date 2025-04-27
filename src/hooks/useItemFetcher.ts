import { useState, useEffect } from "react";
import { Item } from "../types";
import { listItems, getItem } from "../services/apiServices";

type UseItemFetcherResult = {
    items: Item[];
    selectedItem: Item | null;
    ID: number | "";
    setID: (value: number | "") => void;
    loadingItems: boolean;
    loadingItem: boolean;
    errorItems: string | null;
    errorItem: string | null;
};

export default function useItemFetcher(initialID?: number | ""): UseItemFetcherResult {
    const [items, setItems] = useState<Item[]>([]);
    const [ID, setID] = useState<number | "">(initialID || "");
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [loadingItems, setLoadingItems] = useState<boolean>(true);
    const [loadingItem, setLoadingItem] = useState<boolean>(false);
    const [errorItems, setErrorItems] = useState<string | null>(null);
    const [errorItem, setErrorItem] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoadingItems(true);
            setErrorItems(null);
            try {
                const response = await listItems({ limit: 100 });
                setItems(response.data);
                if (!initialID && response.data.length > 0) {
                    setID(response.data[0].id);
                }
            } catch (err) {
                setErrorItems("Failed to fetch items. Please try again.");
                console.error("Error fetching items:", err);
            } finally {
                setLoadingItems(false);
            }
        };

        fetchItems();
    }, [initialID]);

    useEffect(() => {
        if (!ID) {
            setSelectedItem(null);
            setErrorItem(null);
            return;
        }

        const fetchItem = async () => {
            setLoadingItem(true);
            setErrorItem(null);
            try {
                const response = await getItem(ID);
                setSelectedItem(response);
            } catch (err) {
                setErrorItem(`Failed to fetch item with ID ${ID}. Please try again.`);
                console.error("Error fetching item:", err);
                setSelectedItem(null);
            } finally {
                setLoadingItem(false);
            }
        };

        fetchItem();
    }, [ID]);

    return {
        items,
        selectedItem,
        ID,
        setID,
        loadingItems,
        loadingItem,
        errorItems,
        errorItem,
    };
}