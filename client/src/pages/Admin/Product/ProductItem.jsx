import { useNavigate } from "react-router-dom";
import moment from "moment";
function ProductItem({ product, onDelete }) {
  const navigate = useNavigate();
  return (
    <li className="mb-3 list-none rounded-md p-2">
      <div className="mx-auto grid max-w-[800px] grid-cols-2 gap-4 rounded-md border border-black p-3">
        <div className="grid p-4">
          <img
            src={product.image}
            alt="img"
            className="h-[200px] w-[300px] rounded-md object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-3 p-3">
          <p className="flex font-semibold">{product.title}</p>
          <p className="">
            Brand:
            <span className="ml-2 font-semibold">{product.brand}</span>
          </p>
          <p className="">
            Price:
            <span className="ml-2 font-semibold">$ {product.price}</span>
          </p>
          <p className="hidden md:block">
            Created:
            <span className="ml-2 font-semibold text-gray-500">
              {moment(product.createdAt).format("MMMM Do YYYY")}
            </span>
          </p>
          {/* Buttons */}
          <div className="flex w-full flex-wrap items-center gap-4 lg:flex-nowrap lg:items-start">
            <button
              className="rounded-md bg-black px-4 py-2 font-semibold uppercase text-white"
              onClick={() => navigate(`update/${product._id}`)}
            >
              Update
            </button>
            <button
              className="rounded-md bg-red-600 px-4 py-2 font-semibold uppercase text-white"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
export default ProductItem;
