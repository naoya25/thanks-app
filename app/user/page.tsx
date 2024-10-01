import Footer from "@/components/footer";
import Header from "@/components/header";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Link from "next/link";
import UserCard from "@/components/userCard";
import UserLetters from "@/components/userLetters";

const UserPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          <UserCard />

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-4">あなたのお手紙</h3>
              <Link href="/write">
                <AddIcon style={{ color: "blue" }} />
              </Link>
            </div>
            <UserLetters />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
