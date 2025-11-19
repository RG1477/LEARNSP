"use client";

import { useState } from "react";

interface Unit {
  id: number;
  subjectId: number;
  name: string;
  description: string;
}

interface Subject {
  id: number;
  name: string;
}

export default function UnitsPanel({
  subjects,
  units,
  setUnits,
  currentSubjectId
}: {
  subjects: Subject[];
  units: Unit[];
  setUnits: (u: Unit[]) => void;
  currentSubjectId: number | null;
}) {
  const [completed, setCompleted] = useState<number[]>(JSON.parse(localStorage.getItem("completedUnits") || "[]"));
  const [difficult, setDifficult] = useState<number[]>(JSON.parse(localStorage.getItem("difficultUnits") || "[]"));
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(currentSubjectId?.toString() || "");

  const filteredUnits = currentSubjectId ? units.filter(u => u.subjectId === currentSubjectId) : units;
  const completedCount = filteredUnits.filter(u => completed.includes(u.id)).length;
  const progressPercent = filteredUnits.length > 0 ? Math.round((completedCount / filteredUnits.length) * 100) : 0;

  const addUnit = () => {
    if (!name.trim() || !selectedSubject) return;
    const newUnit = {
      id: Date.now(),
      subjectId: parseInt(selectedSubject),
      name,
      description
    };
    const updated = [...units, newUnit];
    setUnits(updated);
    localStorage.setItem("units", JSON.stringify(updated));
    setName("");
    setDescription("");
    setShowModal(false);
  };

  const toggleComplete = (id: number) => {
    const updated = completed.includes(id)
      ? completed.filter(cid => cid !== id)
      : [...completed, id];
    setCompleted(updated);
    localStorage.setItem("completedUnits", JSON.stringify(updated));
  };

  const toggleDifficult = (id: number) => {
    const updated = difficult.includes(id)
      ? difficult.filter(did => did !== id)
      : [...difficult, id];
    setDifficult(updated);
    localStorage.setItem("difficultUnits", JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-amber-600/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-amber-300">Topics & Units</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:shadow-lg transition"
        >
          + Add Unit
        </button>
      </div>

      <div className="mb-4">
        <div className="bg-slate-700 rounded-full h-3 mb-2 overflow-hidden border border-amber-600/30">
          <div
            className="h-3 bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm">Progress: {completedCount} / {filteredUnits.length} topics completed</p>
      </div>

      <div className="space-y-2">
        {filteredUnits.length === 0 ? (
          <p className="text-gray-400">No topics yet. Add one to get started!</p>
        ) : (
          filteredUnits.map(unit => (
            <div key={unit.id} className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-amber-500 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{completed.includes(unit.id) ? "✅" : "▶"}</span>
                    <h4 className="font-semibold text-white">{unit.name}</h4>
                    {difficult.includes(unit.id) && (
                      <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">Difficult</span>
                    )}
                    {completed.includes(unit.id) && (
                      <span className="text-xs bg-green-600 px-2 py-1 rounded text-white">Completed</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{unit.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleComplete(unit.id)}
                  className="px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-sm text-white transition"
                >
                  {completed.includes(unit.id) ? "Incomplete" : "Complete"}
                </button>
                <button
                  onClick={() => toggleDifficult(unit.id)}
                  className={`px-3 py-1 rounded text-sm text-white transition ${
                    difficult.includes(unit.id) ? "bg-red-600 hover:bg-red-500" : "bg-orange-600 hover:bg-orange-500"
                  }`}
                >
                  {difficult.includes(unit.id) ? "Mark Easy" : "Mark Difficult"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-slate-800 p-6 rounded-lg border border-amber-500/30 w-full max-w-sm">
            <h3 className="text-lg font-bold text-amber-300 mb-4">Add Unit/Topic</h3>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 rounded mb-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="">Select Subject</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Unit name"
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
                onClick={addUnit}
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
