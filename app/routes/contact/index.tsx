import type { Route } from "./+types";

// action is a server side logic
// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData();
//   const name = formData.get('name');
//   const email = formData.get('email') as string;
//   const subject = formData.get('subject') as string;
//   const message = formData.get('message') as string;
  
//   const errors: Record<string, string> = {}; 

//   if (!name) errors.name = 'Name is required.';

//   if (!email) {
//     errors.email = 'Email is required.';
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     errors.email = 'Invalid email format.';
//   }

//   if (!subject) errors.subject = 'Subject is required.';
  
//   if (!message) errors.message = 'Message is required.';
  
//   // Check if there is anything in the errors object
//   if (Object.keys(errors).length > 0) {
//     return { errors };
//   }

//   const data = {
//     name,
//     email,
//     subject,
//     message,
//   };

  

//   return { message: 'Form submitted successfully!', data };
// }

// whatever action returns after being called from Form it returns actionData and it's injected by ReactRouter and it rerenders route with the result
const ContactPage = ({ actionData }: Route.ComponentProps) => {

  return (
    <section className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        📬 Contact Me
      </h2>

      {/* Form here automatically calls the route's action */}
      <form action='https://formspree.io/f/mjgvreyr' method="post" className='space-y-6'>
        {/* Full Name */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-300'
          >
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-300'
          >
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor='subject'
            className='block text-sm font-medium text-gray-300'
          >
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-300'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer'
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactPage;