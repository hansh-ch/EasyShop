import { useState } from "react";
import ProductForm from "./ProductForm";

function CreateProduct({ onClose, onSubmit }) {
  return (
    <div className="mx-auto max-w-6xl rounded-md p-4">
      <div className="relative bg-purple-200 p-6">
        <h3 className="mb-4 text-center text-2xl font-bold">Create Product</h3>
        <button
          className="absolute right-4 top-4 border border-black px-3 py-2 uppercase"
          onClick={() => onClose(false)}
        >
          Close
        </button>
        <div>
          <div className="mt-4 flex w-full justify-center">
            <ProductForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProduct;
