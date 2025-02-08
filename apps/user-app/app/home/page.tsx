import React from 'react';
import { ArrowRight, Send, Wallet, RefreshCcw, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Fast, Secure, and Reliable Payments
              </h1>
              <p className="text-lg mb-8 text-emerald-50">
                Transfer money instantly to anyone, anywhere. Experience the future of digital payments with SecurePay.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-teal-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                  Get Started
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-teal-800">
                      <p className="text-sm">Available Balance</p>
                      <p className="text-2xl font-bold">$2,456.00</p>
                    </div>
                    <Wallet className="h-8 w-8 text-teal-600" />
                  </div>
                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                      <Send className="h-4 w-4" />
                      Send Money
                    </button>
                    <button className="w-full border border-teal-800 text-teal-800 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
                      <RefreshCcw className="h-4 w-4" />
                      Request Money
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose SecurePay?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Secure Transactions",
              description: "Bank-grade encryption and security protocols to protect your money"
            },
            {
              icon: <RefreshCcw className="h-6 w-6" />,
              title: "Instant Transfers",
              description: "Send and receive money instantly, 24/7"
            },
            {
              icon: <Wallet className="h-6 w-6" />,
              title: "Smart Wallet",
              description: "Manage all your payments and transactions in one place"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
              Join millions of users who trust SecurePay for their daily transactions. Sign up now and experience the difference.
            </p>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;