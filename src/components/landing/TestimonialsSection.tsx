import React from 'react';
const testimonials = [{
  content: 'This system has transformed how we monitor tourist safety. The real-time alerts and AI detection have already prevented several potential incidents.',
  author: 'Sarah Johnson',
  role: 'Tourism Department Director',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}, {
  content: 'As someone who travels frequently to remote locations, the peace of mind this system provides is invaluable. The panic button feature literally saved me during a hiking emergency.',
  author: 'Michael Chen',
  role: 'Adventure Tourist',
  image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}, {
  content: 'The TourGuard system has streamlined our emergency response protocols. The integration with local authorities and clear alert system makes coordination seamless.',
  author: 'David Rodriguez',
  role: 'Emergency Services Coordinator',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}];
const TestimonialsSection: React.FC = () => {
  return <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Tourism Professionals Worldwide
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Hear from the people who rely on our system every day for safety
              and peace of mind.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map(testimonial => <div key={testimonial.author} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">
                      Testimonial
                    </p>
                    <div className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        <span className="text-4xl text-blue-400">"</span>
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={testimonial.image} alt={testimonial.author} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {testimonial.author}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;