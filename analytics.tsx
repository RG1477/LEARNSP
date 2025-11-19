"use client";

import { useState, useEffect } from "react";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    subjects: 0,
    completedTopics: 0,
    difficultTopics: 0,
    tasks: 0,
    notes: 0,
    streak: 0
  });

  useEffect(() => {
    const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    const completedUnits = JSON.parse(localStorage.getItem("completedUnits") || "[]");
    const difficultUnits = JSON.parse(localStorage.getItem("difficultUnits") || "[]");
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const streak = localStorage.getItem("studyStreak") || "0";

    setAnalytics({
      subjects: subjects.length,
      completedTopics: completedUnits.length,
      difficultTopics: difficultUnits.length,
      tasks: tasks.length,
      notes: notes.length,
      streak: parseInt(streak)
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-amber-400">{analytics.subjects}</div>
        <div className="text-xs text-gray-400">Subjects</div>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-400">{analytics.completedTopics}</div>
        <div className="text-xs text-gray-400">Topics Done</div>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-red-400">{analytics.difficultTopics}</div>
        <div className="text-xs text-gray-400">Difficult</div>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-400">{analytics.tasks}</div>
        <div className="text-xs text-gray-400">Tasks</div>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-400">{analytics.notes}</div>
        <div className="text-xs text-gray-400">Notes</div>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-orange-400">{analytics.streak}</div>
        <div className="text-xs text-gray-400">Day Streak</div>
      </div>
    </div>
  );
}
