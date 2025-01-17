import Hero from "@/components/Hero";
import UploadFile from "@/components/UploadFile";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center ">
      <Hero />
      <UploadFile />
    </div>
  );
}
