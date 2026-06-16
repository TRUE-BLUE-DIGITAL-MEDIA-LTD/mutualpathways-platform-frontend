import { API_URL } from "../../lib/api";

import Navbar from "../../components/Navbar";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <link rel="stylesheet" href="/legacy/landing.css" />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <img
          src="/images/hero.jpeg"
          alt="Contact Us"
          className="mb-12 w-full rounded-3xl object-cover"
        />

        <h1 className="mb-12 text-5xl font-bold">Contact Us</h1>

        <div className="space-y-10 text-lg leading-9 text-zinc-300">
          <div>
            <p>We are here to help.</p>

            <p>
              If you have questions about your account, profile, privacy,
              platform features, technical issues, or any other matter related
              to MutualPathways, please contact our team.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Contact Information
            </h2>

            <p>
              Email: <strong>contact@mutual-pathways.com</strong>
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Opt-Out Requests
            </h2>

            <p>
              If you no longer wish to receive marketing or promotional emails,
              you may unsubscribe using the unsubscribe link included in our
              emails or contact us at:
            </p>

            <p>
              <strong>contact@mutual-pathways.com</strong>
            </p>

            <p>
              We will process opt-out requests as soon as reasonably possible.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Response Time
            </h2>

            <p>We aim to respond to all inquiries within 2–3 business days.</p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Support Topics
            </h2>

            <p>You may contact us regarding:</p>

            <ul className="list-disc space-y-3 pl-8">
              <li>Account assistance</li>

              <li>Password or login issues</li>

              <li>Privacy-related requests</li>

              <li>Technical support</li>

              <li>Platform feedback</li>

              <li>General questions</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Company Information
            </h2>

            <p>MutualPathways is operated by True Blue Digital Media LTD.</p>
          </div>

          <div>
            <p>Thank you for being part of the MutualPathways community.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
