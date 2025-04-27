import { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import JsonDisplay from "../../components/JsonDisplay";
import useItemFetcher from "../../hooks/useItemFetcher";
import { deleteItem } from "../../services/apiServices";
import { Item } from "../../types";

export default function DeleteItem() {
    const {
        items,
        ID,
        setID,
        loadingItems,
        errorItems,
    } = useItemFetcher();
    const [deleteResponse, setDeleteResponse] = useState<any>(null);
    const [errorDelete, setErrorDelete] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!ID) {
            setErrorDelete("Please select an item to delete.");
            setTimeout(() => setErrorDelete(null), 3000);
            return;
        }
        setErrorDelete(null);
        setDeleteResponse(null);
        try {
            const response = await deleteItem(ID);
            setDeleteResponse(response);
            setItems(items.filter((item) => item.id !== ID));
            setID("");
        } catch (err) {
            setErrorDelete("Failed to delete item. Please try again.");
            console.error("Error deleting item:", err);
            setTimeout(() => setErrorDelete(null), 3000);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loadingItems && <p>Loading items...</p>}
            {errorItems && <p style={{ color: "red" }}>{errorItems}</p>}
            {!loadingItems && !errorItems && (
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <TextField
                        select
                        label="ID"
                        value={ID}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            setID(value === "" ? "" : Number(value));
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        disabled={!ID}
                        sx={{ width: '20ch', height: '40px' }}
                    >
                        Delete Item
                    </Button>
                </Box>
            )}
            {errorDelete && <p style={{ color: "red" }}>{errorDelete}</p>}
            {deleteResponse && (
                <JsonDisplay
                    data={{ result: deleteResponse }}
                    title="Delete Response"
                />
            )}
        </div>
    );
}

function setItems(arg0: Item[]) {
    throw new Error("Function not implemented.");
}
