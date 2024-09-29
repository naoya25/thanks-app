"use client";
import { useUser } from "@/utils/hooks/useUser";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";
import { googleLogout } from "@/features/auth/googleLogin";

export default function DisplayUserState() {
  const { user, loading, error } = useUser();
  const currentPath = usePathname();
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <RefreshIcon
          style={{ color: "white" }}
          className="animate-spin-linear"
        />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div>
        <Link href="/login">
          <LoginIcon style={{ color: "white" }} />
        </Link>
      </div>
    );
  }

  if (currentPath === `/user`) {
    return (
      <div>
        <Link href="/login">
          <Logout
            onClick={() => {
              googleLogout();
              router.push("/");
            }}
            style={{ color: "white" }}
          />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/user">
        <AccountCircleIcon style={{ color: "white" }} />
      </Link>
    </div>
  );
}
