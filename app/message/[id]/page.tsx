"use client";
import { getLetterById } from "@/features/letters";
import { Letter } from "@/models/letter";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import bcrypt from "bcryptjs";

const MessagePage: React.FC = () => {
  const letterId = useParams().id as string;
  const [letter, setLetter] = useState<Letter | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchLetter = async () => {
      if (letterId) {
        const fetchedLetter = await getLetterById(letterId);
        setLetter(fetchedLetter);
      }
    };

    fetchLetter();
  }, [letterId]);

  if (!letter) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    const inputPassword = prompt("パスワードを入力してね:") as string;
    console.log(inputPassword);
    console.log(letter?.password);
    const isMatch = await bcrypt.compare(inputPassword, letter?.password);

    if (isMatch) {
      setIsFavorited(true);
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
        <div className="letter p-6">
          <div className="typing">
            <div className="typing-effect">
              {letter?.content.split("\n").map((line, index) => (
                <span key={index} className="line">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
