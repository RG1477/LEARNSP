"use client";

import { useState } from "react";

interface Subject {
  id: number;
  name: string;
  description: string;
}

export default function SubjectsPanel({ subjects, setSubjects }: { subjects: Subject[]; setSubjects: (s: Subject[]) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addSubject = () => {
    if (!name.trim()) return;
    const newSubject = {
      id: Date.now(),
      name,
      description
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    localStorage.setItem("subjects", JSON.stringify(updated));
    setName("");
    setDescription("");
    setShowModal(false);
  };

  const deleteSubject = (id: number) => {
    const updated = subjects.filter(s => s.id !== id);
    setSubjects(updated);
    localStorage.setItem("subjects", JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-amber-600/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-amber-300">Your Subjects</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:shadow-lg transition"
        >
          + Add Subject
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-amber-500 transition">
            <h4 className="font-semibold text-white mb-1">{subject.name}</h4>
            <p className="text-sm text-gray-400 mb-3">{subject.description}</p>
            <button
              onClick={() => deleteSubject(subject.id)}
              className="text-red-400 text-sm hover:text-red-300 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-slate-800 p-6 rounded-lg border border-amber-500/30 w-full max-w-sm">
            <h3 className="text-lg font-bold text-amber-300 mb-4">Add Subject</h3>
            <input
              type="text"
              placeholder="Subject name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 rounded mb-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 rounded mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400 h-20"
            />
            <div className="flex gap-2">
              <button
                onClick={addSubject}
                className="flex-1 px-4 py-2 rounded bg-amber-500 text-white font-semibold hover:bg-amber-400 transition"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded bg-slate-600 text-white font-semibold hover:bg-slate-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
