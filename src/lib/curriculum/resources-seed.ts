import type { LearningResource } from "@/types/learning";

export const CURATED_RESOURCES: Omit<LearningResource, "createdAt">[] = [
  {
    id: "res-ux-core-research",
    title: "Phương pháp Nghiên cứu UX: Khám phá, Kiểm chứng & Hành vi",
    track: "ux_core",
    level: "Beginner",
    stageOrder: 1,
    summary:
      "Tổng hợp các phương pháp nghiên cứu cốt lõi (User Interviews, Surveys, Usability Testing, Card Sorting, Tree Testing) để hiểu đúng vấn đề trước khi vẽ giao diện.",
    keyPoints: [
      "Nghiên cứu khám phá (Generative): Dùng User Interviews (định tính) để hiểu động cơ/điểm đau và Surveys (định lượng) để kiểm tra xu hướng trên mẫu lớn.",
      "Nghiên cứu đánh giá (Evaluative): Dùng Usability Testing để quan sát người dùng thao tác thật trên prototype; dùng Heuristic Evaluation để rà soát nhanh theo nguyên lý.",
      "Nghiên cứu kiến trúc (IA): Dùng Card Sorting để tìm cách người dùng phân nhóm thông tin và Tree Testing để kiểm tra cấu trúc menu trước khi lên UI.",
      "Tránh thiên kiến phỏng vấn (Interview Bias): Hỏi về hành vi thực tế trong quá khứ ('Lần gần nhất bạn đặt hàng...') thay vì hỏi giả định ('Bạn có thích tính năng này không?').",
    ],
    webVsMobileNote:
      "Áp dụng chung cho cả Web và Mobile. Lưu ý bối cảnh sử dụng: Mobile thường cần kiểm thử trong ngữ cảnh di chuyển, cầm 1 tay và kết nối mạng không ổn định.",
    sourceName: "Nielsen Norman Group (NN/g)",
    sourceUrl: "https://www.nngroup.com/articles/which-ux-research-methods/",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-ux-core-heuristics",
    title: "10 Nguyên lý Khả năng Sử dụng (Jakob Nielsen's Heuristics)",
    track: "ux_core",
    level: "Beginner",
    stageOrder: 5,
    summary:
      "Bộ 10 nguyên tắc kinh điển giúp đánh giá và phát hiện lỗi trải nghiệm trong giao diện Web lẫn Mobile một cách có hệ thống.",
    keyPoints: [
      "Visibility of System Status: Luôn phản hồi trạng thái hệ thống kịp thời (loading, tiến trình lưu, thông báo thành công/lỗi).",
      "Match Between System & Real World: Dùng ngôn ngữ tự nhiên của người dùng, tránh thuật ngữ kỹ thuật nội bộ.",
      "User Control and Freedom: Luôn có lối thoát rõ ràng như Hoàn tác (Undo), Hủy (Cancel) hoặc Quay lại.",
      "Consistency and Standards: Giữ nhất quán biểu tượng, thuật ngữ và quy ước nền tảng để người dùng không phải đoán lại.",
      "Error Prevention & Recovery: Ngăn lỗi trước khi xảy ra (ràng buộc input rõ ràng) và viết thông báo lỗi dễ hiểu kèm hướng khắc phục.",
      "Recognition Rather than Recall: Hiển thị sẵn lựa chọn, lịch sử gần đây hoặc gợi ý thay vì bắt người dùng nhớ.",
    ],
    webVsMobileNote:
      "Trên Web ưu tiên trạng thái hover, phím tắt (Efficiency) và breadcrumb; trên Mobile ưu tiên thao tác vuốt quay lại, Undo dạng snackbar và trạng thái chạm rõ ràng.",
    sourceName: "Nielsen Norman Group (NN/g)",
    sourceUrl: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-web-wcag",
    title: "Web Accessibility & Contrast Guideline (WCAG 2.2 Level AA)",
    track: "web",
    level: "Intermediate",
    stageOrder: 6,
    summary:
      "Chuẩn tiếp cận cho giao diện Web về độ tương phản màu chữ, thành phần UI và kích thước vùng bấm tối thiểu.",
    keyPoints: [
      "Độ tương phản chữ thường (1.4.3 Contrast Minimum): Tối thiểu 4.5:1 giữa màu chữ và nền; chữ lớn (>= 24px thường hoặc >= 18.66px đậm) tối thiểu 3:1.",
      "Thành phần giao diện & icon (1.4.11 Non-text Contrast): Viền ô nhập liệu, icon chức năng và trạng thái focus phải đạt tối thiểu 3:1.",
      "Kích thước vùng bấm Web (2.5.8 Target Size Minimum - WCAG 2.2): Vùng tương tác tối thiểu 24 × 24 CSS px (hoặc có khoảng cách đủ để vòng tròn 24px không giao cắt nút khác).",
      "Không chỉ dựa vào màu sắc để báo lỗi: Luôn kết hợp màu đỏ + icon + văn bản giải thích rõ ràng.",
    ],
    webVsMobileNote:
      "Web WCAG 2.2 AA yêu cầu tối thiểu 24×24 CSS px cho con trỏ chuột, trong khi Mobile (iOS/Android) đòi hỏi vùng chạm lớn hơn nhiều (44pt / 48dp) vì ngón tay thiếu chính xác hơn chuột.",
    sourceName: "W3C Web Accessibility Initiative (WAI)",
    sourceUrl: "https://www.w3.org/WAI/WCAG22/Understanding/",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-web-responsive-grid",
    title: "Web Responsive Grid & Window Size Breakpoints (Material 3)",
    track: "web",
    level: "Beginner",
    stageOrder: 6,
    summary:
      "Cách tổ chức lưới (Columns, Margins, Gutters) và phân chia ngưỡng màn hình (Breakpoints) cho Web và Tablet.",
    keyPoints: [
      "5 ngưỡng kích thước chính theo Material 3: Compact (< 600dp), Medium (600–839dp), Expanded (840–1199dp), Large (1200–1599dp), Extra-large (1600dp+).",
      "Cấu trúc lưới linh hoạt: 4 cột cho Compact (Mobile), 8 cột cho Medium (Tablet), và 12 cột cho Expanded/Large (Desktop).",
      "Margins (lề ngoài) và Gutters (khoảng cách giữa các cột) cần tăng dần trên màn hình lớn để dòng chữ không bị kéo quá dài gây mỏi mắt.",
      "Ưu tiên reflow bố cục (từ 2–3 cột về 1 cột xếp chồng) thay vì thu nhỏ tỷ lệ màn hình desktop.",
    ],
    webVsMobileNote:
      "Web dùng lưới 12 cột để dàn dashboard, bảng dữ liệu và sidebar cố định; Mobile Compact dùng 4 cột và ưu tiên xếp dọc dễ cuộn bằng ngón cái.",
    sourceName: "Material Design 3 — Layout",
    sourceUrl: "https://m3.material.io/foundations/layout/applying-layout/window-size-classes",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-mobile-ios-hig",
    title: "iOS Mobile UI Guideline (Apple Human Interface Guidelines)",
    track: "mobile",
    level: "Beginner",
    stageOrder: 6,
    summary:
      "Quy chuẩn thiết kế giao diện iOS về vùng chạm 44×44pt, vùng an toàn (Safe Area), Thumb Zone và điều hướng chuẩn Apple.",
    keyPoints: [
      "Vùng chạm tối thiểu (Touch Target): Mọi nút bấm, toggle, icon tương tác trên iOS phải đạt ít nhất 44 × 44 points (pt). Nếu icon nhỏ hơn (vd 20pt), phải thêm padding vô hình đạt đủ 44pt.",
      "Safe Areas: Luôn chừa vùng an toàn cho Dynamic Island, Status Bar ở trên và Home Indicator ở cạnh dưới màn hình.",
      "Thumb Zone & Nội dung trọng tâm: Đặt các nút điều hướng chính (Tab Bar) ở cạnh dưới trong tầm với ngón cái; tránh nhồi nút quan trọng ở góc trên cùng.",
      "Hệ thống điều hướng chuẩn: Dùng Tab Bar cho các mục ngang hàng, Navigation Bar cho phân cấp đi sâu (push/pop) và Sheet cho tác vụ phụ.",
      "Hỗ trợ Dynamic Type: Container và thẻ nội dung phải co giãn theo chiều dọc khi người dùng tăng cỡ chữ hệ thống.",
    ],
    webVsMobileNote:
      "Khác biệt lớn nhất với Web: Mobile iOS không có trạng thái hover, ưu tiên tương tác 1 tay ở nửa dưới màn hình và sử dụng đơn vị point (pt) độc lập mật độ điểm ảnh (@2x, @3x).",
    sourceName: "Apple Human Interface Guidelines",
    sourceUrl: "https://developer.apple.com/design/human-interface-guidelines/layout",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-mobile-android-m3",
    title: "Android Mobile Guideline: Quy tắc 48dp & Điều hướng Material 3",
    track: "mobile",
    level: "Beginner",
    stageOrder: 6,
    summary:
      "Chuẩn thiết kế ứng dụng di động Android theo Material Design 3 với vùng chạm 48×48dp và khoảng cách tránh chạm nhầm.",
    keyPoints: [
      "Quy tắc 48 × 48 dp: Vùng chạm tối thiểu cho mọi phần tử tương tác là 48 × 48 dp (tương đương ~9mm ngoài đời thực — vừa đầu ngón tay trung bình).",
      "Khoảng cách giữa các nút: Nên giữ tối thiểu 8dp khoảng trống giữa các vùng chạm liền kề để tránh lỗi bấm nhầm (fat-finger errors).",
      "Tách biệt kích thước nhìn (Visual Bounds) và vùng chạm (Touch Bounds): Icon 24×24dp cần vùng chạm bao ngoài 48×48dp.",
      "Navigation Bar (3–5 mục chính ở đáy màn hình) cho điện thoại; chuyển sang Navigation Rail ở cạnh trái khi lên tablet ngang.",
    ],
    webVsMobileNote:
      "Android M3 dùng đơn vị dp (48dp) hơi lớn hơn ngưỡng 44pt của iOS và nhấn mạnh khoảng cách 8dp giữa các nút cạnh nhau.",
    sourceName: "Material Design 3 — Accessibility",
    sourceUrl: "https://m3.material.io/foundations/accessible-design/accessibility-basics",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
  {
    id: "res-figma-system",
    title: "Figma Cốt lõi: Auto Layout, Components, Variants & Variables",
    track: "figma",
    level: "Intermediate",
    stageOrder: 7,
    summary:
      "Bộ 3 công cụ nền tảng trong Figma giúp tạo giao diện co giãn responsive, tái sử dụng component và quản lý Design Tokens.",
    keyPoints: [
      "Auto Layout (Shift + A): Điều chỉnh hướng (Horizontal/Vertical), Padding, Gap và chế độ co giãn Fixed / Hug contents / Fill container để card tự thích nghi khi chữ dài ra hoặc đổi kích thước màn hình.",
      "Components & Variants: Gom các trạng thái (Default, Hover, Disabled) vào 1 Component Set; dùng Component Properties (Text, Boolean, Instance Swap) để giảm phình số lượng variant.",
      "Variables (Design Tokens): Lưu màu sắc, kích thước khoảng cách, bo góc thành biến dùng chung và hỗ trợ Modes (Light/Dark Mode hoặc Compact/Desktop).",
      "Quy trình chuẩn khi tạo Button/Card: Tạo Variables trước → Dựng khung Auto Layout gắn Variables → Chuyển thành Component & Variants.",
    ],
    webVsMobileNote:
      "Nhờ Variables Modes và Fill container trong Auto Layout, bạn có thể kiểm tra cùng 1 component khi đặt trên frame Web (1440px) và Mobile (375–390px) mà không vỡ layout.",
    sourceName: "Figma Help Center",
    sourceUrl: "https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout",
    reviewedAt: "2026-11-14",
    isCustom: false,
  },
];
