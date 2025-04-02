"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchJobDetails } from '@/services/api';
import Link from 'next/link';
import { PlusCircleIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const JobDetails = ({ params }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchJobDetails(params.id);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        console.error('Error loading job details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 font-montserrat">
        <div className="text-center">
          <p className="text-[#475467]">Loading job details...</p>
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

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 font-montserrat">
        <div className="text-center">
          <p className="text-[#475467]">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 font-montserrat">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#25324B] mb-6 inline-flex items-center hover:text-[#1D2939]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M15.8332 10H4.1665" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99984 15.8334L4.1665 10L9.99984 4.16669" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to jobs
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#EAECF0]">
          <div className="flex items-start gap-4 mb-8">
            <div className="relative w-16 h-16">
              <Image
                src={job.logoUrl || '/placeholder-logo.png'}
                alt={`${job.orgName} logo`}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-[#25324B] mb-1">{job.title}</h1>
              <p className="text-[#25324B]">{job.orgName} • {job.location.join(', ')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#25324B] mb-4">Description</h2>
                <p className="text-[#25324B] leading-6">{job.description}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#25324B] mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.split('\n').map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#25324B]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.99967 12L10.333 14.3333L15.9997 8.66666" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#25324B] mb-4">Ideal Candidate</h2>
                <div className="space-y-4">
                  <p className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#c0c5c3] mt-2 flex-shrink-0 opacity-70"></div>
                    <span className="text-[#25324B]">{job.idealCandidate}</span>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#25324B] mb-4">When & Where</h2>
                <div className="flex items-start gap-2 text-[#25324B]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>{job.whenAndWhere}</p>
                </div>
              </section>
            </div>

            <div>
              <div className="bg-[#F9FAFB] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#25324B] mb-6">About</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PlusCircleIcon className="w-5 h-5 text-[#26A4FF]" />
                    <div>
                      <p className="text-sm text-[#25324B]">Posted On</p>
                      <p className="text-sm font-medium text-[#25324B]">{new Date(job.datePosted).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6s3 3.5 3 6-3 6-3 6-3-3.5-3-6 3-6 3-6z" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 14h10" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p className="text-sm text-[#25324B]">Deadline</p>
                      <p className="text-sm font-medium text-[#25324B]">{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#26A4FF]" />
                    <div>
                      <p className="text-sm text-[#25324B]">Location</p>
                      <p className="text-sm font-medium text-[#25324B]">{job.location.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#26A4FF]" />
                    <div>
                      <p className="text-sm text-[#25324B]">Start Date</p>
                      <p className="text-sm font-medium text-[#25324B]">{new Date(job.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#26A4FF]" />
                    <div>
                      <p className="text-sm text-[#25324B]">End Date</p>
                      <p className="text-sm font-medium text-[#25324B]">{new Date(job.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.categories.map((category, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${
                          category === 'Education Access and Quality Improvement' ? 'bg-green-100 text-green-600' :
                          category === 'Youth Empowerment and Development' ? 'bg-orange-100 text-orange-600' :
                          category === 'Orphanages and Child Welfare' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-[#F9F5FF] text-[#25324B]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetails; 