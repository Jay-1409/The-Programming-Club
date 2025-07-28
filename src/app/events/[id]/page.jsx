"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import { Calendar, MapPin, Users, Clock, Info, ArrowLeft } from "lucide-react";
import { BorderBeam } from "@/ui-components/BorderBeam";
import Loader from "@/ui-components/Loader1";
import ShinyButton from "@/ui-components/ShinyButton";
import RichTextRenderer from "@/app/Components/RichTextRenderer";
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export default function EventPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/get/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          const eventDate = new Date(data.event.date);

          data.event.formattedDate = eventDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          setEvent(data.event);
        } else {
          setEvent(null);
        }
      } catch (error) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchWinners() {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/winners/get/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setWinners(data.event.winners || []);
        } else {
          setWinners([]);
        }
      } catch (error) {
        setWinners([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
    fetchWinners();
  }, [id]);

  if (loading || !event) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-content bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto">
              <span
                className={`${jetbrainsMono.className} inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm bg-white/10 backdrop-blur-md mb-2 sm:mb-4`}
              >
                {event.type}
              </span>
              <h1
                className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight`}
              >
                {event.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {event.formattedDate}
                </span>
                {event.time ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {event.time}
                  </span>
                ) : null}
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  {event.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 relative overflow-hidden"
            >
              <h2
                className={`${jetbrainsMono.className} text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-300`}
              >
                About the Event
              </h2>
              <RichTextRenderer 
                content={event.description} 
                className="mb-4 sm:mb-6 text-sm sm:text-base"
              />
              {event.more_details && (
                <RichTextRenderer 
                  content={event.more_details} 
                  className="mt-6"
                />
              )}
              <BorderBeam
                size={100}
                duration={16}
                delay={0}
                colorFrom="#3b82f6"
                colorTo="#a855f7"
              />
            </motion.div>

            {/* Rules Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 relative overflow-hidden"
            >
              <h2
                className={`${jetbrainsMono.className} text-2xl underline sm:text-3xl font-bold mb-3 sm:mb-4 text-blue-300`}
              >
                Rules
              </h2>
              {event.rules && (
                <div className="text-gray-200 leading-relaxed mb-4 sm:mb-6">
                  <RichTextRenderer content={event.rules} />
                </div>
              )}
              <BorderBeam
                size={100}
                duration={16}
                delay={0.5}
                colorFrom="#3b82f6"
                colorTo="#a855f7"
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 h-fit lg:sticky lg:top-4"
          >
            <h2
              className={`${jetbrainsMono.className} text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-blue-300`}
            >
              Event Details
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                {event.capacity ? (
                  <>
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      Capacity: {event.capacity || "N/A"}
                    </span>
                  </>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                {event.duration ? (
                  <>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      Duration: {event.duration || "N/A"}
                    </span>
                  </>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
                <span className="text-sm sm:text-base">Status: {event.status}</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {event.registrationOpen ? (
                <ShinyButton
                  onClick={() => {
                    window.open(`${event.formLink}`, "_blank");
                  }}
                  className="w-full px-4 sm:px-6 text-sm sm:text-base"
                  title="Register Now"
                />
              ) : (
                <ShinyButton
                  disabled
                  onClick={() => {}}
                  className="w-full px-4 sm:px-6 text-sm sm:text-base"
                  title="Registration Closed"
                />
              )}
              {id === "684678799f621d3cfb9ced3e" && (
                <ShinyButton
                  className="w-full mt-2"
                  onClick={() => window.open(`https://pclub-au.vercel.app/WMC`, "_blank")}
                  title="WMC Problem Statements"
                />
              )}
              <Link
                href="/events"
                className="w-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Back to Events
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}