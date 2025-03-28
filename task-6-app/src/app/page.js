import JobList from '../components/JobList';
import jobsData from '../../jobs.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JobList jobs={jobsData.job_postings} />
    </main>
  );
}
