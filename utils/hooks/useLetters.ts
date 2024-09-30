import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { Letter } from "@/models/letter";

export function useLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLetters = async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not logged in");
        setLoading(false);
      } else {
        const { data: letters, error: lettersError } = await supabase
          .from("letters")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .returns<Letter[]>();

        if (lettersError) {
          setError(lettersError.message);
          setLoading(false);
        } else {
          setLetters(letters || []);
          setLoading(false);
        }
      }
    };

    fetchLetters();
  }, []);

  return { letters, loading, error };
}
