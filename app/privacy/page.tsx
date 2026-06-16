import { API_URL } from "../../lib/api";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <img
          src="/images/hero.jpeg"
          alt="Privacy Policy"
          className="mb-12 w-full rounded-3xl object-cover object-top"
        />

        <h1 className="mb-12 text-5xl font-bold">Privacy Policy</h1>

        <div className="space-y-10 text-lg leading-9 text-zinc-300">
          <div>
            <p>
              <strong>Effective Date:</strong> January 1, 2026
            </p>

            <p>
              <strong>Last Updated:</strong> June 14, 2026
            </p>

            <p>
              <strong>Company Name:</strong> True Blue Digital Media LTD
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              1. Introduction
            </h2>

            <p>
              MutualPathways ("Company," "we," "us," or "our") is owned and
              operated by True Blue Digital Media LTD (registered in the United
              Kingdom).
            </p>

            <p>
              MutualPathways operates an online social and relationship platform
              designed to help adults build meaningful connections, friendships,
              companionship, and long-term relationships based on shared
              interests, compatibility, communication, and personal values
              (collectively, the "Services").
            </p>

            <p>
              Through our Services, users may create profiles, discover other
              members, communicate, express interest in potential matches, and
              participate in features intended to encourage respectful,
              authentic, and meaningful interactions and also read in
              interesting articles in our blog part.
            </p>

            <p>
              We are committed to protecting your privacy and handling your
              personal information transparently and in compliance with
              applicable data protection laws, including the GDPR, UK GDPR,
              CCPA/CPRA, and other applicable privacy laws.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              2. Information We Collect
            </h2>

            <h3 className="mb-3 text-2xl font-semibold text-white">
              A. Information You May Provide
            </h3>

            <p>
              Name, username, email address, account credentials, profile
              information, photographs, communications with other users,
              preferences, interests, relationship goals, and other information
              you voluntarily provide through the Services.
            </p>

            <h3 className="mt-8 mb-3 text-2xl font-semibold text-white">
              B. Automatically Collected Information
            </h3>

            <p>
              IP address, browser type, device information, operating system,
              referring URLs, pages viewed, time spent, advertising identifiers,
              cookie identifiers, and approximate location data.
            </p>

            <h3 className="mt-8 mb-3 text-2xl font-semibold text-white">
              C. Information from Third Parties
            </h3>

            <p>
              We may receive data from advertising partners, analytics
              providers, social media platforms, and legally permitted data
              providers.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              3. Cookies and Tracking Technologies
            </h2>

            <p>
              We use cookies, pixels, web beacons, and similar technologies to
              deliver targeted advertising, measure campaign performance,
              analyze traffic, personalize user experiences, and help maintain
              website functionality.
            </p>

            <p className="mt-6">
              <strong>Types of Cookies:</strong>
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>Strictly Necessary Cookies</li>

              <li>Performance / Analytics Cookies</li>

              <li>Functional Cookies</li>

              <li>Advertising / Targeting Cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              4. How We Use Information
            </h2>

            <p>
              We use information to provide and improve our Services, analyze
              website performance, deliver advertising content where applicable,
              communicate with users, comply with legal obligations, detect
              fraud, and enforce our agreements and policies.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              5. Legal Bases for Processing (GDPR)
            </h2>

            <p>
              We process personal data based on consent, contractual necessity,
              legal obligations, and legitimate interests such as website
              functionality, security, analytics, and service improvement.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              6. Sharing of Information
            </h2>

            <p>
              We may share information with trusted service providers, hosting
              providers, analytics providers, customer support providers,
              payment processors (if applicable), legal advisors, and
              governmental authorities when required by law.
            </p>

            <p>
              Information may also be shared with other users of the platform
              through profile features, matching functionality, messaging
              features, and other services designed to facilitate communication
              and meaningful connections between members.
            </p>

            <p>
              Our Services may contain links, recommendations, advertisements,
              sponsored content, or referrals to third-party websites,
              applications, or relationship platforms. When users choose to
              interact with or visit such third-party services, those providers
              may collect information in accordance with their own privacy
              policies and terms.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              7. Your Privacy Rights
            </h2>

            <h3 className="mb-3 text-2xl font-semibold text-white">
              GDPR Rights
            </h3>

            <p>
              Access, correction, deletion, restriction, portability, objection,
              withdrawal of consent, and the right to lodge complaints with
              supervisory authorities.
            </p>

            <h3 className="mt-8 mb-3 text-2xl font-semibold text-white">
              California Rights (CCPA/CPRA)
            </h3>

            <p>
              Right to know, delete, correct, opt out of sale or sharing of
              personal information, limit sensitive data use, and protection
              from discrimination when exercising privacy rights.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              8. Data Retention
            </h2>

            <p>
              We retain personal data only for as long as necessary to fulfill
              business purposes, comply with legal obligations, resolve
              disputes, and enforce agreements.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              9. Data Security
            </h2>

            <p>
              We implement administrative, technical, and physical safeguards
              including encryption, access controls, secure hosting
              infrastructure, and monitoring systems to protect personal
              information.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              10. Email Communications
            </h2>

            <p>
              Users may choose to subscribe to newsletters, platform updates,
              promotional messages, and marketing communications. Marketing
              emails are optional and require user consent.
            </p>

            <p>
              Users may unsubscribe from marketing communications at any time by
              clicking the unsubscribe link included in our emails or by
              contacting us at: contact@mutual-pathways.com
            </p>

            <p>
              Transactional emails related to account security, password resets,
              account verification, and important service notifications may
              still be sent when necessary.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              11. Children's Privacy
            </h2>

            <p>
              Our Services are not directed to individuals under the age of 18.
            </p>

            <p>
              We do not knowingly collect personal information from children
              without appropriate parental or guardian consent.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              12. Changes to This Policy
            </h2>

            <p>We may update this Privacy Policy from time to time.</p>

            <p>
              Any updates will be reflected by revising the "Last Updated" date
              above.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              13. Contact Information
            </h2>

            <p>Email: contact@mutual-pathways.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
