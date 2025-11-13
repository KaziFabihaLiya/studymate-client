import React, { useState, useEffect } from "react";
import Carousol from "../component/Carousol";
import { Link, useLoaderData } from "react-router";
import PartnerCard from "../component/PartnerCard";
import ExtraSections from "../component/ExtraSections";
import { Sparkles, ArrowRight } from "lucide-react";
import api from "../utils/api";

const Homepage = () => {
  const data = useLoaderData(); // Top-rated partner profiles
  console.log("Top-rated data:", data);

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get("/testimonials"); // Use api instance for consistency
        console.log("Testimonials data:", data);
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <div>
        <Carousol />

        {/* Top Rated Partners Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-white/60 dark:from-gray-800/60 to-white/30 dark:to-gray-700/30 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-6">
                <Sparkles
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={2.5}
                />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Excellence in Education
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-700 dark:from-gray-300 via-gray-900 dark:via-gray-100 to-black dark:to-white bg-clip-text text-transparent mb-4">
                Top Rated Partners
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Connect with our highest-rated study partners who have
                consistently delivered exceptional results
              </p>
            </div>

            {/* Partners Grid */}
            {data && data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.map((partner) => (
                    <PartnerCard key={partner._id} partner={partner} />
                  ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 dark:from-gray-300 via-gray-900 dark:via-gray-100 to-black dark:to-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-gray-500/50 dark:hover:shadow-gray-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <Link to="/AllPartnerProfile">
                      <div className="relative flex items-center space-x-2">
                        <span>View All Partners</span>
                        <ArrowRight
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          strokeWidth={2.5}
                        />
                      </div>
                    </Link>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <Sparkles
                    className="w-10 h-10 text-gray-400 dark:text-gray-500"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No top-rated partners available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        <ExtraSections testimonials={testimonials} />
      </div>
    </>
  );
};

export default Homepage;
