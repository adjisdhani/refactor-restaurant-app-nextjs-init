import React from 'react';

export default function Loading({ dynamicMessage = "Loading restaurants..." }: { dynamicMessage?: string }) {
  return <p className="text-center text-gray-500">{dynamicMessage}</p>;
}