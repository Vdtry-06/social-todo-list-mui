import ItemForm from "../../components/ItemForm";
import { createItems } from "../../services/apiServices";

export default function CreateItem() {
    return (
        <div style={{ padding: '20px' }}>
            <ItemForm
                onSubmit={createItems}
                submitButtonText="Create Item"
            />
        </div>
    );
}