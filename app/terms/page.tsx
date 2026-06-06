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
              January 1, 2026
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
              We publish blog articles,
              insights, opinions,
              and points of view related
              to building relationships,
              meaningful connections,
              friendship,
              personality matches,
              and related topics.
            </p>

            <p>
              All content provided on
              our blog is intended for
              informational and
              entertainment purposes only
              and may reflect our
              perspectives, analysis,
              or commentary.
            </p>

            <p>
              The views expressed in
              our articles represent
              our opinions and are not
              intended to constitute
              formal professional,
              legal, or financial advice
              unless explicitly stated
              otherwise.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              4. Advertising Content
            </h2>

            <p>
              You represent that you
              have all necessary rights
              to submitted content and
              that it complies with
              applicable advertising laws.
            </p>

            <p>
              We may reject or remove
              content at our discretion.
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
              Our blog may contain
              advertising,
              sponsored content,
              promotional materials,
              or paid placements.
            </p>

            <p>
              Such advertising may be
              displayed in various formats,
              including banners,
              native ads,
              affiliate links,
              or sponsored articles.
            </p>

            <p>
              This means that when you
              click on such advertising
              we may receive a small
              commission at no additional
              cost to you.
            </p>

            <p>
              This financial relationship
              does not influence our
              content, reviews,
              or recommendations.
            </p>

            <p>
              By accessing and using
              our blog,
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
              We may integrate
              third-party services.
            </p>

            <p>
              We are not responsible for
              their content or practices.
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
              contact@mutualpathways.com
            </p>

          </div>

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