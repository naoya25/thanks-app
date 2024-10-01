"use client";
import { getLetterById } from "@/features/letters";
import { Letter } from "@/models/letter";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import bcrypt from "bcryptjs";
import Link from "next/link";

const MessagePage: React.FC = () => {
  const letterId = useParams().id as string;
  const [letter, setLetter] = useState<Letter | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [displayContent, setDisplayContent] = useState("");
  const [contentIndex, setContentIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const fetchLetter = async () => {
      if (letterId) {
        const fetchedLetter = await getLetterById(letterId);
        setLetter(fetchedLetter);
      }
    };
    fetchLetter();
  }, [letterId]);

  useEffect(() => {
    if (letter && contentIndex < letter.content.length) {
      const intervalId = setInterval(() => {
        setDisplayContent(letter.content.substring(0, contentIndex + 1));
        setContentIndex((prev) => prev + 1);
      }, 100);
      return () => clearInterval(intervalId);
    }
    if (letter && contentIndex >= letter.content.length) {
      setComplete(true);
    }
  }, [letter, contentIndex]);

  if (!letter) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    const inputPassword = prompt("パスワードを入力してね:") as string;
    const isMatch = await bcrypt.compare(inputPassword, letter?.password);

    if (isMatch) {
      setIsFavorited(true);
      setDisplayContent("");
      setContentIndex(0);
    } else {
      alert("パスワードが違うよ");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isFavorited ? (
        <div
          onClick={handleClick}
          className="cursor-pointer flex flex-col items-center"
        >
          <FavoriteIcon
            className="text-red-500 animate-heartbeat"
            style={{ fontSize: 200 }}
          />
          <h1 className="text-4xl font-bold mt-4">Tap me!!</h1>
        </div>
      ) : (
        <div>
          <div className="letter p-6">
            <div className="text">
              {displayContent.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
          {complete && (
            <div className="flex justify-center">
              <Link
                href="/"
                className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
              >
                お返しの手紙を書く
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagePage;
