import { redirect } from "next/navigation";
import { getSessionServer } from "@/lib/auth";

export default async function RootPage() {
  const chatId = await getSessionServer();

  if (chatId) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
