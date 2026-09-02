import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Search, Star, Clock, BookOpen, CheckCircle2, DollarSign, Filter } from 'lucide-react';

export const CourseCatalogPage = () => {
  const { courses, currentUser, enrollCourse, setSelectedCourseForPlayer, setActiveTab } = useLMS();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Software Engineering', 'Artificial Intelligence', 'Cloud & Infrastructure', 'Design & Product', 'Security'];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || c.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Catalog & Curriculum</h1>
        <p className="text-sm text-slate-500 mt-1">Explore all industry-led certifications, modules, video lessons, and syllabus tracks.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course title, skills, instructor..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs px-3 py-2 rounded-xl whitespace-nowrap font-semibold transition-all ${
                category === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = currentUser.enrolledCourses?.includes(course.id);
          return (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating} ({course.reviewsCount})</span>
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.modules?.length || 3} Modules</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
                  <span className="text-lg font-extrabold text-slate-900 ml-1.5">₹{course.price}</span>
                </div>
                {isEnrolled ? (
                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(course);
                      setActiveTab('course-player');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enrolled • Learn</span>
                  </button>
                ) : (
                  <button
                    onClick={() => enrollCourse(course.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
