import Hero from "@/components/Hero";
{/*use UploadFile for predict*/}
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()

  if(await isAuthenticated()) {
      return redirect('/dashboard')
  }
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] ">
      <Hero />
    </div>
  );
}
