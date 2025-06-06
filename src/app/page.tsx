import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function SignInPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  const signInWithGoogle = async () => {
    "use server";
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/v1/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
      return;
    }

    console.log(data);

    if (data?.url) {
      redirect(data.url);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4">Vity</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Transform your productivity with intelligent task management and
              focus tracking.
            </p>
          </div>
          <div className="space-y-4 text-lg opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Smart time tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Productivity analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Goal achievement</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Vity
            </h1>
            <p className="text-muted-foreground mt-2">
              Boost your productivity
            </p>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to continue your productivity journey
            </p>
          </div>

          <div className="space-y-6">
            <form action={signInWithGoogle}>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                variant="outline"
              >
                <svg className="mr-3 mt-0.5 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
