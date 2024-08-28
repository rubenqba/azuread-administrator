// app/users/page.tsx
import UserTable from "@component/users/UserTable";
import { getClients } from "@action/clients";
import { getTeams } from "@action/teams";

export default async function UsersPage() {
  const teams = await getTeams();
  const clients = await getClients();
  // console.log(clients);
  return (<UserTable teams={teams} headerTitle="Client list" users={clients} />);
};
