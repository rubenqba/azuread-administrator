// app/teams/page.tsx

import TeamsTable from "@component/teams/TeamsTable";
import { getAllTeams } from "@action/teams";
import { getAllPlans } from "@action/plans";

export default async function TeamsPage() {
  const { data: teams } = await getAllTeams();
  console.log(teams);
  return <TeamsTable headerTitle="Team list" list={teams ?? []} />;
}
