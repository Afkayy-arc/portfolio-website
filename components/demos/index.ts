import type { ComponentType } from "react";
import SeatMap from "./SeatMap";
import ClinicFlow from "./ClinicFlow";
import ReviewFlow from "./ReviewFlow";
import RagSearch from "./RagSearch";
import EtlPipeline from "./EtlPipeline";
import TalkvaneCall from "./TalkvaneCall";

// Keyed by Demo.id in constants/data.ts
export const demoComponents: Record<string, ComponentType> = {
  talkvane: TalkvaneCall,
  seatmap: SeatMap,
  clinic: ClinicFlow,
  tapreview: ReviewFlow,
  rag: RagSearch,
  etl: EtlPipeline,
};
