"use client";

import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { fetchJobs } from '../services/api';

const JobList = () => {
  const [sortBy, setSortBy] = useState('most-relevant');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to load opportunities. Please try again later.');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 font-montserrat">
        <div className="text-center">
          <p className="text-[#475467]">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 font-montserrat">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-montserrat">
      <div className="flex justify-between items-center mb-8">
        <div className="font-montserrat">
          <h1 className="text-[32px] font-semibold text-[#101828]">Opportunities</h1>
          <p className="text-[#475467] mt-1">Showing {jobs.length} results</p>
        </div>
        <div className="flex items-center gap-2 font-montserrat">
          <span className="text-[#344054] text-sm">Sort by:</span>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-0 pr-5 py-0 bg-transparent border-none text-[#101828] text-sm font-semibold focus:outline-none cursor-pointer font-montserrat"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="most-relevant" className="font-montserrat">Most relevant</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <JobCard key={job.id || index} job={job} index={index} />
        ))}
      </div>
    </div>
  );
};

export default JobList; 