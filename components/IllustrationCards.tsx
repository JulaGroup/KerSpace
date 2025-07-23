import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function IllustrationCard({
  title,
  description,
  link,
  illustration,
}: {
  title: string;
  description: string;
  link: string;
  illustration: string;
}) {
  return (
    <Link href={link}>
      <div className="group bg-white p-6 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
        <div className="h-32 w-full mb-4 flex justify-center items-center">
          <img
            src={illustration}
            alt={title}
            className="h-36 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          {description}
        </p>
        <div className="text-blue-600 font-medium inline-flex items-center">
          Explore <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
