import React, { useState, useEffect, useMemo } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Search, Star, Clock, BookOpen, CheckCircle2, Filter, Users, TrendingUp } from 'lucide-react';

export const CourseCatalogPage = () => {
  const { courses, currentUser, startCourseEnrollment, setSelectedCourseForPlayer, setActiveTab, courseSearchQuery } = useLMS();
  const [search, setSearch] = useState(courseSearchQuery || '');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Pick up a search typed into the navbar's global search bar
  useEffect(() => {
    if (courseSearchQuery) setSearch(courseSearchQuery);
  }, [courseSearchQuery]);

  const categories = useMemo(() => ['All', ...new Set(courses.map(c => c.category))], [courses]);

  const filteredCourses = useMemo(() => {
    let list = courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'All' || c.category === category;
      return matchesSearch && matchesCat;
    });

    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') list = [...list].sort((a, b) => (a.id < b.id ? 1 : -1));
    else list = [...list].sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0)); // popular (default)

    return list;
  }, [courses, search, category, sortBy]);

  return (
    <div className="space-y-6 -m-4 sm:-m-6 lg:-m-8">

      {/* Udemy-style Hero */}
      <div className="bg-slate-900 dark:bg-black text-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-purple-100 text-[11px] font-bold uppercase tracking-wider rounded-full">
            {courses.length}+ Courses • Learn at Your Own Pace
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Learn Without Limits
          </h1>
          <p className="text-sm sm:text-base text-purple-100/90 max-w-xl mx-auto">
            Industry-relevant courses, hands-on projects, and certifications — everything you need to land your next role.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input autoComplete="off"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-12 pr-4 py-3.5 rounded-full text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/40 shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Category pills + sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-full whitespace-nowrap font-semibold transition-all shrink-0 ${
                  category === cat ? 'bg-purple-700 text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-purple-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{filteredCourses.length} results</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {filteredCourses.map(course => {
            const isEnrolled = currentUser.enrolledCourses?.includes(course.id);
            const isBestseller = course.rating >= 4.7 && (course.reviewsCount || 0) >= 50;
            const discountPct = course.originalPrice > course.price
              ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
              : 0;

            return (
              <div key={course.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                <div>
                  <div className="relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    {isBestseller && (
                      <span className="absolute top-2.5 left-2.5 bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase px-2 py-1 rounded shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{course.description}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">By {course.instructor}</p>

                    <div className="flex items-center space-x-1.5 pt-0.5">
                      <span className="text-sm font-extrabold text-amber-600">{course.rating}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(n => (
                          <Star key={n} className={`w-3.5 h-3.5 ${n <= Math.round(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">({course.reviewsCount})</span>
                    </div>

                    <div className="pt-1.5 flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{course.modules?.length || 1} Modules</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.enrolledCount || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-baseline space-x-1.5">
                    {course.price > 0 ? (
                      <>
                        <span className="text-lg font-extrabold text-slate-900 dark:text-white">₹{course.price}</span>
                        {discountPct > 0 && (
                          <>
                            <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
                            <span className="text-[10px] font-bold text-emerald-600">{discountPct}% off</span>
                          </>
                        )}
                      </>
                    ) : (
                      <span className="text-sm font-extrabold text-emerald-600">Free</span>
                    )}
                  </div>
                  {isEnrolled ? (
                    <button
                      onClick={() => {
                        setSelectedCourseForPlayer(course);
                        setActiveTab('course-content');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Continue</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => startCourseEnrollment(course)}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400 text-sm">
              No courses match "{search}" — try a different search or category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
