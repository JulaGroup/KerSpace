"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { optimizeCloudinaryImage } from "@/lib/cloudinary";

interface SwipeableGalleryProps {
  images: string[];
  title: string;
}

export function SwipeableGallery({ images, title }: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setIsFullScreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, nextImage, prevImage]);

  return (
    <>
      {/* Main Gallery */}
      <div
        className="relative h-[70vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden cursor-pointer group rounded-xl"
        onClick={() => setIsFullScreen(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={optimizeCloudinaryImage(images[currentIndex], {
            width: 1200,
            height: 900,
            quality: "auto",
          })}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority={currentIndex === 0}
        />

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-lg text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md shadow-lg border-0 w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md shadow-lg border-0 w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </>
        )}

        {/* Swipe Hint */}
        <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs">
          Swipe to browse
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                index === currentIndex
                  ? "border-blue-500 shadow-md scale-105"
                  : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={optimizeCloudinaryImage(image, {
                  width: 200,
                  height: 200,
                  quality: 80,
                })}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-full h-screen p-0 flex flex-col bg-black/95">
          <div className="flex justify-between items-center p-4 bg-black/80 text-white">
            <div className="text-lg font-semibold truncate pr-4">
              {title} - {currentIndex + 1} of {images.length}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullScreen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div
            className="relative flex-1 bg-black flex items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={optimizeCloudinaryImage(images[currentIndex], {
                width: 1920,
                height: 1080,
                quality: "auto",
              })}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
