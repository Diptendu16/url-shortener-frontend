import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import axios from "axios";
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

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Shorten a URL
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
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

        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Links</h2>

          {fetchingUrls ? (
            <p className="text-gray-500 text-sm">Loading your links...</p>
          ) : urls.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven't created any links yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {urls.map((url) => (
                <li
                  key={url._id}
                  className="border border-gray-200 rounded-lg p-3 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <a
                      className="text-blue-600 font-medium hover:underline"
                      href={`${backendBaseUrl}/${url.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {backendBaseUrl}/{url.shortCode}
                    </a>
                    <button
                      onClick={() => handleCopy(url.shortCode)}
                      className="text-xs text-gray-500 hover:text-blue-600 border border-gray-300 rounded px-2 py-1"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {url.originalUrl}
                  </p>
                  <p className="text-xs text-gray-400">{url.clicks} clicks</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
