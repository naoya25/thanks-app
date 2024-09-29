import { createClient } from "@/utils/supabase/client";
import bcrypt from "bcryptjs";

export type PostLetterArgs = {
  user_id: string;
  title: string;
  content: string;
  password: string;
};

export const postLetter = async (args: PostLetterArgs) => {
  const supabase = createClient();
  const hashedPassword = await bcrypt.hash(args.password, 10);
  args.password = hashedPassword;
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
  password: string;
};

export const updateLetter = async (args: UpdateLetterArgs) => {
  const supabase = createClient();
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const { data, error } = await supabase
    .from("letters")
    .update({
      title: args.title,
      content: args.content,
      password: hashedPassword,
    })
    .eq("id", args.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
