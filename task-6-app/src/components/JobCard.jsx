import Image from 'next/image';
import Link from 'next/link';

const JobCard = ({ job, index }) => {
  return (
    <Link href={`/jobs/${index}`} className="block">
      <div className="bg-white rounded-2xl p-6 shadow-md font-montserrat border border-[#EAECF0] hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12">
            <Image
              src={job.image}
              alt={`${job.company} logo`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1 font-montserrat">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company} • {job.about.location}</p>
            </div>
            <p className="mt-4 text-gray-700">{job.description}</p>
            <div className="mt-4 flex gap-2">
              {job.about.categories.map((category, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-montserrat ${
                    index === 0 ? (
                      category === 'Marketing' ? 'bg-green-600 text-white' :
                      category === 'Design' ? 'bg-orange-600 text-white' :
                      category === 'IT' ? 'bg-purple-600 text-white' :
                      category === 'Development' ? 'bg-blue-600 text-white' :
                      category === 'Data Science' ? 'bg-yellow-600 text-white' :
                      category === 'Customer Service' ? 'bg-pink-600 text-white' :
                      'bg-gray-600 text-white'
                    ) : (
                      category === 'Marketing' ? 'border border-green-600 text-green-600' :
                      category === 'Design' ? 'border border-orange-600 text-orange-600' :
                      category === 'IT' ? 'border border-purple-600 text-purple-600' :
                      category === 'Development' ? 'border border-blue-600 text-blue-600' :
                      category === 'Data Science' ? 'border border-yellow-600 text-yellow-600' :
                      category === 'Customer Service' ? 'border border-pink-600 text-pink-600' :
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