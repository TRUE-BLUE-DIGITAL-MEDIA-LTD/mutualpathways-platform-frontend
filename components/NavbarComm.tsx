'use client';

export default function NavbarComm() {
  return (
    <header
      className="
        border-b
        border-zinc-800
        bg-black/95
        backdrop-blur
        sticky
        top-0
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          py-3
          flex
          items-center
          justify-center
          sm:justify-center
        "
      >
        <img
          src="/images/logo2.png"
          alt="MutualPathways"
          className="
            h-20
            md:h-24
            w-auto
            object-contain
          "
        />
      </div>
    </header>
  );
}