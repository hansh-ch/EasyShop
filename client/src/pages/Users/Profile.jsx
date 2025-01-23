import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateMutation } from "../../slices/userApiSlice";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Label from "../../UI/Label";
import { updateUser } from "../../slices/userSlice";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateAPI, { isLoading, isError }] = useUpdateMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const searchparams = new URLSearchParams(search);
  const redirect = searchparams.get("redirect") || "/";

  useEffect(
    function () {
      if (currentUser) {
        setUsername(() => currentUser?.username);
        setEmail(() => currentUser?.email);
        // navigate(redirect);
      }
    },
    [currentUser],
  );
  let inputData;
  if (!password) {
    inputData = { username, email };
  } else {
    inputData = { username, email, password };
  }
  async function handleSubmit() {
    if (!email || !username) return toast.error("All fields are required");
    const res = await updateAPI(inputData);
    if (res?.data.status === "success") {
      dispatch(updateUser(res?.data.data));
      toast.success("Profile updated sucessfully");
    }
  }
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex items-center">
        <h1 className="mr-5 text-left text-xl font-semibold md:text-2xl">
          Profile Details
        </h1>
        {currentUser?.isAdmin && (
          <Link className="h-10 rounded-lg bg-green-300 px-4 py-2 uppercase">
            Admin Dashboard
          </Link>
        )}
      </div>
      <section className="flex flex-col items-center justify-center">
        <div className="rounded-lg p-6">
          <h2 className="mb-4 text-center text-xl font-semibold md:text-2xl">
            Update your profile
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
              <Label htmlFor="password">Password :</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>

            <li className="flex list-none justify-between">
              <Button onClick={handleSubmit}>Update</Button>
              <Link className="h-10 rounded-lg bg-pink-200 px-4 py-2 uppercase">
                My orders
              </Link>
            </li>
          </ul>
          <div className="mt-3"></div>
        </div>
      </section>
    </div>
  );
}
export default Profile;
