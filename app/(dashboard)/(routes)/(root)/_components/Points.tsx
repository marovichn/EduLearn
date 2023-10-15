"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { InfoCard } from "./info-card";
import { FcNumericalSorting12 } from "react-icons/fc";
import { FilePieChart, FilePieChartIcon } from "lucide-react";

interface PointsProps {}

const Points: FC<PointsProps> = ({}) => {
  const [points, setPoints] = useState(0);
  const [role, setRole] = useState("");
  useEffect(() => {
    axios.get("/api/check-role").then((roleRes) => {
      setRole(roleRes.data.role);
      if (roleRes.data.role === "Student") {
        axios
          .get("/api/get-points")
          .then((pointsRes: any) => setPoints(pointsRes.data));
      }
    });
  }, []);
  return (
    <>
      {role === "Student" ? (
        <InfoCard
          icon={FilePieChart}
          variant='success'
          numberOfItems={points}
          label="All your EduPoints:"
          points={true}
        />
      ) : null}
    </>
  );
};

export default Points;
