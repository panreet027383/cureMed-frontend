import React, { useEffect, useState } from "react";

const carouselImages = [
  "https://articles-1mg.gumlet.io/articles/wp-content/uploads/2024/08/shutterstock_2378382317.jpg?compress=true&quality=80&w=1000&dpr=2.6",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aYpNutApEdJ9oy9_u76mPgOxqS9kjzZSZA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnroWUazd2wyIG9BLS1ZiKFbEBoz97V01BJw&s",
  "https://www.healthychildren.org/SiteCollectionImagesArticleImages/dose-of-cough-syrup.jpg?RenditionID=3",
];

const services = [
  {
    id: 1,
    title: "Free Medicine Distribution",
    desc: "Distribute unused or surplus medicines donated by individuals to the underprivileged.",
    img: "https://img.icons8.com/color/96/medical-doctor.png",
  },
  {
    id: 2,
    title: "Blood Donation",
    desc: "We organize donation drives across cities.",
    img: "https://img.icons8.com/color/96/blood-donation.png",
  },
  {
    id: 3,
    title: "Community Help",
    desc: "Helping communities in times of need.",
    img: "https://img.icons8.com/color/96/helping-hand.png",
  },
  {
    id: 4,
    title: "Mental Support",
    desc: "Free therapy and helpline access.",
    img: "https://img.icons8.com/color/96/brain.png",
  },
];

const team = [
  {
    id: 1,
    name: "Rajesh Bansal",
    role: "Project Manager",
    img: "sir.jpg",
    as : "Author of Real Java",
  },
  {
    id: 2,
    name: "Parneet Kaur",
    role: "Lead Developer",
    img: "prnit.jpg",
    as : "Student of B.Tech (CSE) ",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Carousel */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Our Services */}
      <section className="py-16 px-6 bg-black">
        <h3 id="services" className="text-4xl font-bold text-center text-amber-500 mb-12" >Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="bg-zinc-900 p-6 rounded-lg shadow-lg text-center">
              <img src={service.img} alt={service.title} className="mx-auto mb-4 w-16 h-16" />
              <h3 className="text-xl font-semibold mb-2 text-amber-400">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 bg-zinc-800">
        <h3 id="team" className="text-4xl font-bold text-center text-amber-500 mb-12">Our Team</h3>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member) => (
            <div key={member.id} className="text-center max-w-xs text-white">
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-full mx-auto object-cover shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-amber-400">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
              <p className="text-gray-300">{member.as}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 px-6 bg-slate-900">
        <h3 id="contact" className="text-4xl font-bold text-center text-amber-500 mb-8">Contact</h3>
        <div className="w-full h-96 shadow-md rounded-lg overflow-hidden max-w-6xl mx-auto">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13776.616225353203!2d74.9607548!3d30.2074855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732d415f47415%3A0xe9f58efb4b06c7c8!2sBangalore%20Computer%20Education!5e0!3m2!1sen!2sin!4v1690059199210!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;

