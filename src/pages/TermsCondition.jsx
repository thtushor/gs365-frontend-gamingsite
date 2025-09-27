import React from "react";

const TermsCondition = () => {
  return (
    <div className="vip-page   min-h-screen pb-10">
      <h1 className="font-bold text-2xl lg:text-3xl bg-yellow-500 text-black w-fit mx-auto px-4 py-2 rounded-md my-10">
        TERMS & CONDITIONS
      </h1>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 space-y-8 text-left text-white">
        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Introduction
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            Welcome to our platform. By accessing or using our services, you
            agree to comply with and be bound by the following Terms &
            Conditions. Please read them carefully before using our website or
            services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Use of Services
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. Any misuse, unauthorized access, or
            attempt to disrupt our systems is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            User Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-gray-400">
            <li>
              You are responsible for maintaining the confidentiality of your
              account.
            </li>
            <li>You agree to provide accurate and up-to-date information.</li>
            <li>You must not engage in fraudulent or harmful activities.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Intellectual Property
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            All content, trademarks, and materials provided on this website are
            the intellectual property of our company. You may not reproduce,
            distribute, or modify any content without prior written consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Limitation of Liability
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We are not liable for any indirect, incidental, or consequential
            damages arising from the use or inability to use our services. Your
            use of our platform is at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Changes to Terms
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We may update these Terms & Conditions from time to time. Any
            changes will be posted on this page with the updated date. It is
            your responsibility to review the terms regularly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Contact Us
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            If you have any questions or concerns about these Terms &
            Conditions, please contact us at{" "}
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

export default TermsCondition;
