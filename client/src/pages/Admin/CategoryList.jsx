import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../slices/categoryApiSlice";
import CategoryForm from "../../UI/CategoryForm";
import Modal from "../../UI/Modal";

function CategoryList() {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatingName, setUpdatingName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    data: categoryAPIData,
    isLoading: isFetching,
    refetch,
  } = useGetAllCategoriesQuery();
  const [createCategoryAPI] = useCreateCategoryMutation();
  const [updateCategoryAPI] = useUpdateCategoryMutation();
  const [deleteCategoryAPI] = useDeleteCategoryMutation();

  if (isFetching) return <p>Loading</p>;
  const categories = categoryAPIData?.data;

  //creating category
  async function createCategory(e) {
    e.preventDefault();
    try {
      if (!name) return toast.error("Category name cannot be empty");
      const res = await createCategoryAPI({ name }).unwrap();
      if (res.status === "success") {
        setName("");
        toast.success("Category created successfully");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //updating category
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const data = { name: updatingName };
      // if (!name) return toast.error("Category name cannot be empty");
      const res = await updateCategoryAPI({
        id: selectedCategory._id,
        data,
      }).unwrap();
      if (res.status === "success") {
        toast.success("Category updated successfully");
        refetch();
        setModalIsOpen(false);
        setUpdatingName("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //creating category
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await deleteCategoryAPI(selectedCategory._id).unwrap();
      if (res.status === "success") {
        toast.success("Category deleted successfully");
        setModalIsOpen(false);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //open model category
  function handleCategory(category) {
    setModalIsOpen(true);
    setSelectedCategory(category);
  }
  //${modalIsOpen ? "blur-sm" : ""}
  return (
    <div className={`ml-[10rem] flex flex-col md:flex-row`}>
      <div className="p-3 md:w-3/4">
        <div className="h-12">Manage Categories</div>
        <div>
          <CategoryForm
            value={name}
            setValue={setName}
            onClick={createCategory}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories?.map((item) => (
            <div key={item._id} className="border-2 p-2">
              <button
                className="rounded border-pink-500 bg-white px-4 py-2 text-pink-500 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-pink-500"
                onClick={() => handleCategory(item)}
              >
                {item.name}
              </button>
            </div>
          ))}
          <div className="absolute w-full">
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
              <CategoryForm
                value={selectedCategory?.name}
                setValue={setUpdatingName}
                onClick={handleUpdate}
                onClick2={handleDelete}
                isOpen={modalIsOpen}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoryList;
