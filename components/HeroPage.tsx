import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  Calendar,
  CheckCircle,
  Clock,
  Layout,
  List,
  Target,
} from "lucide-react";

export default function Home() {
  const heroText =
    "Welcome to TaskMaster, your ultimate task management solution. Stay organized, boost productivity, and achieve your goals with our intuitive platform.";

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <BackgroundBeams />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 px-6 py-4 flex justify-between items-center border-b bg-background/50 backdrop-blur-sm z-20">
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6" />
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Testimonials
              </a>
            </nav>
            <ThemeToggle />
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </header>

        <main className="pt-[72px]">
          {/* Hero Section */}
          <section className="py-20 text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                Manage Tasks with Ease
              </h1>
              <div className="mb-12">
                <TextGenerateEffect words={heroText} />
              </div>
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Powerful Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <List className="h-8 w-8 mb-4" />,
                    title: "Task Management",
                    description:
                      "Create, organize, and track tasks with ease. Set priorities and deadlines.",
                  },
                  {
                    icon: <Calendar className="h-8 w-8 mb-4" />,
                    title: "Calendar Integration",
                    description:
                      "View tasks in a calendar format. Schedule and plan your work effectively.",
                  },
                  {
                    icon: <Layout className="h-8 w-8 mb-4" />,
                    title: "Project Dashboard",
                    description:
                      "Get a clear overview of your projects and track progress in real-time.",
                  },
                  {
                    icon: <CheckCircle className="h-8 w-8 mb-4" />,
                    title: "Progress Tracking",
                    description:
                      "Monitor task completion and project milestones with visual indicators.",
                  },
                  {
                    icon: <Clock className="h-8 w-8 mb-4" />,
                    title: "Time Management",
                    description:
                      "Track time spent on tasks and improve your productivity.",
                  },
                  {
                    icon: <Target className="h-8 w-8 mb-4" />,
                    title: "Goal Setting",
                    description:
                      "Set and track goals. Break them down into actionable tasks.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Simple, Transparent Pricing
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "Starter",
                    price: "0",
                    description: "Perfect for individuals getting started",
                    features: [
                      "Up to 3 projects",
                      "Basic task management",
                      "1GB storage",
                      "Community support",
                    ],
                  },
                  {
                    title: "Professional",
                    price: "9",
                    description: "For teams and power users",
                    features: [
                      "Unlimited projects",
                      "Advanced analytics",
                      "10GB storage",
                      "Priority support",
                      "Team collaboration",
                      "Custom workflows",
                    ],
                    popular: true,
                  },
                  {
                    title: "Enterprise",
                    price: "Custom",
                    description: "Tailored for organizations",
                    features: [
                      "Unlimited everything",
                      "Dedicated success manager",
                      "SSO & SAML",
                      "Custom integrations",
                      "Advanced security",
                      "24/7 premium support",
                    ],
                  },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-card/50 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all ${
                      plan.popular ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        {plan.price !== "Custom" && (
                          <span className="text-muted-foreground">/mo</span>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                What Our Users Say
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    quote:
                      "TaskMaster has completely transformed how our team works. We've seen a 40% increase in productivity since adopting it!",
                    author: "Sarah Johnson",
                    role: "Project Manager at TechCorp",
                  },
                  {
                    quote:
                      "The best task management solution I've used. Intuitive interface and powerful features make it a joy to use daily.",
                    author: "Michael Chen",
                    role: "Freelance Developer",
                  },
                  {
                    quote:
                      "From personal tasks to team projects, TaskMaster handles everything seamlessly. The mobile app is particularly impressive.",
                    author: "Emma Wilson",
                    role: "Startup Founder",
                  },
                  {
                    quote:
                      "The customer support is exceptional. They helped us customize the platform to fit our unique workflow perfectly.",
                    author: "David Martinez",
                    role: "Operations Director",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <blockquote className="space-y-4">
                      <p className="text-muted-foreground italic">
                        "{testimonial.quote}"
                      </p>
                      <footer className="flex items-center">
                        <div className="mr-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {testimonial.author.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Updated CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Transform Your Productivity Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join over 50,000 teams and individuals who have revolutionized
                their workflow with TaskMaster. Start your free trial and
                experience the difference.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/auth">
                  <Button size="lg" className="text-lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-lg">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6" />
                  <h3 className="text-xl font-bold">TaskMaster</h3>
                </div>
                <p className="text-muted-foreground">
                  Your complete task management solution for increased
                  productivity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#about"
                      className="text-muted-foreground hover:text-primary"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#careers"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#privacy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#terms"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
              © 2024 TaskMaster. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
