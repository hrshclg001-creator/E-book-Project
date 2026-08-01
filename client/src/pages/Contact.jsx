import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aage chalkar hum backend API integrate karenge (e.g., Nodemailer use karke)
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full bg-book-cream min-h-screen pb-20">
      {/* Page Header */}
      <section className="pt-20 pb-12 text-center px-4">
        <p className="text-sm font-sans font-bold tracking-widest text-book-rust uppercase mb-4">
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-book-text mb-4">
          Let's Start a Conversation.
        </h1>
        <p className="text-book-text/70 font-sans max-w-xl mx-auto">
          Whether you have a question about our collections, need technical
          support, or want to discuss engineering opportunities, feel free to
          reach out.
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white border border-book-gray shadow-sm">
          {/* Contact Information (Left Side) */}
          <div className="bg-book-teal text-book-cream p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-medium text-white mb-6">
                Contact Information
              </h2>
              <p className="font-sans text-book-cream/80 mb-10 leading-relaxed">
                Fill up the form and our team will get back to you within 24
                hours. We are always open to discussing new projects, creative
                ideas, or opportunities.
				Let me know about any future improvements in this project.
              </p>

              <div className="space-y-8 font-sans">
                <div className="flex items-start gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-book-rust mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-book-cream/70 text-sm mt-1">
                      harsh.mehra2504@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-book-rust mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-book-cream/70 text-sm mt-1">
                      SGSITS Campus,
                      <br />
                      Indore, Madhya Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-16 flex gap-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-book-rust transition-colors duration-300"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="p-10 md:p-14">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-sans font-medium text-book-text/80 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-sans font-medium text-book-text/80 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-sans font-medium text-book-text/80 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-sans font-medium text-book-text/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-transparent border-b border-book-gray focus:border-book-teal py-2 text-book-text outline-none transition-colors resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-book-text hover:bg-book-teal text-white font-sans font-medium py-4 rounded-sm transition-colors duration-300 mt-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
