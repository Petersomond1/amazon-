import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../services/productServices";

const categoryOptions = [
  "Gifts",
  "Electronics",
  "Movie",
  "Women",
  "Medical",
  "Sales",
  "Fashion",
  "Household",
  "Kitchen",
  "Food",
  "Toys",
  "Grocery",
  "Grocery Food",
  "Books",
];

const NewProductModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSuccess = () => {
    console.log("Product created successfully");
  };

  const onError = (error) => {
    console.error("Error creating product:", error);
  };

  const { mutate: createProduct } = useCreateProduct(onSuccess, onError);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("image_b", data.image_b[0]);
    formData.append("image_c", data.image_c[0]);
    formData.append("video", data.video[0]); // Ensure you're appending the first file
    formData.append("quantity_in_stock", data.quantity_in_stock);
    formData.append("sale_price", data.sale_price);
    formData.append("category", data.category);
    formData.append("rating", data.rating);
    formData.append("featured", data.featured);

  //   for (let [key, value] of formData.entries()) {
  // console.log(`${key}:`, value);
// }

    createProduct(formData);
    // reset();
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700">Product Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Product name"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700">Price</label>
            <input
              {...register("price", { required: true })}
              type="number"
              step="0.01"
              placeholder="Product price"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              {...register("description")}
              placeholder="Product description"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium text-gray-700">Upload Image</label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="w-full p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Upload Image B</label>
            <input
              {...register("image_b")}
              type="file"
              className="w-full p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Upload Image C</label>
            <input
              {...register("image_c")}
              type="file"
              className="w-full p-2 mt-1"
            />
          </div>

          {/* Video Link */}
          <div>
            <label className="block font-medium text-gray-700">Video Link</label>
            <input
              {...register("video")}
              type="file"
              placeholder="Video link"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Quantity in Stock */}
          <div>
            <label className="block font-medium text-gray-700">Quantity in Stock</label>
            <input
              {...register("quantity_in_stock", { required: true })}
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sale Price */}
          <div>
            <label className="block font-medium text-gray-700">Sale Price</label>
            <input
              {...register("sale_price")}
              type="number"
              step="0.01"
              placeholder="Sale price"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>



          {/* Featured */}
          <div className="flex items-center space-x-2">
            <label className="block font-medium text-gray-700">Featured</label>
            <input
              {...register("featured")}
              type="checkbox"
              className="h-5 w-5"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
