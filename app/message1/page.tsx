"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";

const Message1Page: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    const password = prompt("パスワードを入力してね:");
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (password === correctPassword) {
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
        <div className="letter">
          <div className="typing">
            <div className="typing-effect">
              <span className="line">勇者へ</span>
              <span className="line">いつも手紙くれてありがとう</span>
              <span className="line">
                俺は全然手紙とか書いたことないっていう
              </span>
              <span className="line">だけで、全然返せてなくてごめんね</span>
              <span className="line">だから全然上手く書けないけど、</span>
              <span className="line">読んでくれたら嬉しい</span>
              <span className="line">
                みのりんと出会ってかなり時間が経つけど、
              </span>
              <span className="line">今でもみのりんのこと大好きやし、</span>
              <span className="line">ほんとに付き合ってくれてありがとう</span>
              <span className="line">みのりんがいてくれてほんとに幸せ</span>
              <span className="line">
                みのりんは、いつもかまちょとかめんどく
              </span>
              <span className="line">ないかとか気にしてるかもだけど、</span>
              <span className="line">俺にめっちゃちょっかいかけて</span>
              <span className="line">くれるのめっちゃ嬉しいで</span>
              <span className="line">すぐ返信できんかったり、</span>
              <span className="line">電話もできないことも多いし、</span>
              <span className="line">授業始まったらもっと忙しくなるかも</span>
              <span className="line">しれんけど、これからももっと</span>
              <span className="line">電話とかしよ</span>
              <span className="line">これからもずっと一緒にいようね</span>
              <span className="line">みのりんのこと大好きだよ</span>
              <span className="line">これからもよろしくね</span>
              <span className="line">魔王より</span>
              <span className="line text-xs">
                <br />
                ps.知らない人からのURLは開かないようにねw
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message1Page;
