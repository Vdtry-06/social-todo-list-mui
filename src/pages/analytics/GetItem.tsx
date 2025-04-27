import { TextField, MenuItem } from "@mui/material";
import JsonDisplay from "../../components/JsonDisplay";
import useItemFetcher from "../../hooks/useItemFetcher";

export default function GetItem() {
    const {
        items,
        selectedItem,
        ID,
        setID,
        loadingItems,
        loadingItem,
        errorItems,
        errorItem,
    } = useItemFetcher();

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
            {loadingItem && <p>Loading item details...</p>}
            {errorItem && <p style={{ color: "red" }}>{errorItem}</p>}
            {!loadingItem && !errorItem && selectedItem && (
                <JsonDisplay
                    data={{ result: selectedItem }}
                    title="Data JSON"
                />
            )}
            {!loadingItem && !errorItem && !selectedItem && ID && (
                <p>No item found with ID {ID}.</p>
            )}
            {!loadingItem && !errorItem && !ID && (
                <p>Please select or enter an ID.</p>
            )}
        </div>
    );
}