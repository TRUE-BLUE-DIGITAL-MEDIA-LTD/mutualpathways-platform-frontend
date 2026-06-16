import { API_URL }
  from '../../lib/api';


import Link from 'next/link';

import Navbar
  from '../../components/Navbar';

export default function TermsPage() {

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

      <Navbar />

      <link
        rel="stylesheet"
        href="/legacy/landing.css"
      />

      <section className="
        max-w-5xl
        mx-auto
        px-6
        py-20
      ">

        <img
          src="/images/hero.jpeg"
          alt="Terms of Service"

          className="
            w-full
            rounded-3xl
            mb-12
            object-cover
          "
        />

        <h1 className="
          text-5xl
          font-bold
          mb-12
        ">
          Terms of Service
        </h1>

        <div className="
          text-zinc-300
          text-lg
          leading-9
          space-y-10
        ">

          <div>

            <p>
              <strong>
                Effective Date:
              </strong>
              {' '}
              January 1, 2026
            </p>

            <p>
              <strong>
                Last Updated:
              </strong>
              {' '}
              June 14, 2026
            </p>

            <p>
              <strong>
                Company Name:
              </strong>
              {' '}
              True Blue Digital Media LTD
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing or using
              MutualPathways and its
              services ("Services"),
              you agree to be bound by
              these Terms.
            </p>

            <p>
              If you do not agree,
              you must discontinue
              use immediately.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              2. Eligibility
            </h2>

            <p>
              You must be at least
              18 years old and have
              legal capacity to enter
              into binding agreements.
            </p>

          </div>

          <div>

  <h2 className="
    text-3xl
    font-bold
    mb-4
    text-white
  ">
    3. Description of Services
  </h2>

  <p>
    MutualPathways operates an online
    social and relationship platform
    designed to help adults build
    meaningful connections,
    friendships, companionship,
    and long-term relationships.
  </p>

  <p>
    Users may create profiles,
    discover other members,
    communicate through platform
    features, express interest in
    potential matches, and access
    other tools and services intended
    to facilitate respectful and
    authentic interactions.
  </p>

  <p>
    We may also provide educational
    content, articles, insights,
    recommendations, and other
    relationship-related information
    for informational purposes.
  </p>

</div>


          <div>

  <h2 className="
    text-3xl
    font-bold
    mb-4
    text-white
  ">
    4. User Content and Conduct
  </h2>

  <p>
    Users are responsible for the
    content they submit, publish,
    upload, or share through the
    Services.
  </p>

  <p>
    You represent that any content
    you provide is accurate, lawful,
    and does not violate the rights
    of any third party.
  </p>

  <p>
    We reserve the right to remove,
    restrict, or moderate content
    that violates these Terms,
    applicable laws, or our
    community standards.
  </p>

</div>


          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              5. Affiliate Disclosure
            </h2>

            <p>
  MutualPathways may contain
  advertisements, sponsored content,
  affiliate links, promotional
  materials, or referrals to
  third-party websites and services.
</p>

<p>
  We may receive compensation when
  users click on certain links,
  register with third-party services,
  or engage with promoted offers.
</p>

<p>
  Any relationship between
  MutualPathways and third-party
  partners does not constitute an
  endorsement or guarantee of those
  services.
</p>


            <p>
              By accessing and using
              our platform,
              you acknowledge and agree
              that the website may include
              both editorial content and
              advertising materials.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              6. Intellectual Property
            </h2>

            <p>
              All website content,
              software,
              trademarks,
              and materials remain the
              property of MutualPathways
              or its licensors.
            </p>

            <p>
              You are granted a limited,
              non-exclusive license to
              use the Services.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              7. Prohibited Conduct
            </h2>

            <ul className="
              list-disc
              pl-8
              space-y-3
            ">

              <li>
                Violating laws or regulations
              </li>

              <li>
                Interfering with site security
              </li>

              <li>
                Using automated scraping tools
              </li>

              <li>
                Submitting fraudulent traffic
                or engaging in click fraud
              </li>

              <li>
                Circumventing tracking or
                measurement systems
              </li>

            </ul>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              8. Data Protection
            </h2>

            <p>
              Your use of the Services
              is governed by our
              Privacy Policy.
            </p>

          </div>

          <div>

  <h2 className="
    text-3xl
    font-bold
    mb-4
    text-white
  ">
    9. Third-Party Services
  </h2>

  <p>
    The Services may contain links,
    advertisements, affiliate links,
    sponsored content, promotional
    materials, or referrals to
    third-party websites,
    applications, products,
    or services.
  </p>

  <p>
    We may receive compensation when
    users interact with certain
    third-party offers or services.
  </p>

  <p>
    We are not responsible for the
    content, policies, practices,
    availability, or security of
    third-party services.
  </p>

  <p>
    Your interactions with any
    third-party service are governed
    by that provider's own terms
    and privacy policies.
  </p>

</div>


          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              10. Disclaimer of Warranties
            </h2>

            <p>
              The Services are provided
              "as is" and "as available"
              without warranties of any kind,
              including merchantability,
              fitness for a particular
              purpose,
              or non-infringement.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              11. Indemnification
            </h2>

            <p>
              You agree to indemnify
              and hold harmless
              MutualPathways from claims
              arising from your content,
              violations of these Terms,
              or violations of law.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              12. Governing Law
            </h2>

            <p>
              These Terms are governed
              by applicable laws of the
              jurisdiction in which
              MutualPathways operates.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              13. Changes to Terms
            </h2>

            <p>
              We may update these Terms
              at any time.
            </p>

            <p>
              Continued use of the
              Services constitutes
              acceptance of the
              updated Terms.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              14. Contact Information
            </h2>

            <p>
              Email:
              {' '}
              contact@mutual-pathways.com
            </p>

          </div>

        </div>

      </section>

     

    </main>
  );
}