import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  Video,
  Radio,
  ClipboardList,
  Info,
  ChevronRight,
  Star,
  MessageSquare
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'content', label: 'Content', icon: Video },
  { id: 'live-classes', label: 'Live Classes', icon: Radio },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'reviews', label: 'Reviews', icon: Star },
];

const StarRow = ({ value, onChange, size = 'w-5 h-5' }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map(n => (
      <button
        key={n}
        type="button"
        onClick={onChange ? () => onChange(n) : undefined}
        className={onChange ? 'cursor-pointer' : 'cursor-default'}
      >
        <Star
          className={`${size} ${
            n <= value
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-200 fill-slate-200'
          }`}
        />
      </button>
    ))}
  </div>
);

export const CourseContentPage = () => {
  const {
    selectedCourseForPlayer,
    courses,
    currentUser,
    getCourseProgress,
    setActiveTab,
    setSelectedLessonForMaterials,
    assignments,
    getCourseReviews,
    submitReview,

    // Dynamic Live Classes
    liveClasses,
  } = useLMS();

  const course = selectedCourseForPlayer || courses[0];

  // Prevent errors if no course is selected
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-900">
            No course selected
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please select a course from your dashboard.
          </p>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = getCourseProgress(course.id);

  const [tab, setTab] = useState('content');

  const courseAssignments =
    assignments?.filter(
      assignment => assignment.courseId === course.id
    ) || [];

  /*
   * IMPORTANT:
   * Live classes are now coming from MongoDB through LMSContext.
   *
   * Each live class has the real MongoDB courseId.
   * Therefore we only show classes belonging to this course.
   */
  const courseLiveClasses =
    liveClasses?.filter(
      liveClass => String(liveClass.courseId) === String(course.id)
    ) || [];

  const {
    list: courseReviewList,
    average: courseAverage,
    count: courseReviewCount
  } = getCourseReviews(course.id);

  const myReview = courseReviewList.find(
    review => review.studentId === currentUser?.id
  );

  const [reviewRating, setReviewRating] = useState(
    myReview?.rating || 0
  );

  const [reviewComment, setReviewComment] = useState(
    myReview?.comment || ''
  );

  const handleSubmitReview = () => {
    if (reviewRating === 0) return;

    submitReview(
      course.id,
      reviewRating,
      reviewComment
    );
  };

  const openLesson = (lesson) => {
    setSelectedLessonForMaterials({
      lesson,
      course
    });

    setActiveTab('study-materials');
  };

  return (
    <div className="space-y-6">

      {/* =========================
          COURSE HEADER
      ========================== */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div className="flex items-center space-x-3">

          <button
            onClick={() => setActiveTab('dashboard')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              {course.category}
            </span>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
              {course.title}
            </h2>
          </div>

        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold">

          <span className="text-purple-700 font-extrabold">
            {progress}% Completed
          </span>

          <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>


      {/* =========================
          TAB BAR
      ========================== */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1.5">

        {TABS.map(({ id, label, icon: Icon }) => (

          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >

            <Icon className="w-4 h-4" />

            <span>
              {label}
            </span>

          </button>

        ))}

      </div>


      {/* =========================
          OVERVIEW TAB
      ========================== */}
      {tab === 'overview' && (

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">

          <h3 className="font-extrabold text-slate-900 text-lg">
            About This Course
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {course.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">

            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Duration
              </p>

              <p className="text-sm font-bold text-slate-900">
                {course.duration}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Level
              </p>

              <p className="text-sm font-bold text-slate-900">
                {course.level}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Instructor
              </p>

              <p className="text-sm font-bold text-slate-900">
                {course.instructor}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Rating
              </p>

              <p className="text-sm font-bold text-slate-900">
                {courseAverage.toFixed(1)} ★ ({courseReviewCount})
              </p>
            </div>

          </div>

        </div>

      )}


      {/* =========================
          COURSE CONTENT TAB
      ========================== */}
      {tab === 'content' && (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">

          {course.modules?.map(module => (

            <div
              key={module.id}
              className="space-y-1.5"
            >

              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-50 p-3 rounded-xl border border-slate-100">
                {module.title}
              </h4>

              <div className="space-y-1">

                {module.lessons?.map(lesson => {

                  const isDone =
                    currentUser?.completedLessons?.includes(
                      lesson.id
                    );

                  return (

                    <button
                      key={lesson.id}
                      onClick={() => openLesson(lesson)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl text-left text-xs hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                    >

                      <div className="flex items-center space-x-2.5">

                        {isDone ? (

                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />

                        ) : (

                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />

                        )}

                        <span className="font-semibold text-slate-800">
                          {lesson.title}
                        </span>

                      </div>

                      <div className="flex items-center space-x-2 text-slate-400 shrink-0">

                        <span>
                          {lesson.duration}
                        </span>

                        <ChevronRight className="w-4 h-4" />

                      </div>

                    </button>

                  );

                })}

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          DYNAMIC LIVE CLASSES TAB
      ====================================================== */}
      {tab === 'live-classes' && (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-3">

          {/* Header */}

          <div className="flex items-center justify-between mb-2">

            <div>

              <h3 className="font-extrabold text-slate-900 text-base">
                Live Classes
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Live sessions scheduled for this course.
              </p>

            </div>

            <div className="flex items-center gap-2">

              <Radio className="w-5 h-5 text-purple-600" />

              <span className="text-xs font-bold text-purple-700">
                {courseLiveClasses.length} Session
                {courseLiveClasses.length === 1 ? '' : 's'}
              </span>

            </div>

          </div>


          {/* No classes */}

          {courseLiveClasses.length === 0 ? (

            <div className="text-center py-8 space-y-2">

              <Radio className="w-9 h-9 text-purple-300 mx-auto" />

              <h3 className="font-bold text-slate-900 text-sm">
                No Live Classes Scheduled Yet
              </h3>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your instructor will schedule live sessions
                here. Once a class is scheduled for this course,
                it will automatically appear here.
              </p>

            </div>

          ) : (

            /* Live class list */

            <div className="space-y-3">

              {courseLiveClasses.map(liveClass => (

                <div
                  key={liveClass.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-sm transition-all"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* Class information */}

                    <div className="space-y-2">

                      <div className="flex items-center gap-2">

                        <span
                          className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                            liveClass.status === 'Live'
                              ? 'bg-red-50 text-red-600'
                              : liveClass.status === 'Completed'
                              ? 'bg-slate-100 text-slate-500'
                              : liveClass.status === 'Cancelled'
                              ? 'bg-red-50 text-red-500'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {liveClass.status || 'Scheduled'}
                        </span>

                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                          {liveClass.platform}
                        </span>

                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900">
                        {liveClass.title}
                      </h4>

                      <div className="text-xs text-slate-500 space-y-1">

                        <p>
                          <span className="font-semibold text-slate-700">
                            Date:
                          </span>{' '}
                          {liveClass.date}
                        </p>

                        <p>
                          <span className="font-semibold text-slate-700">
                            Time:
                          </span>{' '}
                          {liveClass.time ||
                            `${liveClass.startTime || ''} - ${
                              liveClass.endTime || ''
                            }`}
                        </p>

                        <p>
                          <span className="font-semibold text-slate-700">
                            Instructor:
                          </span>{' '}
                          {liveClass.instructor}
                        </p>

                      </div>

                      {liveClass.description && (

                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl pt-1">
                          {liveClass.description}
                        </p>

                      )}

                    </div>


                    {/* Join button */}

                    <div className="shrink-0">

                      {liveClass.status === 'Cancelled' ? (

                        <button
                          disabled
                          className="w-full lg:w-auto px-5 py-2.5 bg-slate-100 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed"
                        >
                          Cancelled
                        </button>

                      ) : liveClass.status === 'Completed' ? (

                        <a
                          href={liveClass.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full lg:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl text-center transition-all"
                        >
                          View Class Link
                        </a>

                      ) : (

                        <a
                          href={liveClass.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full lg:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl text-center transition-all shadow-sm"
                        >
                          Join Class
                        </a>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}


      {/* =========================
          ASSIGNMENTS TAB
      ========================== */}
      {tab === 'assignments' && (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-2">

          {courseAssignments.length === 0 ? (

            <div className="text-center py-8 space-y-2">

              <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />

              <p className="text-xs text-slate-500">
                No assignments posted for this course yet.
              </p>

            </div>

          ) : (

            courseAssignments.map(assignment => (

              <div
                key={assignment.id}
                className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
              >

                <div>

                  <p className="font-bold text-slate-900">
                    {assignment.title}
                  </p>

                  <p className="text-slate-500 mt-0.5">
                    Due: {assignment.dueDate}
                  </p>

                </div>

                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-full">
                  Pending
                </span>

              </div>

            ))

          )}

        </div>

      )}


      {/* =========================
          REVIEWS TAB
      ========================== */}
      {tab === 'reviews' && (

        <div className="space-y-4">

          {/* Average rating */}

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-5">

            <div className="text-center shrink-0">

              <p className="text-3xl font-extrabold text-slate-900">
                {courseAverage.toFixed(1)}
              </p>

              <StarRow
                value={Math.round(courseAverage)}
                size="w-4 h-4"
              />

              <p className="text-[11px] text-slate-500 mt-1">
                {courseReviewCount} review
                {courseReviewCount === 1 ? '' : 's'}
              </p>

            </div>

            <div className="h-14 w-px bg-slate-100" />

            <p className="text-xs text-slate-500">
              Rated by students who've taken this course.
              Be honest — your feedback helps future learners
              choose the right course.
            </p>

          </div>


          {/* Leave / edit review */}

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">

            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">

              <MessageSquare className="w-4 h-4 text-purple-600" />

              <span>
                {myReview
                  ? 'Edit Your Review'
                  : 'Leave a Review'}
              </span>

            </h4>

            <StarRow
              value={reviewRating}
              onChange={setReviewRating}
            />

            <textarea
              value={reviewComment}
              onChange={e =>
                setReviewComment(e.target.value)
              }
              rows={3}
              placeholder="What did you think of this course?"
              className="w-full p-3 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
            />

            <button
              onClick={handleSubmitReview}
              disabled={reviewRating === 0}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-xl transition-all"
            >
              {myReview
                ? 'Update Review'
                : 'Submit Review'}
            </button>

          </div>


          {/* All reviews */}

          <div className="space-y-2">

            {courseReviewList.length === 0 && (

              <p className="text-xs text-slate-500 text-center py-6">
                No reviews yet — be the first to leave one.
              </p>

            )}

            {courseReviewList.map(review => (

              <div
                key={review.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1.5"
              >

                <div className="flex items-center justify-between">

                  <p className="text-sm font-bold text-slate-900">
                    {review.studentName}
                  </p>

                  <span className="text-[11px] text-slate-400">
                    {review.createdAt}
                  </span>

                </div>

                <StarRow
                  value={review.rating}
                  size="w-3.5 h-3.5"
                />

                {review.comment && (

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.comment}
                  </p>

                )}

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};