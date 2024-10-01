"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postLetter, updateLetter } from "@/features/letters";
import { Letter, PostLetterArgs, UpdateLetterArgs } from "@/models/letter";
import { useUser } from "@/utils/hooks/useUser";

const WriteForm: React.FC<{ letter?: Letter }> = ({ letter }) => {
  const [message, setMessage] = useState<string>(letter?.content || "");
  const [title, setTitle] = useState<string>(letter?.title || "");
  const [password, setPassword] = useState<string>(letter?.password || "");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const displayContent = letter?.content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("ユーザーが見つかりません");
      return;
    }
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
    if (letter) {
      await updateLetter({
        id: letter.id,
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
      {!letter && (
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
          {displayContent?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
        >
          {loading ? "送信中..." : letter ? "更新" : "公開リンクを発行"}
        </button>
      </div>
    </form>
  );
};

export default WriteForm;
