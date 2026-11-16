import type { KnowledgeTestQuestion, KnowledgeTrackId } from "@/types/learning";
import { TRACK_1_UX_CORE_QUESTIONS } from "./tests/track-1-ux-core";
import { TRACK_1_UX_CORE_EXTRA } from "./tests/track-1-ux-core-extra";
import { TRACK_2_VISUAL_UI_QUESTIONS } from "./tests/track-2-visual-ui";
import { TRACK_2_VISUAL_UI_EXTRA } from "./tests/track-2-visual-ui-extra";
import { TRACK_3_GUIDELINES_QUESTIONS } from "./tests/track-3-guidelines";
import { TRACK_3_GUIDELINES_EXTRA } from "./tests/track-3-guidelines-extra";
import { TRACK_4_FIGMA_SYSTEMS_QUESTIONS } from "./tests/track-4-figma-systems";
import { TRACK_4_FIGMA_SYSTEMS_EXTRA } from "./tests/track-4-figma-systems-extra";
import { TRACK_5_UI_TO_FE_QUESTIONS } from "./tests/track-5-ui-to-fe";
import { TRACK_5_UI_TO_FE_EXTRA } from "./tests/track-5-ui-to-fe-extra";

export interface KnowledgeTrackMilestoneMeta {
  milestone: 1 | 2 | 3 | 4 | 5;
  label: string;
}

export interface KnowledgeTrackMeta {
  id: KnowledgeTrackId;
  order: number;
  title: string;
  subtitle: string;
  milestone1Label: string;
  milestone2Label: string;
  milestones: KnowledgeTrackMilestoneMeta[];
}

export const KNOWLEDGE_TRACKS: KnowledgeTrackMeta[] = [
  {
    id: "ux-core",
    order: 1,
    title: "Chặng 1 · UX Core, Research & BA",
    subtitle: "Heuristics, Laws of UX, Research, IA/Flow & Làm việc BA/PM",
    milestone1Label: "Chủ đề 1: Heuristics & Usability",
    milestone2Label: "Chủ đề 2: Laws of UX & Hành vi",
    milestones: [
      { milestone: 1, label: "Chủ đề 1: Heuristics & Usability (20 câu)" },
      { milestone: 2, label: "Chủ đề 2: Laws of UX & Hành vi (20 câu)" },
      { milestone: 3, label: "Chủ đề 3: UX Research & Usability Test (20 câu)" },
      { milestone: 4, label: "Chủ đề 4: IA, User Flow & Microcopy (20 câu)" },
      { milestone: 5, label: "Chủ đề 5: Product Thinking & Phối hợp BA/PM (20 câu)" },
    ],
  },
  {
    id: "visual-ui",
    order: 2,
    title: "Chặng 2 · Visual UI & Typography",
    subtitle: "8pt Grid, Hierarchy, Typography, Dark Mode, Data UI & Motion",
    milestone1Label: "Chủ đề 1: 8pt Grid & Gestalt",
    milestone2Label: "Chủ đề 2: Typography & Color",
    milestones: [
      { milestone: 1, label: "Chủ đề 1: 8pt Grid, Gestalt & Whitespace (20 câu)" },
      { milestone: 2, label: "Chủ đề 2: Typography, Scale & Màu sắc (20 câu)" },
      { milestone: 3, label: "Chủ đề 3: Dark Mode, Surfaces & Contrast (20 câu)" },
      { milestone: 4, label: "Chủ đề 4: Tables, Dashboards & Forms (20 câu)" },
      { milestone: 5, label: "Chủ đề 5: Icons, Imagery & Motion UI (20 câu)" },
    ],
  },
  {
    id: "guidelines",
    order: 3,
    title: "Chặng 3 · Quy chuẩn Web & Mobile",
    subtitle: "WCAG 2.2 AA, Apple HIG, Material 3, Responsive & Privacy",
    milestone1Label: "Chủ đề 1: WCAG 2.2 Accessibility",
    milestone2Label: "Chủ đề 2: iOS HIG & Material 3",
    milestones: [
      { milestone: 1, label: "Chủ đề 1: WCAG 2.2 Contrast & Reflow (20 câu)" },
      { milestone: 2, label: "Chủ đề 2: Apple HIG & Material 3 (20 câu)" },
      { milestone: 3, label: "Chủ đề 3: Responsive, Browser & Viewport (20 câu)" },
      { milestone: 4, label: "Chủ đề 4: Mobile Patterns & Safe Area (20 câu)" },
      { milestone: 5, label: "Chủ đề 5: WCAG Focus/Auth, Privacy & L10n (20 câu)" },
    ],
  },
  {
    id: "figma-systems",
    order: 4,
    title: "Chặng 4 · Figma & Design Systems",
    subtitle: "Auto Layout, Variants/Slots, 3-Tier Variables, Prototype & Handoff",
    milestone1Label: "Chủ đề 1: Auto Layout & Layout",
    milestone2Label: "Chủ đề 2: Variables & Dev Mode",
    milestones: [
      { milestone: 1, label: "Chủ đề 1: Auto Layout & Responsive Frame (20 câu)" },
      { milestone: 2, label: "Chủ đề 2: Variables, Tokens & Dev Mode (20 câu)" },
      { milestone: 3, label: "Chủ đề 3: Components, Props & Slots (20 câu)" },
      { milestone: 4, label: "Chủ đề 4: Prototyping & Smart Animate (20 câu)" },
      { milestone: 5, label: "Chủ đề 5: Governance & Bàn giao BA/Dev (20 câu)" },
    ],
  },
  {
    id: "ui-to-fe",
    order: 5,
    title: "Chặng 5 · UI → Frontend Code",
    subtitle: "Flexbox/Grid, Tailwind Tokens, ARIA, React States & DevTools QA",
    milestone1Label: "Chủ đề 1: CSS Layout & Responsive",
    milestone2Label: "Chủ đề 2: Semantic HTML & ARIA",
    milestones: [
      { milestone: 1, label: "Chủ đề 1: CSS Flex, Grid & Box Model (20 câu)" },
      { milestone: 2, label: "Chủ đề 2: Semantic HTML & A11y Code (20 câu)" },
      { milestone: 3, label: "Chủ đề 3: Tailwind Tokens & Modern CSS (20 câu)" },
      { milestone: 4, label: "Chủ đề 4: React UI States, Forms & Optimistic (20 câu)" },
      { milestone: 5, label: "Chủ đề 5: DevTools QA, CLS/LCP & FE Collab (20 câu)" },
    ],
  },
];

export const KNOWLEDGE_TEST_QUESTIONS: KnowledgeTestQuestion[] = [
  ...TRACK_1_UX_CORE_QUESTIONS,
  ...TRACK_1_UX_CORE_EXTRA,
  ...TRACK_2_VISUAL_UI_QUESTIONS,
  ...TRACK_2_VISUAL_UI_EXTRA,
  ...TRACK_3_GUIDELINES_QUESTIONS,
  ...TRACK_3_GUIDELINES_EXTRA,
  ...TRACK_4_FIGMA_SYSTEMS_QUESTIONS,
  ...TRACK_4_FIGMA_SYSTEMS_EXTRA,
  ...TRACK_5_UI_TO_FE_QUESTIONS,
  ...TRACK_5_UI_TO_FE_EXTRA,
];
