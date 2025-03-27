'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individual students and small classes',
    features: [
      'Basic proctoring features',
      'Up to 50 students',
      'Standard support',
      'Basic analytics',
      'Limited practice tests',
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Ideal for educators and institutions',
    features: [
      'Advanced AI proctoring',
      'Unlimited students',
      'Priority support',
      'Advanced analytics',
      'Unlimited practice tests',
      'Custom branding',
      'API access',
      'Team collaboration',
      'Advanced security features',
      'Dedicated account manager',
    ],
    cta: 'Start Pro Trial',
    href: '/auth/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'White-label solution',
      'SLA guarantee',
      '24/7 dedicated support',
      'Custom feature development',
      'Advanced security audit',
      'Multiple admin accounts',
      'Custom reporting',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PricingPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core proctoring features.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl shadow-sm p-8 ${
                tier.popular
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className={`ml-2 ${tier.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className={`mt-4 ${tier.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                  {tier.description}
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className={`h-6 w-6 flex-shrink-0 ${
                        tier.popular ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={`ml-3 ${tier.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`block w-full py-3 px-6 rounded-lg text-center font-semibold ${
                  tier.popular
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {tier.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Need a custom solution?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Contact our sales team to discuss your specific requirements and get a tailored quote.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Sales
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
} 