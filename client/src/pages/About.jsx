import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full bg-book-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sm font-sans font-bold tracking-widest text-book-rust uppercase mb-4">
            The Vision
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-book-text leading-tight max-w-4xl mx-auto mb-6">
            Redefining the Digital Reading Experience.
          </h1>
          <p className="text-lg text-book-text/70 font-sans max-w-2xl mx-auto">
            BookVerse isn't just another digital library. It is a highly secure,
            meticulously crafted platform designed to bring the world's best
            literature directly to your screens with uncompromising performance.
          </p>
        </div>
      </section>

      {/* The Architecture & Mission */}
      <section className="py-16 bg-white border-y border-book-gray/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square bg-book-teal rounded-sm shadow-xl overflow-hidden relative">
                {/* Placeholder for an aesthetic library/tech image */}
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
                  alt="Library Architecture"
                  className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-book-teal-dark/80 to-transparent"></div>
              </div>
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-book-rust rounded-sm -z-10"></div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif font-semibold text-book-text mb-6">
                Built for Scale and Security
              </h2>
              <p className="font-sans text-book-text/70 leading-relaxed mb-6">
                Under the hood, BookVerse is powered by a robust MERN stack
                architecture. Every component, from the monolithic backend
                structure to the intuitive frontend, has been optimized for
                speed.
              </p>
              <p className="font-sans text-book-text/70 leading-relaxed mb-8">
                Security is our paramount concern. With integrated JWT
                authentication, NoSQL injection prevention, XSS cleanups, and
                secure PDF streaming, the platform guarantees that both user
                data and premium content remain strictly protected.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-book-gray">
                <div>
                  <h4 className="font-serif text-2xl text-book-teal font-bold">
                    100%
                  </h4>
                  <p className="font-sans text-sm text-book-text/60">
                    Secure API Delivery
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-book-teal font-bold">
                    Zero
                  </h4>
                  <p className="font-sans text-sm text-book-text/60">
                    Data Compromise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Code (Developer Section) */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-sans font-bold tracking-widest text-book-rust uppercase mb-4">
            Behind the Code
          </p>
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-book-text mb-8">
            The Architect
          </h2>

          <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-book-gray/30 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-book-teal"></div>
            <p className="font-sans text-lg text-book-text/80 leading-relaxed mb-6">
              BookVerse is developed and maintained by a passionate engineering
              student currently pursuing a B.Tech at SGSITS. The drive to build
              production-ready, full-stack applications is rooted in a
              long-standing foundation of taking ownership and
              responsibility—traits nurtured early on while serving as a head
              boy and disciple minister during school years.
            </p>
            <p className="font-sans text-lg text-book-text/80 leading-relaxed mb-8">
              Navigating the complexities of advanced MERN stack development,
              secure database aggregations, and API design requires immense
              dedication. This journey and work ethic are deeply inspired by the
              constant, unwavering support of a mother and father, who remain
              the central pillars of strength behind every line of code written.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-book-gray/50 mt-8">
              <span className="font-serif italic text-book-text/60">
                "Engineering the future, one elegant solution at a time."
              </span>
              <Link
                to="/contact"
                className="text-sm font-sans font-medium text-book-teal hover:text-book-rust transition-colors flex items-center gap-2"
              >
                Get in Touch
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
