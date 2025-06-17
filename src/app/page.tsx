"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<any>;
        txt2img: (prompt: string, flag: boolean) => Promise<any>;
      };
    };
  }
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const generatePost = async () => {
    setLoading(true);
    const imageRef = imageUrl ? ` The post should reference this image: ${imageUrl}` : "";
    const response = await window.puter.ai.chat(
      `${prompt} in a ${tone} tone.${imageRef}`
    );
    console.log(response,'response img')
    setPost(response.message?.content || response);
    setLoading(false);
  };

  const generateImage = async () => {
    setLoading(true);
    try {
      const result = await window.puter.ai.txt2img(prompt, false);
       console.log(result,'result img')
      setImageUrl(result.url || "");
    } catch (err) {
      console.error("Image generation failed:", err);
      alert("Failed to generate image.");
    }
    setLoading(false);
  };

  const cleanText = (text: string) => {
    return text
      .replace(/\n{2,}/g, "\n\n")
      .replace(/([^\n])\n([^\n])/g, "$1 $2")
      .replace(/\n/g, "\n\n");
  };

  return (
    <>
      <div className="p-4 max-w-[60%] mx-auto">
        <h1 className="text-2xl font-bold ">Ask anything</h1>
        {/* <h1 className="text-2xl font-bold ">LinkedIn Post Generator</h1> */}

        <textarea
          placeholder="Enter topic prompt..."
          className="w-full border p-2 mb-2"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="mb-2 w-full border p-2"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="motivational">Motivational</option>
        </select>

        <input
          type="text"
          placeholder="Paste image URL (optional)"
          className="w-full border p-2 mb-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          onClick={generateImage}
          disabled={loading || !prompt}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full"
        >
          {loading ? "Generating Image..." : "Generate Image"}
        </button>

        <button
          onClick={generatePost}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          {post && (
            <div className="p-4 bg-white shadow-md rounded">
              <h2 className="text-xl font-semibold mb-3">Generated Post Preview</h2>

              <div className="prose prose-sm sm:prose lg:prose-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    code: ({ children }) => (
                      <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                        <code>{children}</code>
                      </pre>
                    ),
                  }}
                >
                  {cleanText(post)}
                </ReactMarkdown>
              </div>

              {/* <button
                onClick={postToLinkedIn}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Post to LinkedIn
              </button> */}
            </div>
          )}
        </div>

        <div className="col-span-2">
          {post && (
            <div className="border p-4 bg-gray-50 rounded shadow mt-4">
              <h2 className="text-lg font-bold mb-2">Generated Post:</h2>

              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }) {
                    return (
                      <pre className="bg-gray-200 p-2 rounded overflow-x-auto text-sm my-2">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                  strong({ children }) {
                    return <strong className="text-blue-700">{children}</strong>;
                  },
                  p({ children }) {
                    return <p className="mb-2">{children}</p>;
                  },
                }}
              >
                {post}
              </ReactMarkdown>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Post visual"
                  className="w-full h-auto rounded mb-2 mt-2"
                />
              )}

              {/* <button
                onClick={postToLinkedIn}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Post to LinkedIn
              </button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
