import type {
  HotTopic,
  StandardGuidelineQuizQuestion,
} from "@/types/learning";

export const CURATED_HOT_TOPICS: HotTopic[] = [
  {
    id: "hot-figma-config-2025-2026",
    title: "Figma Config 2025–2026: Sites, Make, Motion, Code Layers & Variables AI",
    badge: "HOT",
    platform: "Figma",
    summary:
      "Figma mở rộng từ công cụ vẽ static UI sang interactive motion trên canvas, code layers và publish trực tiếp từ design system token.",
    keyTakeaways: [
      "Figma Motion cho phép chỉnh timeline animation trực tiếp trên canvas thay vì phải export qua app khác.",
      "Figma Make & Code Layers kết nối prototype với repository/code thật thông qua Design Tokens & Code Connect.",
      "Junior Designer cần chuẩn hóa Variables (color/spacing/radius) trước khi dùng AI agent hoặc handoff Dev Mode.",
    ],
    sourceName: "Figma Blog (Config Highlights)",
    sourceUrl: "https://www.figma.com/blog/",
    publishedAt: "2026-05-01",
    isLiveFeed: false,
    createdAt: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "hot-m3-expressive",
    title: "Material Design 3 Expressive: Motion Physics, Variable Fonts & 35 Shape Tokens",
    badge: "NEW",
    platform: "Mobile",
    summary:
      "Google cập nhật M3 Expressive dựa trên nghiên cứu eye-tracking & cảm xúc người dùng, nhấn mạnh hierarchy rõ nét hơn qua typography, shape và motion.",
    keyTakeaways: [
      "Bổ sung 35 shape tokens mới và cặp component Toolbars / Split Buttons giúp CTA nổi bật mà không tăng clutter.",
      "Dùng Roboto Flex (variable font) + Spring Physics motion tokens thay vì ease-in-out cứng nhắc.",
      "Vẫn giữ touch target tối thiểu 48x48dp cho các nút tương tác trên Android.",
    ],
    sourceName: "Material Design 3 Official",
    sourceUrl: "https://m3.material.io/",
    publishedAt: "2025-05-15",
    isLiveFeed: false,
    createdAt: "2025-05-15T00:00:00.000Z",
  },
  {
    id: "hot-apple-liquid-glass",
    title: "Apple HIG Liquid Glass (2025–2026): Optical Material & Readability Guardrails",
    badge: "HOT",
    platform: "Mobile",
    summary:
      "Apple chuẩn hóa vật liệu Liquid Glass trên iOS/macOS/visionOS quanh 3 trụ cột Hierarchy, Harmony, Consistency kèm guardrail chống mờ chữ.",
    keyTakeaways: [
      "Dùng Liquid Glass cho thanh điều hướng/controls nổi (navigation layer), không phủ kính lên toàn bộ content canvas.",
      "Ưu tiên Capsule & Concentric shapes bo góc đồng tâm với viền thiết bị iOS.",
      "Kiểm tra tương phản văn bản trên nền động; bật fallback giảm độ trong suốt khi Reduce Transparency hoạt động.",
    ],
    sourceName: "Apple Human Interface Guidelines",
    sourceUrl: "https://developer.apple.com/design/human-interface-guidelines/",
    publishedAt: "2026-06-10",
    isLiveFeed: false,
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "hot-wcag-22-target-focus",
    title: "WCAG 2.2 AA Checklist cho Web/App Junior: Target Size 24px & Focus Not Obscured",
    badge: "GUIDELINE",
    platform: "Web",
    summary:
      "WCAG 2.2 bổ sung tiêu chí quan trọng về kích thước vùng bấm web và trạng thái focus bàn phím không bị sticky header che khuất.",
    keyTakeaways: [
      "Success Criterion 2.5.8 (AA): vùng bấm tối thiểu 24x24 CSS px hoặc có khoảng hở an toàn xung quanh.",
      "Focus Not Obscured: khi Tab bằng bàn phím, phần tử focus không được bị modal/sticky bar che mất.",
      "Giữ tương phản chữ thường >= 4.5:1 và icon/border UI >= 3:1.",
    ],
    sourceName: "W3C WCAG 2.2 Understanding",
    sourceUrl: "https://www.w3.org/WAI/WCAG22/Understanding/",
    publishedAt: "2025-03-01",
    isLiveFeed: false,
    createdAt: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "hot-ai-agent-ux-patterns",
    title: "Thiết kế AI & Agent Transparency UX: Tránh 'Black Box' trong sản phẩm hiện đại",
    badge: "NEW",
    platform: "AI & Workflow",
    summary:
      "Các guideline sản phẩm 2025–2026 nhấn mạnh trạng thái minh bạch, nút Undo/Override và citations rõ ràng khi AI tự thực thi thao tác.",
    keyTakeaways: [
      "Luôn phân tách rạch ròi: AI đang nghĩ / đề xuất vs AI đã áp dụng thay đổi thật.",
      "Cung cấp nút Undo hoặc Confirm trước các hành động destructive (xóa dữ liệu, gửi email).",
      "Hiển thị nguồn trích dẫn hoặc độ tin cậy thực tế, không tự tạo số liệu giả.",
    ],
    sourceName: "Nielsen Norman Group — AI UX",
    sourceUrl: "https://www.nngroup.com/topic/ai/",
    publishedAt: "2026-02-12",
    isLiveFeed: false,
    createdAt: "2026-02-12T00:00:00.000Z",
  },
];

export const STANDARD_GUIDELINE_QUIZ: StandardGuidelineQuizQuestion[] = [
  {
    id: "std-wcag-text-contrast",
    standard: "WCAG 2.2",
    question:
      "Theo chuẩn WCAG 2.2 Level AA, tỷ lệ tương phản (contrast ratio) tối thiểu cho chữ thường (body text < 18pt) là bao nhiêu?",
    options: [
      { id: "a", label: "3.0 : 1" },
      { id: "b", label: "4.5 : 1" },
      { id: "c", label: "7.0 : 1" },
      { id: "d", label: "2.5 : 1" },
    ],
    correctOptionId: "b",
    explanation:
      "WCAG 2.2 AA yêu cầu 4.5:1 cho chữ thường và 3.0:1 cho chữ lớn (>=18pt hoặc >=14pt bold) và UI components.",
  },
  {
    id: "std-wcag-target-size",
    standard: "WCAG 2.2",
    question:
      "Tiêu chí 2.5.8 Target Size (Minimum) Level AA của WCAG 2.2 quy định kích thước vùng bấm tối thiểu trên Web là bao nhiêu?",
    options: [
      { id: "a", label: "16 x 16 CSS px" },
      { id: "b", label: "24 x 24 CSS px (hoặc có spacing tương đương)" },
      { id: "c", label: "64 x 64 CSS px" },
      { id: "d", label: "Không có mức tối thiểu" },
    ],
    correctOptionId: "b",
    explanation:
      "WCAG 2.2 Level AA 2.5.8 quy định tối thiểu 24x24 CSS px cho pointer targets (mobile app vẫn nên đạt 44pt/48dp).",
  },
  {
    id: "std-ios-hit-target",
    standard: "Apple HIG",
    question:
      "Theo Apple Human Interface Guidelines (iOS), kích thước touch target tối thiểu khuyến nghị cho nút bấm cảm ứng là gì?",
    options: [
      { id: "a", label: "32 x 32 pt" },
      { id: "b", label: "44 x 44 pt" },
      { id: "c", label: "56 x 56 pt" },
      { id: "d", label: "24 x 24 pt" },
    ],
    correctOptionId: "b",
    explanation:
      "Apple HIG khuyến nghị vùng chạm tối thiểu 44 x 44 points (kể cả khi icon bên trong nhỏ hơn như 20–24pt).",
  },
  {
    id: "std-apple-liquid-glass",
    standard: "Apple HIG",
    question:
      "Khi áp dụng vật liệu Liquid Glass theo Apple HIG 2025–2026, nguyên tắc nào ĐÚNG nhất?",
    options: [
      {
        id: "a",
        label: "Phủ kính mờ lên mọi card dữ liệu và bảng biểu để đồng bộ.",
      },
      {
        id: "b",
        label:
          "Chỉ dùng cho tầng điều khiển/navigation nổi phía trên content và giữ tương phản đọc rõ.",
      },
      {
        id: "c",
        label: "Giảm opacity chữ xuống 40% để nền xuyên thấu rõ hơn.",
      },
      {
        id: "d",
        label: "Bỏ qua chế độ Reduce Transparency của hệ điều hành.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Liquid Glass dành cho navigation/control layer nổi bật trên content; lạm dụng cho content layer làm giảm khả năng đọc.",
  },
  {
    id: "std-m3-touch-grid",
    standard: "Material 3",
    question:
      "Trong Material Design 3 (Android), chuẩn touch target tối thiểu và bước lưới spacing phổ biến là cặp nào?",
    options: [
      { id: "a", label: "40 x 40 dp & lưới 5dp" },
      { id: "b", label: "48 x 48 dp & lưới 4dp / 8dp" },
      { id: "c", label: "36 x 36 dp & lưới 10dp" },
      { id: "d", label: "24 x 24 dp & lưới 6dp" },
    ],
    correctOptionId: "b",
    explanation:
      "Material Design quy định touch target >= 48 x 48 dp và hệ thống spacing theo bội số 4dp / 8dp.",
  },
  {
    id: "std-law-hick",
    standard: "Laws of UX",
    question:
      "Khi một màn hình filter có quá nhiều lựa chọn cùng cấp khiến user đơ và mất thời gian chọn, bạn cần áp dụng định luật nào để tối ưu?",
    options: [
      { id: "a", label: "Hick's Law — giảm/gom nhóm lựa chọn theo ngữ cảnh" },
      { id: "b", label: "Von Restorff Effect — tô màu cầu vồng mọi nút" },
      { id: "c", label: "Zeigarnik Effect — ẩn luôn kết quả tìm kiếm" },
      { id: "d", label: "Serial Position — đẩy nút CTA chính ra giữa danh sách" },
    ],
    correctOptionId: "a",
    explanation:
      "Hick's Law chỉ ra thời gian ra quyết định tăng theo số lượng và độ phức tạp lựa chọn; gom nhóm & progressive disclosure giúp user chọn nhanh hơn.",
  },
  {
    id: "std-law-jakob",
    standard: "Laws of UX",
    question:
      "Jakob's Law khuyên Product Designer điều gì khi thiết kế luồng giỏ hàng hoặc navigation quen thuộc?",
    options: [
      {
        id: "a",
        label:
          "Luôn sáng tạo vị trí hoàn toàn mới lạ để sản phẩm khác biệt.",
      },
      {
        id: "b",
        label:
          "Tận dụng mental model quen thuộc từ các app phổ biến user hay dùng để giảm learning curve.",
      },
      {
        id: "c",
        label: "Đổi icon giỏ hàng sang hình ngôi sao để tăng tò mò.",
      },
      {
        id: "d",
        label: "Đặt thanh tab bar lên góc trên cùng bên trái trên mobile.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "User dành phần lớn thời gian ở các sản phẩm khác, nên họ kỳ vọng UI mới hoạt động tương tự chuẩn quen thuộc (Jakob's Law).",
  },
  {
    id: "std-nielsen-error",
    standard: "Nielsen",
    question:
      "Theo Nielsen Heuristic #9 (Help users recognize, diagnose, and recover from errors), thông báo lỗi form tốt cần có gì?",
    options: [
      {
        id: "a",
        label: "Chỉ hiện mã lỗi kỹ thuật như 'Error 422' để dev dễ debug.",
      },
      {
        id: "b",
        label:
          "Đổi viền đỏ toàn form nhưng không ghi rõ sai ở field nào.",
      },
      {
        id: "c",
        label:
          "Nêu rõ sai ở field nào bằng ngôn ngữ dễ hiểu và hướng dẫn cách sửa ngay.",
      },
      {
        id: "d",
        label: "Tự động xóa hết toàn bộ dữ liệu user vừa nhập để nhập lại.",
      },
    ],
    correctOptionId: "c",
    explanation:
      "Error message tốt phải chỉ đúng vị trí lỗi, giải thích bằng ngôn ngữ con người (không mã hex/code thô) và gợi ý cách khắc phục.",
  },
];
