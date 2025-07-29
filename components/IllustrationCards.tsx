import React, { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface IllustrationCardProps {
  title: string;
  description: string;
  link?: string;
  illustration: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export function IllustrationCard({
  title,
  description,
  link,
  illustration,
  onClick,
  style,
}: IllustrationCardProps) {
  const cardContent = (
    <div
      className="group bg-white p-6 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      style={style}
    >
      <div className="h-32 w-full mb-4 flex justify-center items-center">
        <Image
          width={200}
          height={200}
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
  );

  if (onClick) {
    return (
      <div onClick={onClick} tabIndex={0} role="button" style={style}>
        {cardContent}
      </div>
    );
  }
  if (link) {
    return <Link href={link}>{cardContent}</Link>;
  }
  return cardContent;
}
