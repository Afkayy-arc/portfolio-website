import type { ComponentType } from "react";
import SeatMap from "./SeatMap";
import ClinicFlow from "./ClinicFlow";
import ReviewFlow from "./ReviewFlow";
import RagSearch from "./RagSearch";
import EtlPipeline from "./EtlPipeline";

// Keyed by Demo.id in constants/data.ts
export const demoComponents: Record<string, ComponentType> = {
  seatmap: SeatMap,
  clinic: ClinicFlow,
  tapreview: ReviewFlow,
  rag: RagSearch,
  etl: EtlPipeline,
};
