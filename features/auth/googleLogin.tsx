import { createClient } from "@/utils/supabase/client";

export const googleLogin = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Google login error:", error.message);
    return;
  }
};
