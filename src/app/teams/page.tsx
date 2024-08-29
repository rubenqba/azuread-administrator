// app/teams/page.tsx

import TeamsTable from "@component/teams/TeamsTable";
import { getTeams } from "@action/teams";
import { getAllPlans } from "@action/plans";

export default async function TeamsPage() {
  const {data: teams} = await getTeams();
  console.log(teams);
  return (<TeamsTable headerTitle="Team list" list={teams ?? []} />);
};
