import React from 'react';

const CareerPage = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Careers</h1>
        
        <div className="space-y-12">
          <div className="bg-white dark:bg-deepCosmos-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're always looking for talented individuals who are passionate about technology and innovation.
              Join us in building the future of web3 and blockchain technology.
            </p>
            
            <div className="space-y-8">
              <div className="border-b dark:border-gray-700 pb-6">
                <h3 className="text-xl font-medium mb-3">Open Positions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Currently, we don't have any open positions. Please check back later or send us your resume for future opportunities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">General Application</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Don't see a position that matches your skills? Send us your resume anyway! We're always interested in meeting talented people.
                </p>
                <button className="bg-deepCosmos-600 hover:bg-deepCosmos-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Submit Application
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-deepCosmos-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Innovation First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work on cutting-edge technology and help shape the future of web3.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Remote-First Culture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work from anywhere in the world with our distributed team.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Continuous Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access to learning resources and regular knowledge sharing sessions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Competitive Benefits</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive benefits package and competitive compensation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerPage;