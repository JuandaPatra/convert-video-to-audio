import Header from "@/components/layout/Header";
import UploadDropzone from "@/components/uploads/UploadDropzone";

export  default function ConvertPage() {
  return (
    <>
    <Header />
    <main className="min-h-screen flex flex-col items-center py-8 px-4 relative max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">Convert Page</h1>

      <UploadDropzone />
      
    </main>
    </>
  );
}