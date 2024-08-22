// app/teams/page.tsx

import TeamsTable from "@component/teams/TeamsTable";
import { getTeams } from "@action/teams";

export default async function TeamsPage() {
  const teams = await getTeams();
  console.log(teams);
  return (<TeamsTable headerTitle="Team list" teams={teams} />);
};
