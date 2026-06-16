import { API_URL }
  from '../../../lib/api';

  import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function Article7Page() {

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
        max-w-4xl
        mx-auto
        px-6
        py-20
      ">

        <img
          src="/images/art7.jpeg"
          alt="The Importance of Staying Connected Through Open Communication"

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
          mb-12
          leading-tight
        ">
          The Importance of Staying
          Connected Through
          Open Communication
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            Communication is one of the
            most important elements of
            any relationship.
          </p>

          <p>
            Staying in touch and discussing
            thoughts openly helps prevent
            misunderstandings and
            strengthens emotional bonds.
          </p>

          <p>
            Silence, on the other hand,
            can create distance even when
            two people care about each
            other.
          </p>

          <p>
            Being in regular contact does
            not mean constant communication,
            but it does mean making an
            effort to stay connected.
          </p>

          <p>
            Simple check-ins,
            conversations,
            and shared moments help
            maintain closeness.
          </p>

          <p>
            Open communication allows
            both individuals to express
            their thoughts and feelings
            honestly.
          </p>

          <p>
            When people feel safe to
            speak openly, it creates
            trust and reduces the chances
            of unresolved issues building
            up over time.
          </p>

          <p>
            Avoiding difficult
            conversations may seem easier
            in the moment, but it often
            leads to bigger problems later.
          </p>

          <p>
            Addressing concerns early
            helps maintain clarity and
            prevents unnecessary tension.
          </p>

          <p>
            Listening is just as important
            as speaking.
          </p>

          <p>
            Understanding the other
            person’s perspective shows
            respect and strengthens the
            connection.
          </p>

          <p>
            It also makes problem-solving
            more effective.
          </p>

          <p>
            Healthy communication is not
            about winning arguments but
            about finding understanding.
          </p>

          <p>
            When both people are willing
            to talk and listen,
            the relationship becomes
            more balanced and supportive.
          </p>

          <p>
            Staying connected through
            open dialogue helps
            relationships grow stronger
            over time.
          </p>

          <p>
            It creates a space where
            both individuals feel heard,
            valued, and understood.
          </p>

        </div>

      </section>

      

    </main>
  );
}