import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import {
  Link2,
  Zap,
  BarChart3,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
        style={{
          background: "linear-gradient(135deg, #03045E 0%, #023E8A 100%)",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-3xl">
          Shorten Links. Track Clicks. Share Smarter.
        </h1>
        <p className="text-lg sm:text-xl text-[#CAF0F8] max-w-xl mb-8">
          A fast, secure URL shortener with custom aliases, click analytics, and
          QR codes — all in one place.
        </p>
        <Link
          to={user ? "/dashboard" : "/register"}
          className="bg-[#00B4D8] hover:bg-[#0096C7] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {user ? "Go to Dashboard" : "Get Started Free"}
        </Link>
      </section>

      {/* Demo Section */}
      <section
        className="py-20 px-6 flex justify-center"
        style={{
          background: "linear-gradient(180deg, #023E8A 0%, #0077B6 100%)",
        }}
      >
        <Card className="max-w-xl w-full text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            See it in action
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm px-4 py-3 rounded-lg w-full sm:w-auto truncate max-w-xs animate-pulse-slow">
              https://example.com/some/really/long/path?query=123
            </div>

            <div className="text-2xl text-[#0077B6] dark:text-[#48CAE4] font-bold">
              →
            </div>

            <div className="bg-[#CAF0F8] dark:bg-[#03045E] text-[#023E8A] dark:text-[#90E0EF] text-sm font-semibold px-4 py-3 rounded-lg w-full sm:w-auto">
              yourapp.com/x7Yq2p
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
            Paste any long link. Get a short, shareable one instantly.
          </p>
        </Card>
      </section>

      {/* Benefits Section */}
      <section
        className="py-20 px-6"
        style={{
          background: "linear-gradient(180deg, #0077B6 0%, #ADE8F4 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why use our shortener?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Zap
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Instant Shortening
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Turn any long link into a short, shareable URL in a single
                click.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Link2
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Custom Aliases
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your own memorable short link instead of a random code.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <BarChart3
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Click Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track how many times each of your links has been visited.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <QrCode
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                QR Codes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instantly generate a scannable QR code for any short link.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <ShieldCheck
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Secure by Design
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your account and links are protected with secure, encrypted
                authentication.
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Smartphone
                className="text-[#0077B6] dark:text-[#48CAE4] mb-3"
                size={28}
              />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Works Everywhere
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A fully responsive experience across desktop, tablet, and
                mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer
        className="py-16 px-6 text-center"
        style={{
          background: "linear-gradient(180deg, #ADE8F4 0%, #CAF0F8 100%)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#023E8A] mb-4">
          Ready to simplify your links?
        </h2>
        <p className="text-[#023E8A]/80 mb-8">
          Join now and start shortening, tracking, and sharing smarter.
        </p>
        <Link
          to={user ? "/dashboard" : "/register"}
          className="inline-block bg-[#0077B6] hover:bg-[#023E8A] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {user ? "Go to Dashboard" : "Create Free Account"}
        </Link>

        <p className="text-xs text-[#023E8A]/60 mt-10">
          © {new Date().getFullYear()} URL Shortener. Built as a full-stack
          learning project.
        </p>
      </footer>
    </div>
  );
};

export default Home;
