import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="vip-page  min-h-screen pb-10">
      <h1 className="font-bold text-2xl lg:text-3xl bg-yellow-500 text-black w-fit mx-auto px-4 py-2 rounded-md my-10">
        PRIVACY POLICY
      </h1>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 space-y-8 text-left text-white">
        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Introduction
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            website and services. By using our platform, you agree to the terms
            outlined in this policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-gray-400">
            <li>
              Personal details you provide such as name, email, and contact
              information.
            </li>
            <li>Account-related information for authentication and access.</li>
            <li>
              Usage data including browser type, IP address, and device
              information.
            </li>
            <li>
              Cookies and similar technologies for improving user experience.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            How We Use Your Information
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-gray-400">
            <li>Provide, improve, and personalize our services.</li>
            <li>Communicate with you about updates, offers, and support.</li>
            <li>Ensure security, prevent fraud, and monitor service usage.</li>
            <li>Comply with legal obligations when required.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Data Protection
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. However, please note that no method of transmission
            over the Internet is completely secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Sharing of Information
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We do not sell or trade your personal data. We may share your
            information with trusted third parties only when necessary to
            provide our services, comply with legal requirements, or protect our
            rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Your Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-gray-400">
            <li>Access and review the information we hold about you.</li>
            <li>Request corrections or updates to your personal data.</li>
            <li>Opt-out of receiving promotional communications.</li>
            <li>
              Request deletion of your account and data, subject to legal
              obligations.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Changes to This Policy
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. Any updates
            will be reflected on this page, and significant changes will be
            notified to you directly if applicable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Contact Us
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at{" "}
            <span className="text-yellow-400 font-medium">
              support@example.com
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
