import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/userApiSlice";
import Message from "../../UI/Message";
import Button from "../../UI/Button";

function UserList() {
  const { data: apiUsers, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(
    function () {
      refetch();
    },
    [refetch],
  );
  async function handleDelete(id) {
    if (window.confirm("Are you sure")) {
      try {
        const res = await deleteUser(id);
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Message variant="danger">Server Error</Message>;

  const users = apiUsers.data;
  console.log(users);
  if (!isLoading && !isError)
    return (
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-semibold">Users</h1>
        <div className="flex flex-col md:flex-row">
          <table className="mx-auto w-full md:w-4/5">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ROLE</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-4">
                      <Button>
                        <Link to={`../user/edit/${user._id}`}> Edit</Link>
                      </Button>
                      <Button onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default UserList;
