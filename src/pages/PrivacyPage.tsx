import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none dark:prose-invert">
        <p className="mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal data, your privacy rights, and how the law protects you.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
          <p>
            We collect and process your personal data only when necessary for providing our services. The types of data we collect may include:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>Contact information (name, email, phone number)</li>
            <li>Usage data and analytics</li>
            <li>Communication preferences</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p>
            Your data is used strictly for:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>Providing and improving our services</li>
            <li>Communicating with you about our services</li>
            <li>Ensuring the security of our platform</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;