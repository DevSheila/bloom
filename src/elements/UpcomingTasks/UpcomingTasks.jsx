import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  GiWaterDrop,
  GiSpade,
  GiCrossMark,
  GiFarmer,
  GiPlantRoots,
} from "react-icons/gi";
import { IoCutSharp } from "react-icons/io5";
import {
  PiBinocularsDuotone,
  PiCalendarBlankLight,
  PiCalendarDotBold,
  PiMapPinArea,
  PiRulerThin,
  PiStethoscopeFill,
} from "react-icons/pi";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  getDiagnosisDataByUserId,
  updateActionStatus,
} from "@/services/diagnoseService";
import SpinLoader from "../Loaders/SpinLoader";
import UpcomingTasksEmptyState from "../EmptyState/UpcomingTasksEmptyState";

export function UpcomingTasks({ userId }) {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingUpdates, setPendingUpdates] = useState(new Set());

  const conditionIcons = {
    Watering: <GiWaterDrop className="text-white text-xl" />,
    Pruning: <IoCutSharp className="text-white text-xl" />,
    Treatment: <PiStethoscopeFill className="text-white text-xl" />,
    Fertilizing: <GiSpade className="text-white text-xl" />,
    Prevention: <GiCrossMark className="text-white text-xl" />,
    Monitoring: <PiRulerThin className="text-white text-xl" />,
    Observation: <PiBinocularsDuotone className="text-white text-xl" />,
    Maintenance: <GiFarmer className="text-white text-xl" />,
    Environment: <PiMapPinArea className="text-white text-xl" />,
    Soil: <GiPlantRoots className="text-white text-xl" />,
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    if (!userId) return;

    try {
      const records = await getDiagnosisDataByUserId(userId);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const tasks = records
        .flatMap((diagnosis) => {
          return (diagnosis.schedule_for_recovery || []).flatMap(
            (day, dayIndex) => {
              const dayDate = new Date(day.day);
              if (dayDate >= today && dayDate <= nextWeek) {
                return (day.actions || []).map((action, actionIndex) => ({
                  id: `${diagnosis.id}-${dayIndex}-${actionIndex}`,
                  diagnosisId: diagnosis.id,
                  plantName: diagnosis.plant_name,
                  dayIndex,
                  actionIndex,
                  date: dayDate,
                  ...action,
                  photo: diagnosis.user_photos?.[0] || "/plant-placeholder.jpg",
                }));
              }
              return [];
            }
          );
        })
        .filter((task) => task)
        .sort((a, b) => a.date - b.date);

      setUpcomingTasks(tasks);
    } catch (error) {
      console.error("Error fetching upcoming tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (task) => {
    if (pendingUpdates.has(task.id)) return;

    setPendingUpdates((prev) => new Set(prev).add(task.id));
    const newStatus = !task.status;

    setUpcomingTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );

    try {
      const success = await updateActionStatus(
        task.diagnosisId,
        task.dayIndex,
        task.actionIndex,
        newStatus
      );

      if (!success) {
        setUpcomingTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...t, status: !newStatus } : t
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setUpcomingTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: !newStatus } : t
        )
      );
    } finally {
      setPendingUpdates((prev) => {
        const newSet = new Set(prev);
        newSet.delete(task.id);
        return newSet;
      });
    }
  };

  if (loading) {
    return <SpinLoader />;
  }

  const visibleTasks = upcomingTasks.filter((task) => !task.status);

  if (visibleTasks.length === 0) {
    return <UpcomingTasksEmptyState />;
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {visibleTasks.map((task) => {
          const isUpdating = pendingUpdates.has(task.id);

          return (
            <figure key={task.id} className="relative shrink-0">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={task.photo}
                  alt={task.plantName}
                  className="aspect-[3/4] object-cover w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                  <div className="mb-2">
                    <div className="flex items-center gap-3 mb-1">
                      {conditionIcons[task.category]}
                      <span className="text-sm font-medium text-white">
                        {task.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <PiCalendarDotBold className="text-white text-xl" />
                      <span className="text-sm font-medium text-white">
                        {new Date(task.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-2 right-2"
                  onClick={() => handleToggleStatus(task)}
                  disabled={isUpdating}
                >
                  {task.status ? (
                    <FaCheckCircle className="text-white text-xl" />
                  ) : (
                    <FaRegCircle className="text-white text-xl" />
                  )}
                </div>
              </div>
              <span className="font-semibold line-clamp-1">
                {task.plantName}
              </span>
            </figure>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
