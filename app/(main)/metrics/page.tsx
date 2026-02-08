/**
 * Page de métriques - Redirige vers /a-propos?view=metrics (US-12.5)
 */

import { redirect } from 'next/navigation';

export default function MetricsPage() {
  redirect('/a-propos?view=metrics');
}
