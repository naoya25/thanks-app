import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getLetterById } from "@/features/letters";
import { Letter } from "@/models/letter";
import WriteForm from "@/components/writeForm";

export default async function WritePage({
  searchParams,
}: {
  searchParams: { letter_id?: string };
}) {
  const letterId = searchParams.letter_id;
  let letter: Letter | undefined = undefined;

  if (letterId) {
    letter = (await getLetterById(letterId)) as Letter;
  }

  return (
    <div>
      <Header />
      <div className="p-12">
        <WriteForm letterId={letter?.id} />
      </div>
      <Footer />
    </div>
  );
}
