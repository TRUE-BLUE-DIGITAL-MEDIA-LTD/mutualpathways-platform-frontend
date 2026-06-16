import { API_URL }
  from '../../../lib/api';

  import Link from 'next/link';
import Navbar from '../../../components/Navbar';

export default function Article2Page() {

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
          src="/images/art2.jpeg"
          alt="Respecting Yourself While Building Healthy Relationships"

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
          Respecting Yourself While
          Building Healthy Relationships
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-8
        ">

          <p>
            Creating respectful
            relationships begins with
            understanding and protecting
            your own boundaries.
          </p>

          <p>
            While connection with others
            is important, it should never
            come at the cost of your
            comfort, values, or emotional
            well-being.
          </p>

          <p>
            Healthy relationships allow
            both individuals to feel
            respected, heard, and free
            to express themselves without
            pressure or fear.
          </p>

          <p>
            One of the first steps is
            becoming aware of your personal
            limits. Everyone has different
            boundaries when it comes to
            time, communication, personal
            space, and emotional
            involvement.
          </p>

          <p>
            Knowing what feels comfortable
            for you helps prevent situations
            where you might feel overwhelmed
            or taken for granted.
          </p>

          <p>
            Clear communication plays a
            major role in maintaining
            these boundaries. Expressing
            your needs calmly and
            respectfully allows the other
            person to understand where
            you stand.
          </p>

          <p>
            Many misunderstandings in
            relationships happen simply
            because expectations were
            never clearly discussed.
          </p>

          <p>
            Respectful relationships also
            involve mutual understanding.
            Just as you want your boundaries
            respected, it is equally
            important to acknowledge the
            limits and preferences of the
            other person.
          </p>

          <p>
            This balance creates a space
            where both people can feel
            secure and valued.
          </p>

          <p>
            Learning to say “no” when
            something does not feel right
            is another important skill.
            Saying no does not mean
            rejecting the relationship;
            it simply means protecting
            your own well-being.
          </p>

          <p>
            People who respect you will
            understand and appreciate
            your honesty.
          </p>

          <p>
            It is also helpful to pay
            attention to how interactions
            make you feel. Healthy
            relationships generally bring
            a sense of support, comfort,
            and encouragement.
          </p>

          <p>
            If a situation repeatedly
            causes stress or discomfort,
            it may be a signal that
            boundaries need to be adjusted.
          </p>

          <p>
            Maintaining personal
            independence is equally
            important. Keeping your own
            interests, friendships,
            and goals ensures that a
            relationship remains balanced
            rather than overwhelming.
          </p>

          <p>
            When both individuals maintain
            their individuality, the
            relationship becomes healthier
            and more sustainable.
          </p>

          <p>
            Ultimately, respectful
            relationships grow when both
            people feel free to be
            themselves while honoring
            each other’s boundaries.
          </p>

          <p>
            By communicating openly and
            staying true to your values,
            you can build connections
            that are supportive,
            balanced, and long-lasting.
          </p>

        </div>

      </section>

      
    </main>
  );
}