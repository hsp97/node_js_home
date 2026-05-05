import { redirect } from "next/navigation";
import { getTokenServer } from "@/lib/auth";

export default async function RootPage() {
  const token = await getTokenServer();

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
