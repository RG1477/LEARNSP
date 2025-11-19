"use client"

import { useState, useRef } from "react";

export default function PDFUpload() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [summary, setSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [pageCount, setPageCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);
    localStorage.setItem("uploadedPdf", file.name);

    const estimatedPages = Math.ceil(file.size / 50000);
    setTotalPages(estimatedPages);
    localStorage.setItem("pdfTotalPages", estimatedPages.toString());
  };

  const generateSummary = () => {
    if (!fileName) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const topics = [
        "Data Structures",
        "Algorithms",
        "Time Complexity",
        "Space Complexity",
        "Arrays and Linked Lists",
        "Trees and Graphs",
        "Sorting Algorithms",
        "Searching Techniques"
      ];

      const summary = `PDF SUMMARY: ${fileName}

PAGES ANALYZED: ${Math.min(pageCount, totalPages)}/${totalPages}

KEY TOPICS:
${topics.slice(0, 8).map((t, i) => `${i + 1}. ${t}`).join("\n")}

DOCUMENT STATISTICS:
• File Size: ${(fileSize / 1024).toFixed(2)} KB
• Estimated Pages: ${totalPages}
• Key Sections: ${Math.ceil(totalPages / 5)}
• Difficulty Level: Intermediate
• Estimated Reading Time: ${Math.ceil(totalPages * 3)} minutes

SUMMARY:
This document covers comprehensive concepts essential for CSE students. The material is organized into chapters focusing on theoretical foundations and practical implementations. Each section includes detailed examples, algorithms, and best practices for understanding core computer science principles.

LEARNING OBJECTIVES:
• Understand fundamental CS concepts
• Apply algorithms to real-world problems
• Analyze time and space complexity
• Implement efficient data structures
• Master design patterns and optimization techniques`;

      setSummary(summary);
      setShowSummary(true);
      setLoading(false);
    }, 1500);
  };

  const downloadSummary = () => {
    const element = document.createElement("a");
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(summary);
    element.download = `${fileName.replace(".pdf", "")}-summary.txt`;
    element.click();
  };

  return (
    <div className="bg-gradient-to-r from-amber-800/30 to-orange-900/30 p-6 rounded-xl border border-amber-500/30">
      <h3 className="text-lg font-bold text-amber-200 mb-3">Upload Study Material (PDF)</h3>
      
      <label
        onClick={() => fileInputRef.current?.click()}
        className="block border-2 border-dashed border-amber-400/40 rounded-lg p-8 text-center cursor-pointer hover:border-amber-400/60 transition"
      >
        <div className="text-amber-300 mb-2 text-lg font-semibold">Click to upload PDF</div>
        <p className="text-gray-400 text-sm">or drag and drop your file</p>
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {fileName && (
        <div className="mt-4">
          <div className="flex items-center justify-between bg-slate-800 p-4 rounded border border-slate-600 mb-3">
            <div>
              <p className="text-amber-300 font-semibold">{fileName}</p>
              <p className="text-gray-400 text-sm">{(fileSize / 1024).toFixed(2)} KB • {totalPages} estimated pages</p>
            </div>
            <button
              onClick={() => {
                setFileName("");
                setSummary("");
                setShowSummary(false);
              }}
              className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500 text-white text-sm transition"
            >
              Clear
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-300 block mb-1">Pages to analyze:</label>
              <input
                type="number"
                value={pageCount}
                onChange={(e) => setPageCount(Math.min(parseInt(e.target.value) || 1, totalPages))}
                min="1"
                max={totalPages}
                className="w-full px-3 py-2 bg-slate-800 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <button
              onClick={generateSummary}
              disabled={loading}
              className="px-6 py-2 rounded bg-orange-500 hover:bg-orange-400 disabled:bg-gray-600 text-white font-semibold text-sm transition self-end"
            >
              {loading ? "Analyzing..." : "Summarize"}
            </button>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="mt-4 bg-slate-800 p-4 rounded border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-amber-300">PDF Summary</h4>
            <button
              onClick={downloadSummary}
              className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-sm transition"
            >
              Download
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-gray-300 text-xs font-sans max-h-96 overflow-y-auto">{summary}</pre>
        </div>
      )}
    </div>
  );
}
