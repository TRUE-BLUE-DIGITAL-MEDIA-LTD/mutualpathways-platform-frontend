import { API_URL }
  from '../../../lib/api';

  import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function Article3Page() {

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
          src="/images/art3.jpeg"
          alt="Finding the Right Balance"

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
          Finding the Right Balance:
          Understanding What Feels
          Okay in a Relationship
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            Maintaining balance in a
            relationship often means
            understanding the difference
            between what feels comfortable
            and what does not.
          </p>

          <p>
            Every relationship involves
            negotiation, compromise,
            and mutual respect.
          </p>

          <p>
            When both people are aware
            of their limits and
            expectations, it becomes
            easier to maintain a
            healthy dynamic.
          </p>

          <p>
            A good starting point is
            recognizing your own feelings.
            If something consistently
            makes you uncomfortable,
            confused, or pressured,
            it is worth paying attention
            to those signals.
          </p>

          <p>
            Your emotional responses can
            help guide you toward what
            feels right and what may
            need to change.
          </p>

          <p>
            Honest communication is one
            of the simplest ways to
            maintain balance.
          </p>

          <p>
            Talking openly about
            expectations, habits,
            and preferences helps
            prevent misunderstandings
            before they grow into
            larger problems.
          </p>

          <p>
            Even small conversations can
            make a significant difference
            in how both people feel
            within the relationship.
          </p>

          <p>
            Another important factor is
            mutual respect.
          </p>

          <p>
            Healthy relationships allow
            space for disagreement without
            turning conflicts into
            personal attacks.
          </p>

          <p>
            Being able to express
            different opinions calmly
            shows maturity and strengthens
            trust between both individuals.
          </p>

          <p>
            Consistency also helps
            maintain balance.
          </p>

          <p>
            When actions match words,
            people feel more secure and
            confident in the relationship.
          </p>

          <p>
            Predictable behavior builds
            trust and reduces uncertainty
            about each other’s intentions.
          </p>

          <p>
            It is equally important to
            observe how effort is shared.
          </p>

          <p>
            Balanced relationships usually
            involve both individuals
            contributing time, attention,
            and care.
          </p>

          <p>
            When responsibility and
            emotional investment are
            shared, neither person feels
            overwhelmed or neglected.
          </p>

          <p>
            Respecting personal time and
            independence also contributes
            to balance.
          </p>

          <p>
            Having space to pursue
            personal interests,
            friendships, and individual
            goals helps maintain a healthy
            sense of identity within
            the relationship.
          </p>

          <p>
            Lastly, relationships benefit
            from regular reflection.
          </p>

          <p>
            Taking time to evaluate how
            both people feel can help
            identify areas that may
            need improvement.
          </p>

          <p>
            Healthy relationships evolve
            through communication,
            patience, and mutual
            understanding.
          </p>

          <p>
            When both individuals remain
            attentive to what feels
            “okay” and what does not,
            they create a stronger,
            more respectful partnership
            built on trust and balance.
          </p>

        </div>

      </section>

    

    </main>
  );
}