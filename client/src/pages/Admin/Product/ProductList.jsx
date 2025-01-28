import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUploadProductImageMutation,
} from "../../../slices/productApiSlice";
import { useGetAllCategoriesQuery } from "../../../slices/categoryApiSlice";
import Button from "../../../UI/Button";
import AdminMenu from "../AdminMenu";
import CreateProduct from "./CreateProduct";
import ProductItem from "./ProductItem";

function ProductList() {
  const [isAddProudctOpen, setIsAddProductOpen] = useState(false);
  const navigate = useNavigate();
  const [createProductAPI] = useCreateProductMutation();
  const [deleteProductAPI] = useDeleteProductMutation();
  const {
    data: apiProductsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery();

  const allProducts = apiProductsData?.data;
  // ==> Event create product
  async function handleSubmit(data) {
    try {
      const res = await createProductAPI(data).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
        setIsAddProductOpen(false);
        refetch();
        //navigate("")
      } else {
        toast.error("Product creation failed");
        return;
      }
    } catch (error) {
      toast.error("Product creation failed");
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await deleteProductAPI(id).unwrap();
      console.log(res);
      if (res.status === "success") {
        toast.success(res.message);
        refetch();
        //navigate("")
      } else {
        toast.error("Product delete failed");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading && !isError) return <p>Loading...</p>;
  if (isError) return <p>Error Loading products</p>;
  return (
    <div>
      <div className="mb-4">
        <button
          className="rounded-md bg-slate-700 px-4 py-2 uppercase text-white"
          onClick={() => setIsAddProductOpen(true)}
        >
          Add Product
        </button>
      </div>
      {isAddProudctOpen && (
        <CreateProduct onClose={setIsAddProductOpen} onSubmit={handleSubmit} />
      )}
      {/* All products section */}
      <section>
        <h3 className="mb-3 text-2xl font-semibold">All Products: </h3>
        <ul>
          {allProducts?.map((proudct) => (
            <ProductItem
              key={proudct._id}
              product={proudct}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
export default ProductList;
