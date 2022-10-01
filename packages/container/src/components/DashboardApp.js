import React, { useEffect, useRef } from "react";
import { mount as mountDashboard } from "dashboard/DashboardApp";

export default function DashboardApp() {
  const ref = useRef();

  useEffect(() => {
    mountDashboard(ref.current);
  }, []);

  return <div ref={ref}></div>;
}
