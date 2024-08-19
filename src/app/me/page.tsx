import TokenInformation from "@component/UserInformation";

export default function MePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <TokenInformation />
    </main>
  );
}
