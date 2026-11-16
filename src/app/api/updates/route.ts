import { NextResponse } from "next/server";
import { getDashboardSnapshot } from "@/lib/services/dashboard";
import {
  getCompletedCodeLabIds,
  getGuidelineQuizState,
  getHotTopics,
  getKnowledgeBankState,
  submitCodeLabChallenge,
  submitGuidelineQuiz,
  submitKnowledgeMilestone,
  syncLiveHotTopics,
} from "@/lib/services/updates";
import type { KnowledgeTrackId } from "@/types/learning";

export async function GET() {
  try {
    return NextResponse.json({
      hotTopics: getHotTopics(),
      guidelineQuiz: getGuidelineQuizState(),
      codeLabCompletedIds: getCompletedCodeLabIds(),
      knowledgeBank: getKnowledgeBankState(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể tải cập nhật UI/UX.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action?: string;
      answers?: Record<string, string>;
      moduleId?: string;
      selectedOptionId?: string;
      trackId?: KnowledgeTrackId;
      milestone?: 1 | 2 | 3 | 4 | 5;
    };

    if (body.action === "sync_hot_topics") {
      const syncResult = await syncLiveHotTopics();
      const snapshot = getDashboardSnapshot();
      return NextResponse.json({ syncResult, snapshot });
    }

    if (body.action === "submit_guideline_quiz") {
      if (!body.answers || typeof body.answers !== "object") {
        return NextResponse.json(
          { error: "Thiếu danh sách câu trả lời." },
          { status: 400 }
        );
      }
      const quizResult = submitGuidelineQuiz(body.answers);
      const snapshot = getDashboardSnapshot();
      return NextResponse.json({ quizResult, snapshot });
    }

    if (body.action === "complete_code_lab") {
      if (!body.moduleId || !body.selectedOptionId) {
        return NextResponse.json(
          { error: "Thiếu moduleId hoặc đáp án." },
          { status: 400 }
        );
      }
      const labResult = submitCodeLabChallenge(
        body.moduleId,
        body.selectedOptionId
      );
      const snapshot = getDashboardSnapshot();
      return NextResponse.json({ labResult, snapshot });
    }

    if (body.action === "submit_knowledge_milestone") {
      const m = body.milestone;
      if (
        !body.trackId ||
        (m !== 1 && m !== 2 && m !== 3 && m !== 4 && m !== 5) ||
        !body.answers
      ) {
        return NextResponse.json(
          { error: "Thiếu trackId, milestone hoặc danh sách đáp án." },
          { status: 400 }
        );
      }
      const milestoneResult = submitKnowledgeMilestone(
        body.trackId,
        m,
        body.answers
      );
      const snapshot = getDashboardSnapshot();
      return NextResponse.json({ milestoneResult, snapshot });
    }

    return NextResponse.json(
      { error: "Action không hợp lệ." },
      { status: 400 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Lỗi xử lý yêu cầu cập nhật.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
