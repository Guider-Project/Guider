"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import TrackingContent from "./content";

export default function Tracking() {
  const [busses, setBusses] = useState([]);

  useEffect(() => {
    async function getBusses() {
      try {
        const { data } = await axios.get("/api/busses");
        setBusses(data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting busses");
      }
    }

    getBusses();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mt-5 mx-10 mb-5">
        {busses.map((bus) => {
          return (
            <div className="w-full rounded-2xl border-2">
              <div className="text-center text-2xl font-bold mt-3">{bus.name}</div>
              <TrackingContent />
            </div>
          );
        })}
      </div>
    </>
  );
}
