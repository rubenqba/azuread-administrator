// app/users/page.tsx
import UserTable from "@component/UserTable";
import { getClients } from "@lib/clients";

export default async function UsersPage() {
  const clients = await getClients();
  console.log(clients);
  return (<UserTable headerTitle="Client list" users={clients} />);
};
