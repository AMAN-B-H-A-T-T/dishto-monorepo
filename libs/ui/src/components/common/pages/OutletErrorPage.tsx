import React from 'react';

import {
  AlertTriangle,
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
  WifiOff,
} from 'lucide-react';

export const OutletErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Main Container */}
      <div className="w-full max-w-2xl">
        {/* Error Card */}
        <div className="overflow-hidden bg-white border border-orange-100 shadow-2xl rounded-2xl">
          {/* Header with gradient */}
          <div className="p-6 text-white bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <WifiOff className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold text-center">
              Connection Error
            </h1>
          </div>

          {/* Error Content */}
          <div className="p-8 space-y-6">
            {/* Error Message Box */}
            <div className="p-6 border-2 border-red-200 rounded-xl bg-red-50">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="flex-shrink-0 w-6 h-6 mt-1 text-red-500" />
                <div>
                  <h2 className="mb-2 font-sans text-xl font-semibold text-gray-800">
                    Outlet Not Detected
                  </h2>
                  <p className="font-sans leading-relaxed text-gray-600">
                    Your outlet is not detected by DishTo. This may be due to a
                    network connectivity issue or configuration problem.
                  </p>
                </div>
              </div>
            </div>

            {/* What to do section */}
            <div className="p-6 space-y-4 rounded-xl bg-orange-50">
              <h3 className="font-sans text-lg font-semibold text-gray-800">
                What you can do:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-lg font-bold text-green-500">•</span>
                  <span className="font-sans text-gray-600">
                    Check your internet connection
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg font-bold text-green-500">•</span>
                  <span className="font-sans text-gray-600">
                    Restart your device and try again
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg font-bold text-green-500">•</span>
                  <span className="font-sans text-gray-600">
                    Ensure your outlet is powered on and connected
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-lg font-bold text-green-500">•</span>
                  <span className="font-sans text-gray-600">
                    Contact our technical support team for assistance
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Support Section */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="mb-6 font-sans text-lg font-semibold text-center text-gray-800">
                Need Help? Contact Technical Support
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Phone Support */}
                <button className="flex flex-col items-center p-4 transition-all duration-300 bg-white border-2 border-gray-200 group rounded-xl hover:border-orange-400 hover:bg-orange-50">
                  <div className="p-3 transition-colors bg-orange-100 rounded-full group-hover:bg-orange-200">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-gray-700 group-hover:text-orange-600">
                    Call Support
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    1-800-DISHTO
                  </span>
                </button>

                {/* Email Support */}
                <button className="flex flex-col items-center p-4 transition-all duration-300 bg-white border-2 border-gray-200 group rounded-xl hover:border-orange-400 hover:bg-orange-50">
                  <div className="p-3 transition-colors bg-orange-100 rounded-full group-hover:bg-orange-200">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-gray-700 group-hover:text-orange-600">
                    Email Us
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    support@dishto.com
                  </span>
                </button>

                {/* Live Chat */}
                <button className="flex flex-col items-center p-4 transition-all duration-300 bg-white border-2 border-gray-200 group rounded-xl hover:border-orange-400 hover:bg-orange-50">
                  <div className="p-3 transition-colors bg-orange-100 rounded-full group-hover:bg-orange-200">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-gray-700 group-hover:text-orange-600">
                    Live Chat
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    Available 24/7
                  </span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
              <button className="flex-1 transform rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl">
                Contact Technical Team
              </button>
            </div>
          </div>
        </div>

        {/* Error Code Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Error Code:{' '}
            <span className="font-mono text-gray-600">
              OUTLET_NOT_DETECTED_001
            </span>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Reference this code when contacting support
          </p>
        </div>
      </div>
    </div>
  );
};
