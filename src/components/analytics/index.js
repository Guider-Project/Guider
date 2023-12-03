import axios from "axios";
import { useEffect, useState } from "react";

import ReservationsChart from "@/components/analytics/components/lineChart";

export default function AnalyticsComponent() {
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });

    axios.get("/api/busses").then((response) => {
      setBuses(response.data);
    });

    axios.get("/api/reservations").then((response) => {
      setReservations(response.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <h1 className="text-2xl text-center font-bold w-full">User registrations</h1>

            <ReservationsChart data={users} lable="User registrations" />
          </div>

          <div>
            <h1 className="text-2xl text-center font-bold w-full">Reservations</h1>

            <ReservationsChart data={reservations} lable="Reservations" />
          </div>
        </div>
      </div>
    </>
  );
}
