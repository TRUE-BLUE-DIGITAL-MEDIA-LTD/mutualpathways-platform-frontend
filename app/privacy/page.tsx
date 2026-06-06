import { API_URL }
  from '../../lib/api';


import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function PrivacyPage() {

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
          alt="Privacy Policy"

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
        ">
          Privacy Policy
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
              1. Introduction
            </h2>

            <p>
              MutualPathways
              ("Company," "we," "us,"
              or "our") is owned and
              operated by True Blue
              Digital Media LTD
              (registered in the
              United Kingdom).
            </p>

            <p>
              Company operates as a blog
              with articles, insights,
              opinions, and points of
              view related to building
              relationships, meaningful
              connections, friendship,
              personality matches,
              and related topics
              (collectively,
              the "Services").
            </p>

            <p>
              We are committed to
              protecting your privacy
              and handling your personal
              information transparently
              and in compliance with
              applicable data protection
              laws, including the GDPR,
              UK GDPR, CCPA/CPRA,
              and other applicable
              privacy laws.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              2. Information We Collect
            </h2>

            <h3 className="
              text-2xl
              font-semibold
              mb-3
              text-white
            ">
              A. Information You May Provide
            </h3>

            <p>
              Name, email address,
              company name,
              phone number,
              account credentials,
              communications,
              and other information
              you choose to provide.
            </p>

            <h3 className="
              text-2xl
              font-semibold
              mt-8
              mb-3
              text-white
            ">
              B. Automatically Collected Information
            </h3>

            <p>
              IP address, browser type,
              device information,
              operating system,
              referring URLs,
              pages viewed,
              time spent,
              advertising identifiers,
              cookie identifiers,
              and approximate
              location data.
            </p>

            <h3 className="
              text-2xl
              font-semibold
              mt-8
              mb-3
              text-white
            ">
              C. Information from Third Parties
            </h3>

            <p>
              We may receive data from
              advertising partners,
              analytics providers,
              social media platforms,
              and legally permitted
              data providers.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              3. Cookies and Tracking Technologies
            </h2>

            <p>
              We use cookies, pixels,
              web beacons,
              and similar technologies
              to deliver targeted
              advertising,
              measure campaign
              performance,
              analyze traffic,
              personalize user
              experiences,
              and help maintain
              website functionality.
            </p>

            <p className="mt-6">
              <strong>
                Types of Cookies:
              </strong>
            </p>

            <ul className="
              list-disc
              pl-8
              mt-4
              space-y-2
            ">

              <li>
                Strictly Necessary Cookies
              </li>

              <li>
                Performance / Analytics Cookies
              </li>

              <li>
                Functional Cookies
              </li>

              <li>
                Advertising / Targeting Cookies
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
              4. How We Use Information
            </h2>

            <p>
              We use information to
              provide and improve
              our Services,
              analyze website
              performance,
              deliver advertising
              content where applicable,
              communicate with users,
              comply with legal
              obligations,
              detect fraud,
              and enforce our agreements
              and policies.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              5. Legal Bases for Processing (GDPR)
            </h2>

            <p>
              We process personal data
              based on consent,
              contractual necessity,
              legal obligations,
              and legitimate interests
              such as website
              functionality,
              security,
              analytics,
              and service improvement.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              6. Sharing of Information
            </h2>

            <p>
              We may share information
              with analytics providers,
              hosting providers,
              advertising partners,
              service providers,
              affiliates,
              legal advisors,
              and authorities where
              legally required.
            </p>

            <p>
              Certain advertising-related
              sharing may qualify as
              "sale" or "sharing"
              under CCPA/CPRA definitions.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              7. Your Privacy Rights
            </h2>

            <h3 className="
              text-2xl
              font-semibold
              mb-3
              text-white
            ">
              GDPR Rights
            </h3>

            <p>
              Access, correction,
              deletion, restriction,
              portability, objection,
              withdrawal of consent,
              and the right to lodge
              complaints with
              supervisory authorities.
            </p>

            <h3 className="
              text-2xl
              font-semibold
              mt-8
              mb-3
              text-white
            ">
              California Rights (CCPA/CPRA)
            </h3>

            <p>
              Right to know,
              delete, correct,
              opt out of sale or sharing
              of personal information,
              limit sensitive data use,
              and protection from
              discrimination when
              exercising privacy rights.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              8. Data Retention
            </h2>

            <p>
              We retain personal data
              only for as long as
              necessary to fulfill
              business purposes,
              comply with legal
              obligations,
              resolve disputes,
              and enforce agreements.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              9. Data Security
            </h2>

            <p>
              We implement administrative,
              technical,
              and physical safeguards
              including encryption,
              access controls,
              secure hosting
              infrastructure,
              and monitoring systems
              to protect personal
              information.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              10. Children's Privacy
            </h2>

            <p>
              Our Services are not
              directed to individuals
              under the age of 18.
            </p>

            <p>
              We do not knowingly collect
              personal information from
              children without appropriate
              parental or guardian consent.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              11. Changes to This Policy
            </h2>

            <p>
              We may update this
              Privacy Policy from
              time to time.
            </p>

            <p>
              Any updates will be
              reflected by revising
              the "Last Updated"
              date above.
            </p>

          </div>

          <div>

            <h2 className="
              text-3xl
              font-bold
              mb-4
              text-white
            ">
              12. Contact Information
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