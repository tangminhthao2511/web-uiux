import { CURRICULUM_LESSONS, CURRICULUM_STAGES } from "@/lib/curriculum/seed-data";
import type { LessonStructuredContent } from "@/types/learning";
import { STAGES_1_TO_3_OVERRIDES } from "./stages-1-to-3";
import { STAGES_4_TO_8_CONTENT } from "./stages-4-to-8";

const CONTENT_BY_ID = new Map<string, LessonStructuredContent>();
for (const item of STAGES_4_TO_8_CONTENT) {
  CONTENT_BY_ID.set(item.lessonId, item);
}

export function getLessonStructuredContent(
  lessonId: string
): LessonStructuredContent {
  const exact = CONTENT_BY_ID.get(lessonId);
  if (exact) return exact;

  const lesson = CURRICULUM_LESSONS.find((l) => l.id === lessonId);
  const stage = CURRICULUM_STAGES.find((s) => s.id === lesson?.stageId);
  const override = STAGES_1_TO_3_OVERRIDES[lessonId];

  return {
    lessonId,
    theoryBlocks: override?.theoryBlocks ?? [
      {
        heading: lesson?.title ?? "Nội dung cốt lõi",
        points: [
          lesson?.summary ?? "",
          ...(lesson?.objectives ?? []),
        ].filter(Boolean),
      },
    ],
    whyItMatters:
      override?.whyItMatters ??
      `Khái niệm này thuộc ${stage ? `Chặng ${stage.order}: ${stage.title}` : "nền tảng UX"} — giúp tránh thiết kế theo cảm tính và tạo nền cho giai đoạn thực hành Junior.`,
    whenToUse: override?.whenToUse ?? {
      useWhen: [
        "Ở giai đoạn khám phá bài toán hoặc trước khi chốt luồng thiết kế.",
      ],
      limitations: [
        "Cần điều chỉnh độ sâu theo thời gian và quy mô thực tế của dự án.",
      ],
    },
    realWorldExamples: override?.realWorldExamples ?? [
      {
        product: "Sản phẩm số phổ biến (Web & Mobile)",
        context: lesson?.englishSubtitle ?? "Product workflow",
        takeaway:
          "Áp dụng đúng phương pháp giúp rút ngắn vòng lặp sửa lại giao diện khi lên code.",
      },
    ],
    goodVsBad: override?.goodVsBad ?? {
      scenario: lesson?.title ?? "Áp dụng vào sản phẩm thực tế",
      badTitle: "Bỏ qua bước chuẩn hóa, vẽ thẳng giao diện theo sở thích cá nhân",
      badReason: "Dễ bỏ sót nhu cầu người dùng hoặc trạng thái ngoại lệ.",
      goodTitle: "Bám sát mục tiêu người dùng, làm rõ luồng và kiểm tra lại với tiêu chí cụ thể",
      goodReason: "Thiết kế có lập luận rõ ràng và dễ bảo vệ khi review.",
    },
    practicalPrompt:
      override?.practicalPrompt ??
      `Ghi lại 1 ví dụ thực tế bạn từng gặp liên quan tới "${lesson?.title ?? "chủ đề này"}" vào mục Ghi chú cá nhân.`,
    quiz: override?.quiz ?? [
      {
        id: `q-${lessonId}-1`,
        question: `Mục tiêu chính của bài "${lesson?.title ?? ""}" là gì?`,
        options: [
          {
            id: "a",
            text: lesson?.objectives[0] ?? "Nắm vững quy trình thiết kế lấy người dùng làm trung tâm",
          },
          {
            id: "b",
            text: "Chỉ tập trung trang trí màu sắc mà không cần xét ngữ cảnh sử dụng",
          },
        ],
        correctOptionId: "a",
        explanation:
          lesson?.summary ??
          "Mọi bài học đều hướng tới khả năng áp dụng vào thiết kế thực tế.",
      },
      {
        id: `q-${lessonId}-2`,
        question: "Theo nguyên tắc MeowProduct, khi nào một bài học được tính là hoàn thành?",
        options: [
          { id: "a", text: "Ngay khi bấm mở bài học lần đầu" },
          {
            id: "b",
            text: "Khi đạt đủ tiêu chí: nắm lý thuyết, vượt qua Knowledge Check và thực hành/ghi chú",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Hoàn thành dựa trên bằng chứng hiểu và áp dụng, không chỉ vì đã mở xem.",
      },
    ],
    sourceLinks: [
      {
        label: "Nielsen Norman Group — UX Foundations",
        url: "https://www.nngroup.com/articles/",
        reviewedAt: "2026-11-14",
      },
    ],
  };
}
