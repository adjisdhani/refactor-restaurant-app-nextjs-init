"use client";

import Image from "next/image";
import type { 
    Review 
} from "@/types/main";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
      <Image
          src={review.avatar}  
          alt={review.name}    
          width={64}           
          height={64}          
          className="rounded-full object-cover"
        />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">{review.name}</h4>
          <span className="text-yellow-500 text-sm">⭐ {review.rating}</span>
        </div>
        <p className="text-gray-600 text-sm sm:text-base mt-1 leading-relaxed">{review.text}</p>
      </div>
    </div>
  );
}
