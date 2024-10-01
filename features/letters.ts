import { Letter, PostLetterArgs, UpdateLetterArgs } from "@/models/letter";
import { createClient } from "@/utils/supabase/client";
import bcrypt from "bcryptjs";

export const getLetterById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Letter;
};

export const getLetters = async (userId: string) => {
  const supabase = createClient();
  const { data: letters, error: lettersError } = await supabase
    .from("letters")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<Letter[]>();

  if (lettersError) {
    throw new Error(lettersError.message);
  }
  return letters || [];
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

export const updateLetter = async (args: UpdateLetterArgs) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("letters")
    .update({
      title: args.title,
      content: args.content,
    })
    .eq("id", args.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteLetter = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("letters").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
