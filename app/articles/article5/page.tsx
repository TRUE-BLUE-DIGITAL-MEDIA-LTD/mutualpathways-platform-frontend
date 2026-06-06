import { API_URL }
  from '../../../lib/api';

  import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function Article5Page() {

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
          src="/images/art5.jpeg"
          alt="Choosing the Right People"

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
          Choosing the Right People:
          Recognizing Intentions
          and Noticing Red Flags
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            Finding the right people to
            connect with starts by paying
            attention to what they truly
            want.
          </p>

          <p>
            When someone is clear about
            their intentions — whether in
            friendship or a romantic
            relationship — it creates a
            sense of stability and
            direction.
          </p>

          <p>
            On the other hand, uncertainty
            or mixed signals can often lead
            to confusion and unnecessary
            emotional strain.
          </p>

          <p>
            One of the most important early
            steps is observing consistency.
          </p>

          <p>
            Do their words match their
            actions?
          </p>

          <p>
            Someone who genuinely values
            connection will show it through
            reliability and effort.
          </p>

          <p>
            In contrast, inconsistency can
            be one of the first warning
            signs.
          </p>

          <p>
            Red flags are not always
            dramatic; they are often subtle.
          </p>

          <p>
            Avoiding communication,
            dismissing your feelings,
            or showing a lack of respect
            for boundaries are all signs
            worth paying attention to.
          </p>

          <p>
            These behaviors may seem small
            at first, but they can grow
            into larger issues over time.
          </p>

          <p>
            It is also important to notice
            how someone handles
            responsibility.
          </p>

          <p>
            People who take accountability
            for their actions tend to build
            healthier relationships.
          </p>

          <p>
            Blaming others or avoiding
            responsibility can signal
            emotional immaturity.
          </p>

          <p>
            Trusting your instincts plays
            a key role.
          </p>

          <p>
            If something feels off,
            it is worth reflecting on why.
          </p>

          <p>
            Intuition is often based on
            small patterns that we
            subconsciously recognize.
          </p>

          <p>
            Choosing the right people is
            not about perfection but about
            alignment.
          </p>

          <p>
            When intentions, values,
            and behavior are consistent,
            it becomes easier to build a
            connection that feels secure
            and respectful.
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