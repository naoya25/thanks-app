import DisplayUserState from "@/components/displayUserState";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen m-12">
      <ul>
        <li>
          <DisplayUserState />
        </li>
        <li>
          <Link href="/message1">2024-9-29</Link>
        </li>
      </ul>
    </div>
  );
}
