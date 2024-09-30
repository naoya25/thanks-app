"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useUser } from "@/utils/hooks/useUser";
import { getLetterById, postLetter, updateLetter } from "@/features/letters";
import { Letter, PostLetterArgs, UpdateLetterArgs } from "@/models/letter";
import { useRouter, useSearchParams } from "next/navigation";

const WritePage: React.FC = () => {
  const searchParams = useSearchParams();
  const letterId = searchParams.get("letter_id");
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loading: userLoading, error } = useUser();
  const [displayContent, setDisplayContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLetter = async () => {
      if (letterId) {
        const letter = (await getLetterById(letterId)) as Letter;
        setTitle(letter.title);
        setMessage(letter.content);
        setDisplayContent(letter.content);
        setPassword(letter.password);
      }
    };

    fetchLetter();
  }, [letterId]);

  if (userLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>No user is logged in</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(message);
    e.preventDefault();
    setLoading(true);
    if (
      title.trim() === "" ||
      message.trim() === "" ||
      password.trim() === ""
    ) {
      alert("タイトル、内容、合言葉は必須です");
      setLoading(false);
      return;
    }
    if (letterId) {
      await updateLetter({
        id: letterId,
        title: title,
        content: message,
      } as UpdateLetterArgs);
    } else {
      await postLetter({
        user_id: user.id,
        title: title,
        content: message,
        password: password,
      } as PostLetterArgs);
    }
    setLoading(false);
    router.push("/user");
  };

  return (
    <div>
      <Header />
      <div className="p-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {!letterId && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                合言葉 ※後で編集できません
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          )}
          <div className="letter p-6">
            <div
              className="text"
              style={{ outline: "none", border: "none" }}
              contentEditable="true"
              suppressContentEditableWarning={true}
              onInput={(e) => {
                const htmlContent = e.currentTarget.innerHTML;
                if (htmlContent != null) {
                  const updatedMessage = htmlContent
                    .replace(/<br>/g, "\n")
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, "\n");

                  setMessage(updatedMessage);
                }
              }}
            >
              {displayContent.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            >
              {loading ? "送信中..." : letterId ? "更新" : "公開リンクを発行"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default WritePage;
