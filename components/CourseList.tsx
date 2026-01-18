'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CourseMarkdownRenderer from './CourseMarkdownRenderer';
import type { CourseFile } from '../utils/journalReader';
import styles from './CourseList.module.css';

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
    <div className={styles.courseList}>
      {courses.map((course) => {
        const isExpanded = expandedCourses.has(course.filename);
        const displayName = course.filename.replace('.md', '');
        
        return (
          <div key={course.filename} className={styles.courseItem}>
            <button
              className={styles.courseHeader}
              onClick={() => toggleCourse(course.filename)}
              aria-expanded={isExpanded}
              aria-controls={`course-content-${course.filename}`}
              type="button"
            >
              <h2 className={styles.courseTitle}>{displayName}</h2>
              {isExpanded ? (
                <ChevronUp className={styles.courseIcon} aria-hidden="true" />
              ) : (
                <ChevronDown className={styles.courseIcon} aria-hidden="true" />
              )}
            </button>
            <div
              id={`course-content-${course.filename}`}
              className={`${styles.courseContent} ${isExpanded ? styles.open : styles.closed}`}
              aria-hidden={!isExpanded}
            >
              <div className={styles.courseContentInner}>
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
