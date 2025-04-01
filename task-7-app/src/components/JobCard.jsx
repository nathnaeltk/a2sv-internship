import Image from 'next/image';
import Link from 'next/link';

const JobCard = ({ job, index }) => {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="bg-white rounded-2xl p-6 shadow-md font-montserrat border border-[#EAECF0] hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12">
            <Image
              src={job.logoUrl || '/placeholder-logo.png'}
              alt={`${job.orgName} logo`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 font-montserrat">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.orgName} • {job.location.join(', ')}</p>
            </div>
            <p className="mt-4 text-gray-700 line-clamp-2">{job.description}</p>
            <div className="mt-4 flex gap-2">
              {job.categories.map((category, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-montserrat ${
                    index === 0 ? (
                      category === 'Education Access and Quality Improvement' ? 'bg-green-600 text-white' :
                      category === 'Youth Empowerment and Development' ? 'bg-orange-600 text-white' :
                      category === 'Orphanages and Child Welfare' ? 'bg-purple-600 text-white' :
                      'bg-gray-600 text-white'
                    ) : (
                      category === 'Education Access and Quality Improvement' ? 'border border-green-600 text-green-600' :
                      category === 'Youth Empowerment and Development' ? 'border border-orange-600 text-orange-600' :
                      category === 'Orphanages and Child Welfare' ? 'border border-purple-600 text-purple-600' :
                      'border border-gray-600 text-gray-600'
                    )
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard; 