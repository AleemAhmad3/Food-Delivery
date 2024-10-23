const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-5 relative">
      <div className="w-full max-w-4xl bg-gray-100 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightColor"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightColor"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightColor"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brightColor text-white py-2 rounded-lg hover:bg-brightColorDark transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Address:</span> 1234 Street Name,
              City, State, 56789
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Phone:</span> (+92) 3123456789
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              contact@yourcompany.com
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4 text-lg">
                <a
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  href="https://www.facebook.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  href="https://twitter.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  href="https://www.instagram.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
