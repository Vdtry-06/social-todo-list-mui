import { useState, useEffect } from "react";
import { Item } from "../../types";
import { 
    MenuItem,
    TextField
} from "@mui/material";
import { listItems, getItem } from "../../services/apiServices";

export default function GetItem() {
    const [items, setItems] = useState<Item[]>([]);
    const [ID, setID] = useState<number | "">("");
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
                if (response.data.length > 0) {
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
    }, []);

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

    const handleIDChange = (value: number | "") => {
        setID(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            {loadingItems && <p>Loading items...</p>}
            {errorItems && <p style={{ color: "red" }}>{errorItems}</p>}
            {!loadingItems && !errorItems && (
                <TextField
                    select
                    label="ID"
                    value={ID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        handleIDChange(value === "" ? "" : Number(value));
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 120, width: '20ch' }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.id}
                        </MenuItem>
                    ))}
                </TextField>
            )}
            <div style={{ marginTop: '20px' }}>
                <h2>Data JSON</h2>
                {loadingItem && <p>Loading item details...</p>}
                {errorItem && <p style={{ color: "red" }}>{errorItem}</p>}
                {!loadingItem && !errorItem && selectedItem && (
                    <pre
                        style={{
                            backgroundColor: '#a8a8a8',
                            color: '#454545',
                            padding: '16px',
                            borderRadius: '8px',
                            overflowX: 'auto',
                            fontFamily: 'Consolas, Monaco, monospace',
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                        }}
                    >
                        {JSON.stringify({ result: selectedItem }, null, 2)}
                    </pre>
                )}
                {!loadingItem && !errorItem && !selectedItem && ID && (
                    <p>No item found with ID {ID}.</p>
                )}
                {!loadingItem && !errorItem && !ID && (
                    <p>Please select or enter an ID.</p>
                )}
            </div>
        </div>
    );
}