import { getAllPlans } from "@action/plans";
import PlanTable from "@component/plans/PlanTable";

export default async function PlanPage() {
  const { data: plans, error } = await getAllPlans();
  return (<PlanTable list={plans ?? []} headerTitle="Subscription plans" />);
}
