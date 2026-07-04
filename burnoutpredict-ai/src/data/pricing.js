const pricing = [
  {
    id: 1,
    plan: "Starter",
    price: "₹1,999",
    description: "Perfect for small teams up to 25 employees.",
    button: "Choose Plan",
    featured: false,
    features: [
      "Up to 25 Employees",
      "Burnout Risk Score",
      "Wellness Dashboard",
      "Email Alerts",
      "Monthly Reports",
    ],
  },
  {
    id: 2,
    plan: "Professional",
    price: "₹7,999",
    description: "Ideal for growing organizations up to 200 employees.",
    button: "Most Popular",
    featured: true,
    features: [
      "Up to 200 Employees",
      "Everything in Starter",
      "AI Recommendations",
      "Leave Pattern Analysis",
      "Team Health Analytics",
      "Priority Support",
    ],
  },
  {
    id: 3,
    plan: "Enterprise",
    price: "Custom",
    description: "Unlimited employees. Custom integrations & dedicated support.",
    button: "Contact Sales",
    featured: false,
    features: [
      "Unlimited Employees",
      "Everything in Professional",
      "Custom HRMS Integration",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "On-premise Deployment",
    ],
  },
];

export default pricing;