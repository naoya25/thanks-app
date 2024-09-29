import { createClient } from "@/utils/supabase/client";

export type PostLetterArgs = {
  user_id: string;
  title: string;
  content: string;
  password: string;
};

export const postLetter = async (args: PostLetterArgs) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("letters").insert([{ ...args }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export type UpdateLetterArgs = {
  id: string;
  title: string;
  content: string;
};

export const updateLetter = async (args: UpdateLetterArgs) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("letters")
    .update({ title: args.title, content: args.content })
    .eq("id", args.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
