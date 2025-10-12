import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          {/* <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          /> */}
          <h1 className="hidden md:block text-6xl mt-[-150px] font-extrabold text-white text-center tracking-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.3)] transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-[0_6px_25px_rgba(255,255,255,0.5)]">
            ByteShelf
          </h1>



          <div className="space-y-5 text-white">
            <h1 className="h1">Simplify the way you manage your files</h1>
            <p className="body-1">
              Keep all your important documents organized, secure, and accessible in one place.
            </p>

          </div>
          {/* <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          /> */}
          
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <h1 className="lg:hidden block text-4xl mt-[-2px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r text-gray-800 text-center mt-20 tracking-tight drop-shadow-[0_4px_15px_rgba(124,58,237,0.3)] transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-[0_6px_25px_rgba(124,58,237,0.5)]">
              ByteShelf
          </h1>
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
