import Image from 'next/image';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md font-epilogue">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
          </div>
          <p className="mt-4 text-gray-700">{job.description}</p>
          <div className="mt-4 flex gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  index === 0 ? (
                    tag === 'In Person' ? 'bg-green-600 text-white' :
                    tag === 'Education' ? 'bg-orange-600 text-white' :
                    tag === 'IT' ? 'bg-purple-600 text-white' :
                    tag === 'Remote' ? 'bg-blue-600 text-white' :
                    tag === 'Content' ? 'bg-yellow-600 text-white' :
                    tag === 'Writing' ? 'bg-pink-600 text-white' :
                    'bg-gray-600 text-white'
                  ) : (
                    tag === 'In Person' ? 'border border-green-600 text-green-600' :
                    tag === 'Education' ? 'border border-orange-600 text-orange-600' :
                    tag === 'IT' ? 'border border-purple-600 text-purple-600' :
                    tag === 'Remote' ? 'border border-blue-600 text-blue-600' :
                    tag === 'Content' ? 'border border-yellow-600 text-yellow-600' :
                    tag === 'Writing' ? 'border border-pink-600 text-pink-600' :
                    'border border-gray-600 text-gray-600'
                  )
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 