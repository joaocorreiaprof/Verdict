import { useState } from "react";
import "./index.css";

type FaqItem = {
  question: string;
  answer: string;
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      question: "What is Verdict?",
      answer:
        "Verdict is an all-in-one platform for tracking and discovering movies, TV shows, video games, and books. It helps you organize what you've watched, played, or read, and plan what to enjoy next.",
    },
    {
      question: "Is Verdict free to use?",
      answer:
        "Yes! Verdict offers a free tier with all the basic features you need to track your entertainment. We also offer premium plans with additional features for power users.",
    },
    {
      question: "Can I sync my data across devices?",
      answer:
        "Absolutely. Your Verdict account syncs across all your devices, so you can access your lists and progress whether you're on your phone, tablet, or computer.",
    },
    {
      question: "How does the recommendation system work?",
      answer:
        "Our algorithm analyzes what you've enjoyed (based on your ratings and activity) and suggests similar content, as well as popular items among users with similar tastes.",
    },
    {
      question: "Can I import my data from other tracking services?",
      answer:
        "Yes, we support importing from several popular services. Look for the 'Import' option in your account settings after signing up.",
    },
    {
      question: "How do I share my lists with friends?",
      answer:
        "You can generate shareable links for any of your lists, or connect with friends directly on Verdict to see each other's activity (with privacy controls).",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="landing-sections" id="faq">
      <h1 className="landing-sections-title">Frequently Asked Questions</h1>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {item.question}
              <span className="faq-toggle">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className="faq-answer"
              role="region"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
