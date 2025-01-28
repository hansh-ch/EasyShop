import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../slices/productApiSlice";
import { useGetAllCategoriesQuery } from "../../../slices/categoryApiSlice";
import Button from "../../../UI/Button";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: isGettingProduct } = useGetProductByIdQuery(id);
  const [updateProductAPI] = useUpdateProductMutation();
  const [uploadProductImageAPI] = useUploadProductImageMutation();
  const { data: categoriesApi } = useGetAllCategoriesQuery();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [inStocks, setInStocks] = useState(0);
  const [file, setFile] = useState("");
  const categories = categoriesApi?.data;
  const productData = data?.data;
  useEffect(
    function () {
      setImage(() => productData?.image || "");
      setTitle(() => productData?.title || "");
      setBrand(() => productData?.brand || "");
      setDescription(() => productData?.description || "");
      setPrice(() => productData?.price || "");
      setInStocks(() => productData?.inStocks || "");
      setCategory(() => productData?.category || "");
    },
    [productData],
  );

  async function handleImageUpload(e) {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImageAPI(formdata).unwrap();
      if (res.status === "success") {
        toast.success("Image uploaded successfully");
        setImage(res.data);
      }
    } catch (error) {
      toast.error("Image upload failed");
      console.log(error);
    }
  }
  async function handleUpdate() {
    if (!title || !brand || !description || !inStocks || !price || !category)
      return toast.error("All fields are required");
    const data = {
      title,
      brand,
      image,
      description,
      inStocks,
      price,
      category,
    };
    try {
      const res = await updateProductAPI({ id, data }).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
        navigate("/admin/products");
      } else {
        toast.error("Product update failed");
        return;
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  if (isGettingProduct) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/admin/products")}>GO Back</Button>
      </div>
      <div className="mx-auto max-w-6xl bg-purple-200">
        <div className="mt-4 p-6">
          <h3 className="mb-4 text-center text-2xl font-bold">
            Update product details
          </h3>
          <div>
            {/* Display Image */}
            <div className="flex w-full flex-col items-center justify-center md:flex-row"></div>

            {/* Form  */}
            <div className="mt-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <ul>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Title :
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </li>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Description :
                    </label>
                    <textarea
                      id="description"
                      className="max- mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </li>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="brand"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Brand :
                    </label>
                    <input
                      type="text"
                      id="brand"
                      className="mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </li>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="brand"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Upload Image :
                    </label>
                    <div className="flex flex-wrap items-center justify-between">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="mb-2"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <Button onClick={handleImageUpload}>Upload</Button>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="price"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Price :
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </li>
                  <li className="mx-auto flex list-none flex-col gap-3">
                    <label
                      htmlFor="stocks"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Count in stocks :
                    </label>
                    <input
                      type="number"
                      id="stocks"
                      className="mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                      value={inStocks}
                      onChange={(e) => setInStocks(e.target.value)}
                    />
                  </li>
                  <li className="mx-auto flex list-none flex-col gap-3 lg:mt-6">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                    >
                      Category :
                    </label>
                    <select
                      name="category"
                      id="category"
                      placeholder="Choose category"
                      className="rounded-md bg-[hsla(0,0%,6%,0.3)] px-3 py-[16px] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories?.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                          //   className="mb-3 rounded-lg border bg-[hsla(0,0%,6%,0.3)] p-4"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>
              <div className="w-full">
                <button
                  className="mt-4 w-full rounded-md bg-black px-4 py-2 font-semibold uppercase text-white"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}
export default UpdateProduct;
