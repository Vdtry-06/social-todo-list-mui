import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { RequestItem } from "../../types";
import { createItems } from "../../services/apiServices";

export default function CreateItem() {
    const [formData, setFormData] = useState<RequestItem>({
        title: "",
        description: "",
        status: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [successResponse, setSuccessResponse] = useState<{ data: number } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value as string,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessResponse(null);

        if (!formData.status) {
            setError("Please select a status.");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        try {
            const response = await createItems(formData);
            setSuccessResponse(response);
            setFormData({ title: "", description: "", status: "" });
            setTimeout(() => {
                setSuccessResponse(null);
            }, 3000);
        } catch (err) {
            setError("Failed to create item. Please try again.");
            console.error("Error creating item:", err);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <TextField
                        id="outlined-title-input"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        autoComplete="current-title"
                        variant="outlined"
                        size="small"
                        sx={{ width: '20ch' }}
                    />
                    <TextField
                        id="outlined-description-input"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        autoComplete="current-description"
                        variant="outlined"
                        size="small"
                        sx={{ width: '20ch' }}
                    />
                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{ width: '20ch' }}
                    >
                        <MenuItem value="" disabled>
                            <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value="Doing">Doing</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Deleted">Deleted</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '20ch',
                            height: '40px', // Match the default height of outlined TextField (small size)
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Create Item
                    </Button>
                </Box>
            </form>
            {successResponse && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Response</h2>
                    <pre
                        style={{
                            backgroundColor: '#616060',
                            color: '#c9c9c9',
                            padding: '16px',
                            borderRadius: '8px',
                            overflowX: 'auto',
                            fontFamily: 'Consolas, Monaco, monospace',
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                        }}
                    >
                        {JSON.stringify(successResponse, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}