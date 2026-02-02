'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CourseMarkdownRenderer from './CourseMarkdownRenderer';
import type { CourseFile } from '../utils/journalReader';

export interface CourseListProps {
  courses: CourseFile[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  const toggleCourse = (filename: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(filename)) {
      newExpanded.delete(filename);
    } else {
      newExpanded.add(filename);
    }
    setExpandedCourses(newExpanded);
  };

  if (courses.length === 0) {
    return <p>Aucun cours disponible.</p>;
  }

  return (
    <div className="courseList">
      {courses.map((course) => {
        const isExpanded = expandedCourses.has(course.filename);
        const displayName = course.filename.replace('.md', '');
        
        return (
          <div key={course.filename} className="courseItem">
            <button
              className="courseHeader"
              onClick={() => toggleCourse(course.filename)}
              aria-expanded={isExpanded}
              aria-controls={`course-content-${course.filename}`}
              type="button"
            >
              <h2 className="courseTitle">{displayName}</h2>
              {isExpanded ? (
                <ChevronUp className="courseIcon" aria-hidden="true" />
              ) : (
                <ChevronDown className="courseIcon" aria-hidden="true" />
              )}
            </button>
            <div
              id={`course-content-${course.filename}`}
              className={`courseContent ${isExpanded ? 'open' : 'closed'}`}
              aria-hidden={!isExpanded}
            >
              <div className="courseContentInner">
                <CourseMarkdownRenderer content={course.content} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
