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
    At MutualPathways, we believe
    meaningful relationships are
    built on more than appearances
    or first impressions. Lasting
    connections grow through shared
    values, mutual respect, genuine
    communication, and a desire to
    understand one another.
  </p>

  <p>
    Our platform was created to help
    people discover compatible
    connections in an environment
    that encourages authenticity and
    meaningful interaction. We
    believe the strongest
    relationships begin when people
    feel comfortable being
    themselves and communicating
    openly.
  </p>

  <p>
    Trust is at the heart of every
    successful connection. By
    fostering honest conversations
    and encouraging respectful
    interactions, we aim to create a
    space where members can build
    confidence, form genuine bonds,
    and explore relationships with
    intention.
  </p>

  <p>
    We also recognize the importance
    of compatibility beyond
    surface-level attraction.
    Shared goals, common interests,
    life values, and emotional
    understanding often play an
    important role in creating
    fulfilling and lasting
    relationships.
  </p>

  <p>
    Respect, empathy, and
    reliability are principles we
    value highly. Whether someone is
    looking for friendship,
    companionship, or a long-term
    relationship, we believe every
    interaction should be based on
    kindness, consideration, and
    mutual understanding.
  </p>

  <p>
    At MutualPathways, our goal is
    simple: to provide a welcoming
    platform where people can create
    meaningful connections, build
    trust, and explore relationships
    that have the potential to grow
    into something truly lasting.
  </p>

  <p>
    Thank you for being part of our
    community.
  </p>

</div>

      </section>

      

    </main>
  );
}