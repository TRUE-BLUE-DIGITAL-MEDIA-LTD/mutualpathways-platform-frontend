import { API_URL }
  from '../../../lib/api';

  import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function Article6Page() {

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
          src="/images/art6.jpeg"
          alt="Focusing on What Truly Matters in a Relationship"

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
          Focusing on What Truly
          Matters in a Relationship
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            Every meaningful relationship
            is built on a foundation of
            shared priorities and mutual
            understanding.
          </p>

          <p>
            While small differences are
            natural, knowing what truly
            matters to you helps guide
            your choices and expectations.
          </p>

          <p>
            The first step is identifying
            your core values.
          </p>

          <p>
            These may include trust,
            honesty, respect,
            communication,
            or long-term goals.
          </p>

          <p>
            When these values align with
            your partner’s, the
            relationship tends to feel
            more stable and fulfilling.
          </p>

          <p>
            It is easy to get distracted
            by surface-level qualities,
            but long-term compatibility
            is shaped by deeper factors.
          </p>

          <p>
            How do you both handle
            challenges?
          </p>

          <p>
            Do you support each other’s
            growth?
          </p>

          <p>
            These questions often matter
            more than temporary attraction
            or convenience.
          </p>

          <p>
            Open discussions about
            priorities can prevent
            misunderstandings.
          </p>

          <p>
            Talking about expectations,
            boundaries, and future plans
            helps both people stay aligned.
          </p>

          <p>
            It also creates a sense of
            clarity and direction.
          </p>

          <p>
            Compromise is important,
            but it should not require
            sacrificing what is essential
            to you.
          </p>

          <p>
            Healthy relationships allow
            space for both individuals
            to maintain their values
            while finding common ground.
          </p>

          <p>
            Focusing on what truly matters
            helps avoid unnecessary
            conflicts and builds a
            stronger emotional connection.
          </p>

          <p>
            When both people understand
            and respect each other’s
            priorities, the relationship
            becomes more meaningful
            and lasting.
          </p>

        </div>

      </section>

      

    </main>
  );
}