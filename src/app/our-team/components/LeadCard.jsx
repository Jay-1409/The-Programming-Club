"use client";

import React from "react";
import Image from "next/image";
import { ShineBorder } from "@/ui-components/ShinyBorder";
import LinkedinButton from "@/ui-components/LinkedinButton";

export default function LeadCard({ member, index, getBorderColor, getGradient }) {

  const getOffset = () => {
    if (index % 3 === 0) return "md:mt-0";
    if (index % 3 === 1) return "md:mt-12";
    return "md:mt-24";
  };

  return (
    <div key={member.name} className={`lead-card ${getOffset()}`}>
      <div
        className="relative group overflow-hidden rounded-2xl h-[400px] w-[300px] mx-auto"
        style={{
          background: getGradient(member.position),
          boxShadow: `0 10px 30px -5px ${getBorderColor(member.position)}30`,
        }}
      >
        <ShineBorder
          borderWidth={2}
          duration={8}
          shineColor={[getBorderColor(member.position), "transparent"]}
          className="absolute inset-0 rounded-2xl z-10"
        />
        {/* Spotlight effect
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 80%)`,
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }}
        /> */}

        {/* Image */}
        <div className="relative w-full h-4/5 overflow-hidden">
          <Image
            src={member.pfpImage}
            alt={member.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="relative bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 h-1/5 flex items-center justify-between px-6 py-auto">
          <div className="flex flex-col gap-2 justify-center items-start h-full">  
          <h3 className="text-lg font-bold">{member.name}</h3>
          <p className="text-md font-medium text-blue-300">{(member.position=="Content & Communications Lead") ? "Content & Comms Lead" : member.position}</p>
          </div>
          <LinkedinButton href={member.linkedinId.startsWith("https://") ? member.linkedinId : `https://${member.linkedinId}`} bgColor={getBorderColor(member.position)} />
        </div>

        {/* Hover info */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/50 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <h3 className="text-xl font-bold mb-2">{member.name}</h3>
          <p className="text-blue-300 font-medium mb-4">{member.position}</p>
          <p className="text-sm mb-4">{member.email}</p>
          {member.linkedinId && (
            <Link
              href={`https://linkedin.com/in/${member.linkedinId}`}
              target="_blank"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              @{member.linkedinId}
            </Link>
          )}
        </div> */}
      </div>
    </div>
  );
}
