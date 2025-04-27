import useItemFetcher from "../../hooks/useItemFetcher";
import ItemForm from "../../components/ItemForm";
import { updateItem } from "../../services/apiServices";
import { RequestItem } from "../../types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function UpdateItem() {
    const {
        items,
        ID,
        setID,
        loadingItems,
        errorItems,
    } = useItemFetcher();

    const currentItem = items.find((item) => item.id === ID);

    const handleSubmit = async (data: RequestItem) => {
        if (!ID) {
            throw new Error("Please select an item to update.");
        }
        if (!currentItem) {
            throw new Error("Current item data not found.");
        }

        const updatedData: RequestItem = {
            title: data.title || currentItem.title,
            description: data.description || currentItem.description,
            status: data.status || currentItem.status,
        };

        const response = await updateItem(ID, updatedData);
        setID(ID);
        return response;
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
            )}

            <ItemForm
                initialData={
                    currentItem
                        ? {
                              title: currentItem.title,
                              description: currentItem.description,
                              status: currentItem.status,
                          }
                        : undefined
                }
                onSubmit={handleSubmit}
                submitButtonText="Update Item"
            />
        </div>
    );
}
