"use client"; // This line is correct and necessary for client-side components

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Building,
  Users,
  Award,
  TrendingUp,
  Shield,
  Heart,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Building, label: "Properties Listed", value: "10,000+" },
    { icon: Users, label: "Happy Clients", value: "25,000+" },
    { icon: Award, label: "Awards Won", value: "50+" },
    { icon: TrendingUp, label: "Years Experience", value: "15+" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Every property is verified, and all transactions are secure and transparent, giving you peace of mind.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize our clients' needs, providing personalized service and support every step of the way.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Our team of experts meticulously vets every listing to ensure it meets our high standards of quality.",
    },
  ];

  const team = [
    {
      name: "Muhammed Darboe",
      role: "CTO & Co-Founder",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800", // Added higher resolution image parameter
      bio: "A visionary leader in real estate technology, Muhammed drives innovation to enhance property search and management.",
    },
    {
      name: "Babucarr Manneh",
      role: "COO & Co-Founder",
      image:
        "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800",
      bio: "With background in business, operations, management, and real estate, Babucarr ensures smooth operations and exceptional service delivery.",
    },
    // {
    //   name: "Emily Rodriguez",
    //   role: "Head of Sales",
    //   image:
    //     "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
    //   bio: "An expert negotiator with a proven track record, Emily ensures successful and satisfying property transactions for all clients.",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {" "}
      {/* Set default text color */}
      <Header />
      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
        {/* Optional: Add a subtle abstract pattern or graphic in the background */}
        {/* <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] opacity-10 z-0"></div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              About KërSpace: Your Partner in Property
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
              We're revolutionizing the real estate industry by connecting
              buyers, sellers, and renters through innovative technology and
              unparalleled personalized service.
            </p>
            <Link href="/contact" passHref>
              {" "}
              {/* Use passHref with custom components inside Link */}
              <Button
                size="lg"
                className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up delay-400"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-blue-700">
        {" "}
        {/* Slightly darker blue for stronger contrast */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 shadow-md">
                  {" "}
                  {/* Rounded icons, subtle shadow */}
                  <stat.icon className="h-8 w-8 text-white" />{" "}
                  {/* Icons are white for consistency */}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                  {" "}
                  {/* Larger, bolder values */}
                  {stat.value}
                </div>
                <div className="text-blue-100 text-lg font-medium">
                  {stat.label}
                </div>{" "}
                {/* Larger label */}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {" "}
            {/* Increased gap */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our Vision: Simplifying Your Real Estate Journey
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At KërSpace, we believe that finding the perfect property should
                be simple, transparent, and stress-free. Our mission is to
                empower individuals and families to make informed real estate
                decisions through innovative technology and expert guidance.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you're buying your first home, selling a property, or
                looking for the perfect rental, we're here to make your real
                estate journey smooth and successful, providing unwavering
                support from start to finish.
              </p>
              <Link href="/listings" passHref>
                <Button className="px-8 py-3 text-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300">
                  Explore Properties
                </Button>
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              {" "}
              {/* Rounded corners, stronger shadow */}
              <img
                src="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Higher res image
                alt="Modern office building"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" // Subtle hover zoom
              />
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {" "}
            {/* Increased bottom margin */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These foundational principles guide every action we take and shape
              how we serve our clients and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {" "}
            {/* Increased gap */}
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-8 shadow-xl rounded-2xl bg-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {" "}
                {/* Stronger shadow, rounded, hover effect */}
                <CardContent className="flex flex-col items-center p-0">
                  {" "}
                  {/* Removed default CardContent padding */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 shadow-md">
                    {" "}
                    {/* Larger, fully rounded icon background */}
                    <value.icon className="h-10 w-10 text-blue-600" />{" "}
                    {/* Larger icons */}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {value.description}
                  </p>{" "}
                  {/* Refined text size and leading */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our dedicated professionals bring a wealth of experience and a
              passion for real estate, ensuring exceptional service and results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
            {" "}
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center p-8 shadow-xl rounded-2xl bg-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {" "}
                {/* Consistent card styling */}
                <CardContent className="flex flex-col items-center p-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-100 shadow-md">
                    {" "}
                    {/* Larger, bordered image */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" // Hover zoom on image
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-700 font-semibold mb-4 text-lg">
                    {" "}
                    {/* Stronger blue for role */}
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        {" "}
        {/* Gradient CTA background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Start Your Property Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied clients who have found their perfect
            properties and exceptional service with KërSpace.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {" "}
            {/* Increased gap */}
            <Link href="/listings" passHref>
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-white hover:text-blue-800 text-blue-700 px-8 py-3 text-lg font-semibold rounded-lg shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
