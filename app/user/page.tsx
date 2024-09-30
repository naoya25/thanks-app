"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useUser } from "@/utils/hooks/useUser";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import React from "react";
import Link from "next/link";
import { useLetters } from "@/utils/hooks/useLetters";
import { dateFormat } from "@/utils/date";
import Image from "next/image";

const UserPage: React.FC = () => {
  const { user, loading, error } = useUser();
  const { letters } = useLetters();

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
    <div>
      <Header />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <Image
                className="h-16 w-16 rounded-full object-cover"
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {user.user_metadata.name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-4">あなたのお手紙</h3>
              <Link href="/write">
                <AddIcon style={{ color: "blue" }} />
              </Link>
            </div>
            {/* ユーザの手紙一覧 */}
            {letters.map((letter) => (
              <div className="flex justify-between items-center mt-6">
                <Link href={`/write?letter_id=${letter.id}`}>
                  <div key={letter.id} className="flex space-x-4">
                    <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center text-white">
                      <EmailIcon />
                    </div>
                    <div>
                      <p className="font-medium">{letter.title}</p>
                      <p className="text-sm text-gray-500">
                        {dateFormat(letter.created_at)}
                      </p>
                    </div>
                  </div>
                </Link>
                <LinkIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const url = `${window.location.origin}/message/${letter.id}`;
                    navigator.clipboard.writeText(url).then(
                      () => {
                        alert("URLがクリップボードにコピーされました");
                      },
                      (err) => {
                        console.error(
                          "クリップボードへのコピーに失敗しました",
                          err
                        );
                      }
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
