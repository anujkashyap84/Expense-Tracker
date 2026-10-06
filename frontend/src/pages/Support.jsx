import React, { useState } from "react";
import {
  Search,
  MessageCircle,
  Mail,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react";

const Support = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // =========================================================
  // SUPPORT CATEGORIES
  // =========================================================

  const supportCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn how to set up and use your expense tracker.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      border: "border-orange-400",
      faqCategory: "getting-started",
    },

    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Understand your income, expenses and financial insights.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      border: "border-blue-400",
      faqCategory: "analytics",
    },

    {
      icon: CreditCard,
      title: "Income & Expenses",
      description: "Manage transactions, categories and financial records.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      border: "border-purple-400",
      faqCategory: "transactions",
    },

    {
      icon: ShieldCheck,
      title: "Account & Security",
      description: "Manage your account and keep your data secure.",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      border: "border-green-400",
      faqCategory: "security",
    },

    {
      icon: Settings,
      title: "Settings",
      description: "Customize your account and application preferences.",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      border: "border-yellow-400",
      faqCategory: "settings",
    },

    {
      icon: HelpCircle,
      title: "Other Questions",
      description: "Can't find what you're looking for? Start here.",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-500",
      border: "border-cyan-400",
      faqCategory: "other",
    },
  ];

  // =========================================================
  // FAQ DATA
  // =========================================================

  const faqs = [
    {
      category: "getting-started",
      question: "How do I add a new expense?",
      answer:
        "Go to the Expenses section from the sidebar and click the Add Expense button. Enter the required details and save the transaction.",
    },

    {
      category: "getting-started",
      question: "How can I add my income?",
      answer:
        "Open the Income section from the sidebar, click Add Income, enter the income details and save the transaction.",
    },

    {
      category: "transactions",
      question: "Can I edit or delete a transaction?",
      answer:
        "Yes. Open the Income or Expenses section and use the available edit or delete actions for the transaction you want to manage.",
    },

    {
      category: "analytics",
      question: "Why are my dashboard totals not updating?",
      answer:
        "First refresh the dashboard. If the issue continues, check whether your transaction was successfully saved and make sure you are logged into the correct account.",
    },

    {
      category: "security",
      question: "How can I keep my account secure?",
      answer:
        "Use a strong password, never share your login credentials, and log out when using the application on a shared device.",
    },

    {
      category: "analytics",
      question: "How can I view my expense reports?",
      answer:
        "Open the dashboard to view your expense summaries, transaction information and spending by category.",
    },

    {
      category: "transactions",
      question: "Can I view all my transactions?",
      answer:
        "Yes. Open the Income or Expenses section to view your saved transactions and manage them.",
    },

    {
      category: "settings",
      question: "Where can I manage my settings?",
      answer:
        "Open the settings section of your account to manage the available application preferences.",
    },

    {
      category: "other",
      question: "How can I contact support?",
      answer:
        "Use the Contact Support button at the bottom of this page to contact the support team.",
    },
  ];

  // =========================================================
  // SEARCH FAQ
  // =========================================================

  const filteredFaqs = faqs.filter((faq) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return false;

    return (
      faq.question.toLowerCase().includes(searchText) ||
      faq.answer.toLowerCase().includes(searchText)
    );
  });

  // =========================================================
  // DISPLAYED FAQS
  // =========================================================

  const displayedFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  // =========================================================
  // CATEGORY CLICK
  // =========================================================

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.faqCategory);
    setOpenFaq(null);

    setTimeout(() => {
      document.getElementById("faq-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // =========================================================
  // FAQ TOGGLE
  // =========================================================

  const toggleFaq = (faq) => {
    const faqIndex = faqs.findIndex((item) => item.question === faq.question);

    setOpenFaq(openFaq === faqIndex ? null : faqIndex);
  };

  // =========================================================
  // SEARCH RESULT CLICK
  // =========================================================

  const openFaqFromSearch = (faq) => {
    const actualIndex = faqs.findIndex(
      (item) => item.question === faq.question,
    );

    setSelectedCategory(null);
    setOpenFaq(actualIndex);
    setSearchOpen(false);

    setTimeout(() => {
      document.getElementById(`faq-${actualIndex}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const clearSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  // =========================================================
  // VIEW ALL QUESTIONS
  // =========================================================

  const viewAllQuestions = () => {
    setSelectedCategory(null);
    setOpenFaq(null);
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            HOW CAN WE HELP
        ====================================================== */}

        <section className="relative rounded-xl border-2 border-indigo-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Decorative background layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100" />

            <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-orange-100" />

            <div className="absolute right-24 top-16 h-16 w-16 rounded-full bg-cyan-100" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* Help Icon */}

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100">
                <HelpCircle size={28} className="text-indigo-600" />
              </div>

              {/* Heading */}

              <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
                How can we help?
              </h1>

              {/* Description */}

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Find answers, explore helpful resources, or contact our support
                team.
              </p>

              {/* Search */}

              <div className="relative mt-7 w-full max-w-2xl">
                <div
                  className={`flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 ${
                    searchOpen
                      ? "border-indigo-400 bg-white ring-2 ring-indigo-100"
                      : ""
                  }`}
                >
                  <Search size={20} className="mr-3 shrink-0 text-gray-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSearch(value);
                      setSearchOpen(value.trim().length > 0);
                    }}
                    onFocus={() => {
                      if (search.trim()) {
                        setSearchOpen(true);
                      }
                    }}
                    placeholder="Search for answers..."
                    className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="ml-2 shrink-0 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}

                {searchOpen && search.trim() && (
                  <div className="absolute left-0 right-0 top-full z-100 mt-2 overflow-hidden rounded-xl border border-indigo-200 bg-white text-left shadow-lg">
                    {filteredFaqs.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {filteredFaqs.map((faq) => (
                          <button
                            key={faq.question}
                            type="button"
                            onClick={() => openFaqFromSearch(faq)}
                            className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-indigo-50"
                          >
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                              <HelpCircle
                                size={16}
                                className="text-indigo-600"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800">
                                {faq.question}
                              </p>

                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                {faq.answer}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-5 py-8 text-center">
                        <Search size={28} className="mx-auto text-gray-300" />

                        <p className="mt-3 text-sm font-semibold text-gray-700">
                          No results found
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-400">
                          Try searching for expense, income, account, security,
                          dashboard, or transaction.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SUPPORT CATEGORIES
        ====================================================== */}

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-800">Explore Support</h2>

            <p className="mt-1 text-sm text-gray-500">
              Find the information you need quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportCategories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  type="button"
                  key={category.title}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    ${category.border}
                    group w-full rounded-xl border bg-white p-5 text-left
                    shadow-sm transition-all duration-300
                    hover:-translate-y-1 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-indigo-200
                  `}
                >
                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center rounded-xl
                      ${category.iconBg}
                      transition-transform duration-300
                      group-hover:scale-105
                    `}
                  >
                    <Icon size={21} className={category.iconColor} />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-gray-800">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <HelpCircle size={13} className="text-gray-400" />

                    <span className="text-xs text-gray-400">
                      View related help
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}

        <section id="faq-section" className="mt-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {selectedCategory
                  ? "Showing questions related to your selected support category."
                  : "Quick answers to common questions."}
              </p>
            </div>

            {selectedCategory && (
              <button
                type="button"
                onClick={viewAllQuestions}
                className="w-fit rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
              >
                View All Questions
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-blue-400 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            {displayedFaqs.length > 0 ? (
              displayedFaqs.map((faq) => {
                const faqIndex = faqs.findIndex(
                  (item) => item.question === faq.question,
                );

                return (
                  <div
                    id={`faq-${faqIndex}`}
                    key={faq.question}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className="text-sm font-semibold text-gray-800 sm:text-base">
                        {faq.question}
                      </span>

                      {openFaq === faqIndex ? (
                        <ChevronUp
                          size={20}
                          className="shrink-0 text-blue-500"
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className="shrink-0 text-gray-400"
                        />
                      )}
                    </button>

                    {openFaq === faqIndex && (
                      <div className="px-5 pb-5">
                        <div className="rounded-lg bg-blue-50 p-4">
                          <p className="text-sm leading-6 text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-10 text-center">
                <HelpCircle size={30} className="mx-auto text-gray-300" />

                <p className="mt-3 text-sm font-medium text-gray-700">
                  No questions available
                </p>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            CONTACT SUPPORT
        ====================================================== */}

        <section className="mb-8 mt-8">
          <div className="rounded-xl border border-green-400 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <MessageCircle size={24} className="text-green-500" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Still need help?
                  </h2>

                  <p className="mt-1 max-w-lg text-sm text-gray-500">
                    Our support team is here to help you with any questions or
                    problems.
                  </p>
                </div>
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=anujkashyap2027@gmail.com&su=Smart%20Expense%20Tracker%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-600 hover:shadow-md"
              >
                <Mail size={17} />
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
