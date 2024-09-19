import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warcaby",
  description: "To coś zostało zrobione przez Karoline Michała",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const boardSides = {
    alphabetical:"ABCDEFGH",
    numbers:"12345678"
  }
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="flex justify-center items-center min-h-screen bg-radial-bottom overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-[120%] rotate-[-45deg] ">
            {Array.from({length:30}).map((e:any,inde:number)=>{
              return <div key={inde} className="star"></div>
            })}
        </div>
          <div className="fixed top-0 left-2/4 w-full h-[120%] rotate-[-45deg] ">
            {Array.from({length:30}).map((e:any,inde:number)=>{
                return <div key={inde} className="star"></div>
            })}
        </div>
          <div className="flex absolute top-8 left-0 h-screen overflow-hidden items-center justify-center w-screen">
            {children}
        </div>
      </body>
    </html>
  );
}
