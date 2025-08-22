import React from "react";
import {
  HelpCircle,
  Users,
  WifiOff,
  ShieldQuestion,
  CreditCard,
} from "lucide-react";

const FAQPage = () => {
  const faqs = [
    {
      category: "General Information",
      icon: <HelpCircle className="h-6 w-6 text-yellow-400 mr-4" />,
      questions: [
        {
          q: "Who can participate in the tournament?",
          a: "The tournament is open to all Indian citizens aged 18 and above. Minors must have guardian consent. All players must have a valid government-issued ID.",
        },
        {
          q: "How do I register my team?",
          a: 'You can register your team on the "Team Registration" page. You will need to fill in your team details and pay the registration fee using our secure payment gateway.',
        },
        {
          q: "What is the tournament format?",
          a: "The tournament will follow a multi-stage format, including qualifiers, quarterfinals, semifinals, and a grand final. Match format will be Squad TPP.",
        },
      ],
    },
    {
      category: "Match Rules & Technical Issues",
      icon: <WifiOff className="h-6 w-6 text-yellow-400 mr-4" />,
      questions: [
        {
          q: "What if a player disconnects during a match?",
          a: "Disconnections due to personal internet issues are a player's responsibility. The match will not be paused or restarted. The player may rejoin the match if possible.",
        },
        {
          q: "What is the minimum BGMI account level required?",
          a: "All players must have a BGMI account level between 30 and 40 (inclusive) to be eligible to play.",
        },
      ],
    },
    {
      category: "Payments & Refunds",
      icon: <CreditCard className="h-6 w-6 text-yellow-400 mr-4" />,
      questions: [
        {
          q: "Is the registration fee refundable?",
          a: "The registration fee is non-refundable. A refund will only be issued if the entire tournament is cancelled by the organizers or if there is a duplicate payment.",
        },
        {
          q: "What payment methods are available?",
          a: "We accept all major credit/debit cards, UPI, and net banking through our secure Cashfree payment gateway.",
        },
      ],
    },
    {
      category: "Cheating & Penalties",
      icon: <ShieldQuestion className="h-6 w-6 text-yellow-400 mr-4" />,
      questions: [
        {
          q: "What is the policy on cheating?",
          a: "We have a zero-tolerance policy for cheating. Any use of unauthorized software, hacks, or glitches will result in immediate disqualification and a permanent ban from all our tournaments for the entire squad.",
        },
        {
          q: "What happens if a player is found hacking?",
          a: "If a player is caught hacking, their entire team will be disqualified, and all their accounts will be permanently banned from our tournaments. This is a strict measure to ensure fair play.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen  text-gray-200 font-sans p-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Frequently <span className="text-yellow-400">Asked Questions</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Find answers to the most common questions about the tournament.
        </p>
      </header>

      {/* FAQ Accordion Sections */}
      <main className="container mx-auto max-w-4xl">
        {faqs.map((faqCategory, index) => (
          <section
            key={index}
            className="mb-8 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          >
            <div className="flex items-center mb-6">
              {faqCategory.icon}
              <h2 className="text-2xl font-bold text-white">
                {faqCategory.category}
              </h2>
            </div>
            <div className="space-y-4">
              {faqCategory.questions.map((item, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-gray-800 p-4 rounded-lg cursor-pointer"
                >
                  {/* For an interactive accordion, you would use React state here. */}
                  {/* Example: onClick={() => toggleAccordion(qIndex)} */}
                  <h3 className="flex justify-between items-center text-lg font-semibold text-white">
                    {item.q}
                    {/* Add a dynamic icon like ChevronDown based on accordion state */}
                  </h3>
                  <div className="mt-2 text-gray-400 leading-relaxed">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default FAQPage;
