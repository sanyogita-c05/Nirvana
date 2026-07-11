import { useState } from "react";
import { createProduct } from "../api/product";

function AddProduct() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        stockQuantity: "",
        image: null,
    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({
                ...formData,
                image: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("costPrice", formData.costPrice);
            data.append("sellingPrice", formData.sellingPrice);
            data.append("stockQuantity", formData.stockQuantity);

            if (formData.image) {
                data.append("image", formData.image);
            }

            const res = await createProduct(data);

            alert(res.data.message);

            setFormData({
                name: "",
                description: "",
                category: "",
                costPrice: "",
                sellingPrice: "",
                stockQuantity: "",
                image: null,
            });

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to create product."
            );

        }

    };

    return (
        <div style={{ padding: "40px" }}>

            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>

                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="costPrice"
                    placeholder="Cost Price"
                    value={formData.costPrice}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Selling Price"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="stockQuantity"
                    placeholder="Stock Quantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="file"
                    name="image"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Save Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;