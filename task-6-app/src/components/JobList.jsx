import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-epilogue">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Job List</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList; 