import { API_URL }
  from '../../lib/api';

  import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function ArticlesPage() {

  const articles = [
    {
      slug: 'article1',
      image: '/images/art1.jpeg',
      title:
        'The First Steps Toward Getting to Know Each Other',
      description:
        'A gradual process is what transforms simple introductions into genuine connections.',
    },

    {
      slug: 'article2',
      image: '/images/art2.jpeg',
      title:
        'Respecting Yourself While Building Healthy Relationships',
      description:
        'Keep caring for yourself and for your partner.',
    },

    {
      slug: 'article3',
      image: '/images/art3.jpeg',
      title:
        'Finding the Right Balance: Understanding What Feels Okay in a Relationship',
      description:
        'Love rooted in respect and intention.',
    },

    {
      slug: 'article4',
      image: '/images/art4.jpeg',
      title:
        'Staying Open to New Connections While Remaining Mindful',
      description:
        'Creating opportunities for meaningful connections.',
    },

    {
      slug: 'article5',
      image: '/images/art5.jpeg',
      title:
        'Choosing the Right People: Recognizing Intentions and Noticing Red Flags',
      description:
        `It's something not about perfection but about alignment.`,
    },

    {
      slug: 'article6',
      image: '/images/art6.jpeg',
      title:
        'Focusing on What Truly Matters in a Relationship',
      description:
        'Explore things that truly matter.',
    },

    {
      slug: 'article7',
      image: '/images/art7.jpeg',
      title:
        'The Importance of Staying Connected Through Open Communication',
      description:
        'Always keep staying connected with your partner.',
    },
  ];

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      <Navbar />

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-20
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-14
        ">
          Articles
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {
            articles.map((article) => (

              <div
                key={article.slug}

                className="
                  bg-zinc-900
                  rounded-3xl
                  overflow-hidden
                  border
                  border-zinc-800
                  hover:scale-[1.02]
                  transition
                "
              >

                <img
                  src={article.image}
                  alt={article.title}

                  className="
                    w-full
                    h-60
                    object-cover
                    object-top
                  "
                />

                <div className="p-6">

                  <h3 className="
                    text-2xl
                    font-bold
                    mb-4
                    leading-tight
                  ">
                    {article.title}
                  </h3>

                  <p className="
                    text-zinc-400
                    mb-6
                    leading-7
                  ">
                    {article.description}
                  </p>

                  <Link
                    href={`/articles/${article.slug}`}

                    className="
                      inline-block
                      bg-white
                      text-black
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-zinc-200
                      transition
                    "
                  >
                    Read Article
                  </Link>

                </div>

              </div>
            ))
          }

        </div>

      </section>

      <footer className="
        border-t
        border-zinc-800
        mt-20
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-10
          text-center
          text-zinc-400
        ">

          <div className="
            flex
            justify-center
            gap-6
            mb-6
            flex-wrap
          ">

            <Link href="/terms">
              Terms of Service
            </Link>

            <Link href="/privacy">
              Privacy Policy
            </Link>

          </div>

          <p className="mb-2">
            Users 18+ only.
          </p>

          <p>
            © 2026 MutualPathways.
            All Rights Reserved.
            Owned and operated by
            True Blue Digital Media LTD
          </p>

        </div>

      </footer>

    </main>
  );
}