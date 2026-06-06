import { API_URL }
  from '../../lib/api';

  import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function AboutPage() {

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
        max-w-5xl
        mx-auto
        px-6
        py-20
      ">

        <img
          src="/images/hero.jpeg"
          alt="About MutualPathways"
          className="
            w-full
            rounded-3xl
            mb-12
            object-cover
            object-top
          "
        />

        <h1 className="
          text-5xl
          font-bold
          mb-10
        ">
          About Us
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            We aim to focus on the things
            that truly matter when it comes
            to relationships. Creating
            meaningful connections starts
            with valuing authenticity,
            trust, and respect between
            people.
          </p>

          <p>
            Instead of trying to impress
            others or appear perfect,
            it is often more important
            to be honest and genuine
            in how you communicate.
            When people feel that someone
            is sincere, it naturally builds
            comfort and encourages open
            conversation.
          </p>

          <p>
            Taking the time to truly listen
            is a key part of forming strong
            connections. Giving someone
            your full attention shows that
            their thoughts, feelings, and
            experiences are important.
            Over time, this kind of
            attentiveness helps create
            a deeper sense of understanding.
          </p>

          <p>
            Reliability also plays an
            important role. Trust develops
            when actions are consistent and
            promises are kept. Often, it is
            not the large gestures that
            matter most, but the small,
            thoughtful actions that
            demonstrate care and
            consideration.
          </p>

          <p>
            Clear and respectful
            communication helps avoid
            confusion and strengthens the
            relationship. At the same time,
            recognizing and respecting
            personal boundaries allows both
            people to feel safe and valued.
          </p>

          <p>
            When individuals invest
            patience, empathy, and effort
            into their interactions,
            connections can grow naturally.
          </p>

          <p>
            By concentrating on these
            essential principles,
            relationships have the
            opportunity to become stronger,
            more meaningful, and lasting.
          </p>

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