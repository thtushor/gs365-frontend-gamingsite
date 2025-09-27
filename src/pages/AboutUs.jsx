import React from "react";

const AboutUs = () => {
  return (
    <div className="vip-page min-h-screen pb-10">
      <h1 className="font-bold text-2xl lg:text-3xl bg-yellow-500 text-black w-fit mx-auto px-4 py-2 rounded-md my-10">
        ABOUT US
      </h1>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 space-y-8 text-left text-white">
        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Who We Are
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We are a team of passionate professionals dedicated to building
            high-quality digital products. Our mission is to simplify technology
            for everyone and help businesses grow with creative solutions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            What We Do
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            From web development and mobile applications to digital marketing
            and branding, we provide end-to-end solutions tailored to meet your
            unique needs. Our focus is on delivering modern, scalable, and
            user-friendly experiences.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Our Vision
          </h2>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            We believe in innovation, collaboration, and excellence. Our vision
            is to become a trusted partner for businesses worldwide, helping
            them achieve success through technology-driven strategies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Why Choose Us
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg text-gray-400">
            <li>Experienced and skilled professionals</li>
            <li>Customer-first approach</li>
            <li>Transparent process and timely delivery</li>
            <li>Innovative and future-ready solutions</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
