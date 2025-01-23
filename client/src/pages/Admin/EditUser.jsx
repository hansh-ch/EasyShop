import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/userApiSlice";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Label from "../../UI/Label";
import Message from "../../UI/Message";

function EditUser() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const { data: userDetails, isLoading, isError } = useGetUserDetailsQuery(id);
  const [updateUser] = useUpdateUserDetailsMutation();

  const navigate = useNavigate();
  useEffect(
    function () {
      setUsername(() => userDetails?.data.username);
      setEmail(() => userDetails?.data.email);
      setIsAdmin(() => userDetails?.data.isAdmin);
    },
    [userDetails],
  );
  async function handleUpdate() {
    if (!email || !username) return toast.error("All fields are required");
    const data = { username, email, isAdmin };
    try {
      const res = await updateUser({ data, id });
      console.log(res);
      if (res?.data.status === "success") {
        navigate(-1);
        dispatch(updateUser(res?.data.data));
        toast.success("Profile updated sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Message variant="danger">Server Error</Message>;
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex items-center">
        <h1 className="mr-5 text-left text-xl font-semibold md:text-2xl">
          User Details
        </h1>
      </div>
      <section className="flex flex-col items-center justify-center">
        <div className="rounded-lg p-6">
          <h2 className="mb-4 text-center text-xl font-semibold md:text-2xl">
            Update user details
          </h2>
          <ul className="mt-3 space-y-4">
            <li className="flex list-none flex-col gap-3">
              <Label htmlFor="name">Username:</Label>
              <Input
                type="text"
                id="name"
                placeholder="e,g., user!101"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li className="flex list-none flex-col gap-3">
              <Label htmlFor="email">Email :</Label>
              <Input
                type="email"
                placeholder="e,g., example@email.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="flex list-none flex-col gap-3">
              <Label htmlFor="isAdmin">IsAdmin :</Label>
              <select
                className="p-4"
                name="isAdmin"
                id="isAdmin"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              >
                <option>true</option>
                <option>false</option>
              </select>
            </li>

            <li className="w-full">
              <Button onClick={handleUpdate}>Update</Button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
export default EditUser;
