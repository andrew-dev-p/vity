import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4">
      <h1>Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
    </div>
  );
}
