"use client";

import { useState, useEffect } from "react";
import { Flame, Target, BookOpen, TrendingUp, Award } from 'lucide-react';

export default function RightSidebar({ user }: { user: any }) {
  const [streak, setStreak] = useState(0);
  const [tasks, setTasks] = useState<any[]>([]);
  const [dailyGoalProgress, setDailyGoalProgress] = useState(65);

  useEffect(() => {
    const savedStreak = localStorage.getItem("studyStreak");
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setStreak(parseInt(savedStreak || "0"));
    setTasks(savedTasks);
  }, []);

  const upcomingDeadlines = [
    { subject: "DSA", topic: "Binary Trees", daysLeft: 2, priority: "high" },
    { subject: "Discrete Math", topic: "Graph Theory", daysLeft: 4, priority: "medium" },
    { subject: "OOPS", topic: "Design Patterns", daysLeft: 7, priority: "low" }
  ];

  return (
    <aside className="w-full lg:w-80 bg-gradient-to-b from-slate-800 to-slate-900 p-6 border-l border-amber-600/30 hidden md:flex flex-col overflow-y-auto">
      {/* Profile Section */}
      <div className="text-center mb-6 pb-6 border-b border-slate-700">
        <div className="w-20 h-20 rounded-full mx-auto border-2 border-amber-500 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-slate-900">
          {user?.name?.charAt(0) || "S"}
        </div>
        <h3 className="font-bold text-white mt-3">{user?.name || "Student"}</h3>
        <p className="text-xs text-gray-400">CSE 3rd Semester</p>
      </div>

      {/* Study Streak Card */}
      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-4 rounded-lg mb-6 border border-orange-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <Flame className="w-5 h-5 text-red-400" />
          <span className="text-xs text-gray-400">Study Streak</span>
        </div>
        <p className="text-3xl font-bold text-orange-400 mb-1">{streak}</p>
        <p className="text-xs text-gray-300">days in a row</p>
        <div className="mt-3 p-2 bg-orange-500/20 rounded text-xs text-orange-300 text-center">
          Keep it up! 2 more days for milestone
        </div>
      </div>

      {/* Daily Goal */}
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-lg mb-6 border border-blue-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-semibold text-blue-300">Today's Goal</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-gray-300">Study Time</span>
            <span className="text-blue-300 font-semibold">{dailyGoalProgress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
              style={{ width: `${dailyGoalProgress}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">1.5 hrs of 2 hrs target</p>
      </div>

      {/* Points & Rank */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600">
          <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400 mb-1">Points</p>
          <p className="text-lg font-bold text-amber-400">2,450</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg text-center border border-slate-600">
          <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400 mb-1">Rank</p>
          <p className="text-lg font-bold text-purple-400">#24</p>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          Upcoming
        </h4>
        <div className="space-y-2">
          {upcomingDeadlines.map((deadline, i) => (
            <div key={i} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-amber-500/50 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs font-semibold text-white">{deadline.subject}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  deadline.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                  deadline.priority === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {deadline.daysLeft}d
                </span>
              </div>
              <p className="text-xs text-gray-400">{deadline.topic}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
        <h4 className="font-semibold text-white mb-3">This Week</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-300">
            <span>Study Hours</span>
            <span className="text-amber-400 font-semibold">22.5 hrs</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Tests Taken</span>
            <span className="text-blue-400 font-semibold">3</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Avg Score</span>
            <span className="text-green-400 font-semibold">85%</span>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="pt-4 border-t border-slate-700 mt-4">
        <h4 className="font-semibold text-white mb-3">Recent Tasks</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-xs">No tasks yet.</p>
          ) : (
            tasks.slice(0, 4).map((task: any) => (
              <div key={task.id} className="p-2 bg-slate-700/50 rounded text-xs text-gray-300 border border-slate-600 hover:border-amber-500/50 transition-all cursor-pointer">
                <p className="font-medium">{task.text}</p>
                <p className="text-gray-500 text-xs mt-1">{task.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
