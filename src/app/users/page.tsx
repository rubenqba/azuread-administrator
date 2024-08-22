// app/users/page.tsx
import UserTable from "@component/users/UserTable";
import { getClients } from "@action/clients";

export default async function UsersPage() {
  const clients = await getClients();
  console.log(clients);
  return (<UserTable headerTitle="Client list" users={clients} />);
};
