"use client";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormat } from "@/utils/date";
import Link from "next/link";
import { Letter } from "@/models/letter";
import { deleteLetter, getLetters } from "@/features/letters";
import { useUser } from "@/utils/hooks/useUser";

const UserLetters: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchLetters = async () => {
      if (!user) return;

      const fetchedLetters = await getLetters(user.id);
      setLetters(fetchedLetters);
    };

    if (user) {
      fetchLetters();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>No user is logged in</div>;
  }

  return (
    <>
      {letters.map((letter) => (
        <div key={letter.id} className="flex justify-between items-center mt-6">
          <Link href={`/write?letter_id=${letter.id}`}>
            <div key={letter.id} className="flex space-x-4">
              <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white">
                <EmailIcon />
              </div>
              <div>
                <p className="font-medium truncate w-32">{letter.title}</p>
                <p className="text-sm text-gray-500">
                  {dateFormat(letter.created_at)}
                </p>
              </div>
            </div>
          </Link>
          <div className="flex">
            <LinkIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                const url = `${window.location.origin}/message/${letter.id}`;
                navigator.clipboard.writeText(url).then(
                  () => {
                    alert("URLがクリップボードにコピーされました");
                  },
                  () => {
                    alert("クリップボードへのコピーに失敗しました");
                  }
                );
              }}
            />
            <DeleteIcon
              style={{ cursor: "pointer", paddingLeft: "10px" }}
              onClick={async () => {
                await deleteLetter(letter.id);
                setLetters(letters.filter((l) => l.id !== letter.id));
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default UserLetters;
