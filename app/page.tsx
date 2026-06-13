import { API_URL }
  from '../lib/api';

  import Link from 'next/link';

import Navbar
  from '../components/Navbar';

export default function LandingPage() {

  const articles = [
    {
      title:
        'Getting to Know Each Other',

      image:
        '/images/art1.jpeg',

      href:
        '/articles/article1',
    },

    {
      title:
        'Healthy Relationships',

      image:
        '/images/art2.jpeg',

      href:
        '/articles/article2',
    },

    {
      title:
        'Communication Matters',

      image:
        '/images/art7.jpeg',

      href:
        '/articles/article7',
    },
  ];

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section className="
        relative
        overflow-hidden
        min-h-[85vh]
        flex
        items-center
      ">

        {/* OVERLAY */}

        <div className="
          absolute
          inset-0
          bg-black/70
          z-10
        " />

        {/* HERO IMAGE */}

        <img
          src="/images/hero.jpeg"

          alt="Hero"

          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-top
          "
        />

        {/* CONTENT */}

        <div className="
          relative
          z-20
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          py-24
          sm:py-32
          text-center
        ">

          <h1 className="
            text-4xl
            sm:text-6xl
            lg:text-7xl
            font-bold
            leading-tight
            mb-6
          ">
            Build Connections
            <br />
            That Truly Matter
          </h1>

          <p className="
            text-zinc-300
            text-base
            sm:text-xl
            lg:text-2xl
            max-w-3xl
            mx-auto
            leading-8
            mb-10
          ">
            Discover meaningful
            relationships,
            compatibility,
            friendship,
            and emotional connection
            through a thoughtful
            modern social platform.
          </p>

          {/* CTA BUTTONS */}

          <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
          ">

            <Link
              href="/discover"

              className="
                w-full
                sm:w-auto
                text-center
                bg-white
                text-black
                px-8
                py-4
                rounded-2xl
                font-bold
                text-base
                sm:text-lg
                hover:bg-zinc-200
                transition
              "
            >
              Open Platform
            </Link>

            <Link
              href="/articles"

              className="
                w-full
                sm:w-auto
                text-center
                border
                border-white
                px-8
                py-4
                rounded-2xl
                font-bold
                text-base
                sm:text-lg
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Explore Articles
            </Link>

          </div>

        </div>

      </section>

      {/* ARTICLES */}

      <section className="
        max-w-6xl
        mx-auto
        px-4
        sm:px-6
        py-20
        sm:py-24
      ">

        {/* SECTION HEADER */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-10
        ">

          <h2 className="
            text-3xl
            sm:text-4xl
            font-bold
          ">
            Featured Articles
          </h2>

          <Link
            href="/articles"

            className="
              text-zinc-400
              hover:text-white
              transition
            "
          >
            View all →
          </Link>

        </div>

        {/* ARTICLE GRID */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          sm:gap-6
        ">

          {
            articles.map(
              (article) => (

                <Link
                  key={article.title}

                  href={article.href}

                  className="
                    bg-zinc-900
                    rounded-3xl
                    overflow-hidden
                    border
                    border-zinc-800
                    hover:scale-[1.02]
                    transition
                    shadow-xl
                  "
                >

                  <div className="
                    h-[240px]
                    overflow-hidden
                    bg-zinc-800
                  ">

                    <img
                      src={article.image}

                      alt={article.title}

                      className="
                        w-full
                        h-full
                        object-cover
                        object-top
                      "
                    />

                  </div>

                  <div className="
                    p-5
                    sm:p-6
                  ">

                    <h3 className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      mb-3
                    ">
                      {article.title}
                    </h3>

                    <p className="
                      text-zinc-400
                      text-sm
                      sm:text-base
                    ">
                      Read article →
                    </p>

                  </div>

                </Link>
              ),
            )
          }

        </div>

      </section>

      {/* FOOTER */}

      <footer className="
        border-t
        border-zinc-800
      ">

        <div className="
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          py-10
          text-center
        ">

          <div className="
            flex
            flex-wrap
            justify-center
            gap-5
            sm:gap-6
            mb-6
            text-sm
            sm:text-base
          ">

            <Link
              href="/terms"

              className="
                hover:text-zinc-300
                transition
              "
            >
              Terms
            </Link>

            <Link
              href="/privacy"

              className="
                hover:text-zinc-300
                transition
              "
            >
              Privacy
            </Link>

            <Link
              href="/about"

              className="
                hover:text-zinc-300
                transition
              "
            >
              About
            </Link>

          </div>

          <p className="
            text-zinc-500
            text-sm
          ">
            Users 18+ only.
          </p>

          <p className="
            text-zinc-600
            text-xs
            sm:text-sm
            mt-2
            leading-6
          ">
            © 2026 MutualPathways.
            All Rights Reserved.
            Owned and Operated by
            True Blue Digital Media LTD.
          </p>

          {/* OPT-IN / OPT-OUT */}

          <div className="
            flex
            items-center
            justify-center
            gap-3
            mt-4
            text-xs
            text-zinc-500
          ">

            <Link
              href="/opt-in"

              className="
                hover:text-zinc-300
                transition
              "
            >
              Opt In
            </Link>

            <span className="text-zinc-700">
              ·
            </span>

            <Link
              href="/opt-out"

              className="
                hover:text-zinc-300
                transition
              "
            >
              Opt Out
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}