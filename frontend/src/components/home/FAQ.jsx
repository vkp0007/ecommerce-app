import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqData = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3–5 business days depending on your location."
  },
  {
    question: "Can I return products?",
    answer:
      "Yes, products can be returned within 7 days if unused and in original condition."
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes! Check our Hot Deals and New Arrivals sections for the best offers."
  },
  {
    question: "Is payment secure?",
    answer:
      "We use secure payment gateways and encrypted transactions to ensure safe checkout."
  }
];

const FAQ = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <section className="max-w-4xl mx-auto px-4 py-8 rounded-xl shadow-md ">

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {faqData.map((item, index) => (

          <div
            key={index}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >

            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold"
            >

              <span>{item.question}</span>

              <FiChevronDown
                className={`transition-transform duration-300 text-gray-500 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />

            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                {item.answer}
              </div>
            )}

          </div>

        ))}

      </div>

    </section>

  );

};

export default FAQ;