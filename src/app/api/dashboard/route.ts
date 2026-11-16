import { NextResponse } from "next/server";
import {
  clearCompletedTodayTasks,
  createCustomResource,
  createDailyTask,
  getDashboardSnapshot,
  resetDashboardToInitial,
  setGamificationEnabled,
  setRightPanelOpen,
  setTrackMode,
  startOrResumeLesson,
  submitMiniGameAttempt,
  submitPracticeWork,
  toggleDailyTask,
} from "@/lib/services/dashboard";
import type {
  LearnerTrackMode,
  ResourceTrack,
  TaskCategory,
} from "@/types/learning";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = getDashboardSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("Failed to load dashboard snapshot:", error);
    return NextResponse.json(
      { error: "Không thể tải dữ liệu bảng điều khiển học tập." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = body.action;

    if (typeof action !== "string") {
      return NextResponse.json(
        { error: "Thiếu hành động cần thực hiện." },
        { status: 400 }
      );
    }

    switch (action) {
      case "start_lesson": {
        if (typeof body.lessonId !== "string" || !body.lessonId.trim()) {
          return NextResponse.json(
            { error: "Mã bài học không hợp lệ." },
            { status: 400 }
          );
        }
        const snapshot = startOrResumeLesson(body.lessonId);
        return NextResponse.json(snapshot);
      }

      case "toggle_task": {
        if (typeof body.taskId !== "string" || !body.taskId.trim()) {
          return NextResponse.json(
            { error: "Mã nhiệm vụ không hợp lệ." },
            { status: 400 }
          );
        }
        const snapshot = toggleDailyTask(body.taskId);
        return NextResponse.json(snapshot);
      }

      case "add_task": {
        const title = typeof body.title === "string" ? body.title : "";
        const description =
          typeof body.description === "string" ? body.description : "";
        const category = (
          typeof body.category === "string" ? body.category : "planning"
        ) as TaskCategory;

        const snapshot = createDailyTask({ title, description, category });
        return NextResponse.json(snapshot);
      }

      case "clear_completed_tasks": {
        const snapshot = clearCompletedTodayTasks();
        return NextResponse.json(snapshot);
      }

      case "toggle_gamification": {
        if (typeof body.enabled !== "boolean") {
          return NextResponse.json(
            { error: "Giá trị cài đặt gamification không hợp lệ." },
            { status: 400 }
          );
        }
        const snapshot = setGamificationEnabled(body.enabled);
        return NextResponse.json(snapshot);
      }

      case "set_track_mode": {
        const mode = (
          body.mode === "all" ? "all" : "junior"
        ) as LearnerTrackMode;
        const snapshot = setTrackMode(mode);
        return NextResponse.json(snapshot);
      }

      case "set_right_panel": {
        if (typeof body.open !== "boolean") {
          return NextResponse.json(
            { error: "Giá trị đóng/mở thanh bên phải không hợp lệ." },
            { status: 400 }
          );
        }
        const snapshot = setRightPanelOpen(body.open);
        return NextResponse.json(snapshot);
      }

      case "reset_progress": {
        const snapshot = resetDashboardToInitial();
        return NextResponse.json(snapshot);
      }

      case "add_resource": {
        const snapshot = createCustomResource({
          title: typeof body.title === "string" ? body.title : "",
          track: (
            typeof body.track === "string" ? body.track : "personal"
          ) as ResourceTrack,
          summary: typeof body.summary === "string" ? body.summary : "",
          keyPointsText:
            typeof body.keyPointsText === "string" ? body.keyPointsText : "",
          sourceName:
            typeof body.sourceName === "string" ? body.sourceName : "",
          sourceUrl: typeof body.sourceUrl === "string" ? body.sourceUrl : "",
        });
        return NextResponse.json(snapshot);
      }

      case "submit_minigame": {
        if (
          typeof body.challengeId !== "string" ||
          typeof body.selectedOptionId !== "string"
        ) {
          return NextResponse.json(
            { error: "Thiếu thông tin câu trả lời Mini-Game." },
            { status: 400 }
          );
        }
        const result = submitMiniGameAttempt({
          challengeId: body.challengeId,
          selectedOptionId: body.selectedOptionId,
        });
        return NextResponse.json(result);
      }

      case "submit_practice": {
        if (typeof body.briefId !== "string") {
          return NextResponse.json(
            { error: "Thiếu mã đề bài thực hành." },
            { status: 400 }
          );
        }
        const result = await submitPracticeWork({
          briefId: body.briefId,
          figmaUrl: typeof body.figmaUrl === "string" ? body.figmaUrl : undefined,
          imageDataUrl:
            typeof body.imageDataUrl === "string"
              ? body.imageDataUrl
              : undefined,
          rationale: typeof body.rationale === "string" ? body.rationale : "",
          selfScores:
            body.selfScores && typeof body.selfScores === "object"
              ? (body.selfScores as Record<string, number>)
              : {},
        });
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { error: "Hành động không được hỗ trợ." },
          { status: 400 }
        );
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Đã xảy ra lỗi khi xử lý yêu cầu.";
    const status =
      message.includes("Không tìm thấy") ||
      message.includes("phải từ") ||
      message.includes("không hợp lệ") ||
      message.includes("Vui lòng") ||
      message.includes("Link ") ||
      message.includes("Ảnh ")
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
