import { useState, useEffect, FormEvent } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { RequestItem } from "../types";

type ItemFormProps = {
    initialData?: RequestItem;
    onSubmit: (data: RequestItem) => Promise<{ data: number }>;
    submitButtonText: string;
};

export default function ItemForm({ initialData, onSubmit, submitButtonText }: ItemFormProps) {
    const [formData, setFormData] = useState<RequestItem>(
        initialData || { title: "", description: "", status: "" }
    );
    const [error, setError] = useState<string | null>(null);
    const [successResponse, setSuccessResponse] = useState<{ data: number } | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessResponse(null);

        if (!formData.status) {
            setError("Please select a status.");
            setTimeout(() => setError(null), 3000);
            return;
        }

        try {
            const response = await onSubmit(formData);
            setSuccessResponse(response);
            if (!initialData) {
                setFormData({ title: "", description: "", status: "" });
            }
            setTimeout(() => setSuccessResponse(null), 3000);
        } catch (err) {
            setError("Failed to process item. Please try again.");
            console.error("Error processing item:", err);
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>{submitButtonText}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                        placeholder="Enter title"
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
                        placeholder="Enter description"
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
                        {!initialData && (
                            <MenuItem value="" disabled>
                                <em>Select status</em>
                            </MenuItem>
                        )}
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
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {submitButtonText}
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
