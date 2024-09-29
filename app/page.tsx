import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-12">
        <section className="text-center mb-12">
          <h1 className="text-xl font-bold mb-4">手紙を送るのは簡単です！</h1>
          <p className="text-sm text-gray-700">
            たまには家族や友人に
            <br />
            思いを込めた手紙を送ろう。
          </p>
        </section>
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-center text-blue-500 mb-6">
            使い方
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/login">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  1. アカウント登録
                </h3>
                <p className="text-gray-600">Googleログイン</p>
              </div>
            </Link>
            <Link href="/write">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  2. 手紙の作成
                </h3>
                <p className="text-gray-600">
                  メッセージに作成して、
                  <br />
                  思いを伝えよう！
                </p>
              </div>
            </Link>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                3. 送信URLを作成
              </h3>
              <p className="text-gray-600">手紙を書いたらURLを送ろう！</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
