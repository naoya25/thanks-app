import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data && data.user) {
        setUser(data.user);
        setLoading(false);
      } else {
        setError("No user found");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
