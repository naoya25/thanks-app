export type Letter = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  password: string;
  created_at: string;
};

export type PostLetterArgs = {
  user_id: string;
  title: string;
  content: string;
  password: string;
};

export type UpdateLetterArgs = {
  id: string;
  title: string;
  content: string;
};
