import { useState } from "react";
import Button from "../../../UI/Button";
import { useGetAllCategoriesQuery } from "../../../slices/categoryApiSlice";
import { useUploadProductImageMutation } from "../../../slices/productApiSlice";
import { toast } from "react-toastify";

function ProductForm({ onSubmit }) {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [inStocks, setInStocks] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const { data: categoriesApi } = useGetAllCategoriesQuery();
  const [uploadProductImageAPI] = useUploadProductImageMutation();
  const categories = categoriesApi?.data;

  function handleSubmit() {
    const data = {
      title,
      brand,
      image,
      description,
      inStocks,
      price,
      category,
    };
    if (!title || !brand || !description || !inStocks || !price || !category)
      return toast.error("All fields are required");
    onSubmit(data);
  }

  //Event hand;e Image upload
  async function handleImageUpload(e) {
    const formdata = new FormData();
    formdata.append("image", file);
    try {
      const res = await uploadProductImageAPI(formdata).unwrap();
      if (res.status === "success") {
        toast.success("Image uploaded successfully");
        setImage(res.data);
        setImageUrl(res.data);
      }
    } catch (error) {
      toast.error("Image upload failed");
      console.log(error);
    }
  }
  return (
    <div className="w-full">
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
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-2"
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

      <div className="mx-auto mt-6 flex list-none flex-col gap-3">
        <Button onClick={handleSubmit}>Create Product</Button>
      </div>
    </div>
  );
}
export default ProductForm;
