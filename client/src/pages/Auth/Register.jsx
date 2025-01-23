import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Label from "../../UI/Label";
import { useRegisterMutation } from "../../slices/userApiSlice";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { search } = useLocation();
  const searchparams = new URLSearchParams(search);
  const redirect = searchparams.get("redirect") || "/";

  // useEffect(
  //   function () {
  //     if (currentUser) {
  //       navigate(redirect);
  //     }
  //   },
  //   [currentUser, navigate, redirect],
  // );
  const [register, { isLoading, isError }] = useRegisterMutation();
  async function handleSubmit() {
    if (!email || !password || !username)
      return toast.error("All fields are required");
    const res = await register({ email, password, username });
    if (res.data.status === "success") {
      navigate("/login");
      toast.success("Signed up sucessfully");
    }
  }
  return (
    <section className="mx-auto flex h-screen max-w-6xl items-center justify-center bg-black">
      <div className="rounded-lg bg-white p-6 sm:max-w-sm md:w-[600px]">
        <h2 className="text-center font-semibold md:text-xl">
          Create an account
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

          <li className="flex list-none flex-col gap-3">
            <Button onClick={handleSubmit} disabled={!isError && isLoading}>
              Register
            </Button>
          </li>
        </ul>
        <div className="mt-3">
          <p>
            Already have an account ?{" "}
            <span>
              <Link to="/login" className="text-purple-800">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
export default Register;
