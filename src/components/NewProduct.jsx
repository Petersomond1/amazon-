import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from '../services/productServices';

const NewProductModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  
  const onSuccess = (data) =>{
    console.log("success")
  }

  const onError = (error)=>{
    console.log("error")
  }
  const {mutate:createProduct} = useCreateProduct(onSuccess, onError)

  const onSubmit = async (data) => {

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("description", data.description)
    formData.append("image", data.image[0])
    //formData.append("file", data.image)
    await createProduct(formData)
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Product Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Product name"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Price</label>
            <input
              {...register('price', { required: true })}
              type="number"
              step="0.01"
              placeholder="Product price"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              placeholder="Product description"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Upload Image</label>
            <input
              {...register('image', { required: true })}
              type="file"
              className="w-full p-2 mt-1"
            />
          </div>

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
