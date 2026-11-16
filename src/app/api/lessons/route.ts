import { NextResponse } from "next/server";
import {
  confirmLessonTheory,
  getLessonDetail,
  saveLessonNote,
  submitLessonQuiz,
} from "@/lib/services/lessons";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("id");
    if (!lessonId) {
      return NextResponse.json(
        { error: "Thiếu mã bài học (?id=...)." },
        { status: 400 }
      );
    }

    const detail = getLessonDetail(lessonId);
    return NextResponse.json(detail);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể tải bài học.";
    const status = message.includes("Không tìm thấy") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = body.action;
    const lessonId = body.lessonId;

    if (typeof action !== "string" || typeof lessonId !== "string") {
      return NextResponse.json(
        { error: "Thiếu action hoặc lessonId." },
        { status: 400 }
      );
    }

    switch (action) {
      case "confirm_theory": {
        const result = confirmLessonTheory(lessonId);
        return NextResponse.json(result);
      }

      case "submit_quiz": {
        const answers =
          body.answers && typeof body.answers === "object"
            ? (body.answers as Record<string, string>)
            : {};
        const result = submitLessonQuiz(lessonId, answers);
        return NextResponse.json(result);
      }

      case "save_note": {
        const content = typeof body.content === "string" ? body.content : "";
        const result = saveLessonNote(lessonId, content);
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { error: "Hành động bài học không được hỗ trợ." },
          { status: 400 }
        );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Lỗi xử lý bài học.";
    const status =
      message.includes("Không tìm thấy") ||
      message.includes("Vui lòng") ||
      message.includes("tối đa")
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
