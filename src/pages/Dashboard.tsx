import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { createShortUrl, getUserUrls } from "../api/urls";
import type { Url } from "../types";

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [urls, setUrls] = useState<Url[]>([]);
  const [fetchingUrls, setFetchingUrls] = useState(true);
  const [qrVisibleFor, setQrVisibleFor] = useState<string | null>(null);

  const backendBaseUrl = import.meta.env.VITE_API_URL;

  //fetch url using try chatch
  //do useeffect to ender then at the start
  const fetchUrls = async () => {
    try {
      const data = await getUserUrls();
      setUrls(data);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    } finally {
      setFetchingUrls(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  //write a handle submit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createShortUrl({
        originalUrl,
        customAlias: customAlias || undefined,
      });
      setOriginalUrl("");
      setCustomAlias("");
      await fetchUrls();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Failed to create short URL");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  //write a handle copy function
  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(`${backendBaseUrl}/${shortCode}`);
  };

  const toggleQr = (id: string) => {
    setQrVisibleFor((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#CAF0F8] dark:bg-[#03045E] px-6 lg:px-16 py-10 transition-colors">
      <div className="max-w-full  grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <h1 className="text-2xl font-bold text-[#03045E] dark:text-[#CAF0F8] mb-6">
              Shorten a URL
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="Long URL"
                id="originalUrl"
                type="url"
                placeholder="https://example.com/very-long-link"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
              />
              <Input
                label="Custom Alias (optional)"
                id="customAlias"
                type="text"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Shorten URL"}
              </Button>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <h2 className="text-xl font-bold text-[#03045E] dark:text-[#CAF0F8] mb-4">
              Your Links
            </h2>

            {fetchingUrls ? (
              <p className="text-[#023E8A] dark:text-[#ADE8F4] text-sm">
                Loading your links...
              </p>
            ) : urls.length === 0 ? (
              <p className="text-[#023E8A] dark:text-[#ADE8F4] text-sm">
                You haven't created any links yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {urls.map((url) => (
                  <li
                    key={url._id}
                    className="border border-[#90E0EF] dark:border-[#0077B6] rounded-lg p-3 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={`${backendBaseUrl}/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0077B6] dark:text-[#48CAE4] font-medium hover:underline"
                      >
                        {backendBaseUrl}/{url.shortCode}
                      </a>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleQr(url._id)}
                          className="text-xs text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4] border border-[#90E0EF] dark:border-[#0077B6] rounded px-2 py-1"
                        >
                          {qrVisibleFor === url._id ? "Hide QR" : "Show QR"}
                        </button>
                        <button
                          onClick={() => handleCopy(url.shortCode)}
                          className="text-xs text-[#023E8A] dark:text-[#ADE8F4] hover:text-[#0077B6] dark:hover:text-[#48CAE4] border border-[#90E0EF] dark:border-[#0077B6] rounded px-2 py-1"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#023E8A] dark:text-[#ADE8F4] truncate">
                      {url.originalUrl}
                    </p>
                    <p className="text-xs text-[#0077B6] dark:text-[#48CAE4]">
                      {url.clicks} clicks
                    </p>

                    {qrVisibleFor === url._id && (
                      <div className="mt-2 p-3 bg-[#CAF0F8] dark:bg-[#03045E] rounded-lg flex justify-center">
                        <QRCodeSVG
                          value={`${backendBaseUrl}/${url.shortCode}`}
                          size={128}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
