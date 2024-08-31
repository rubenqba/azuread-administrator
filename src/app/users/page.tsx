// app/users/page.tsx
import UserTable from "@component/users/UserTable";
import { getAllUsers } from "@action/users";

export default async function UsersPage() {
  const users = await getAllUsers();
  console.log(users);
  return <UserTable headerTitle="User list" users={users} />;
}
