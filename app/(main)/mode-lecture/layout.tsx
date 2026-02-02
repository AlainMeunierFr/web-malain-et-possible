/**
 * Layout mode lecture : importe uniquement la feuille dédiée (pas content-styles.css).
 */

import './mode-lecture.css';

export default function ModeLectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
