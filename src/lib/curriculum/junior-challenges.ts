import type { MiniGameChallenge, PracticeBrief } from "@/types/learning";

export const JUNIOR_MINI_GAMES: MiniGameChallenge[] = [
  {
    id: "game-hierarchy-1",
    title: "Thứ bậc thị giác (Visual Hierarchy)",
    category: "UI Visual Design",
    platform: "Web",
    type: "ab_visual",
    prompt:
      "Nhìn nhanh 2 thẻ Gói dịch vụ SaaS bên dưới. Thẻ nào giúp người dùng nhận ra gói khuyên dùng và nút hành động chính nhanh hơn?",
    visualScenario: "hierarchy_card",
    options: [
      { id: "a", label: "Thiết kế A — Mọi chữ cùng cỡ, 2 nút giống hệt nhau" },
      { id: "b", label: "Thiết kế B — Tương phản cỡ chữ, nhấn CTA chính" },
    ],
    correctOptionId: "b",
    whyItMatters:
      "Thứ bậc rõ ràng (giá tiền nổi bật, CTA chính tương phản cao, CTA phụ dạng outline) giảm tải nhận thức khi quét trang (scanning) theo quy luật F-pattern trên Web.",
    skillId: "skill-ui-design",
    xpReward: 15,
  },
  {
    id: "game-mobile-touch-2",
    title: "Vùng chạm iOS & Thumb Zone",
    category: "Mobile Guideline",
    platform: "Mobile",
    type: "ab_visual",
    prompt:
      "Trên màn hình chi tiết sản phẩm Mobile, bố cục thanh hành động nào đạt chuẩn Apple HIG (vùng chạm >= 44pt) và tối ưu thao tác 1 tay?",
    visualScenario: "mobile_touch_target",
    options: [
      { id: "a", label: "Thanh A — Nút nhỏ 28px đặt sát góc trên cùng" },
      { id: "b", label: "Thanh B — Nút cao 48px đặt dưới đáy trên Safe Area" },
    ],
    correctOptionId: "b",
    whyItMatters:
      "Apple HIG yêu cầu vùng chạm tối thiểu 44×44pt (Android M3 là 48×48dp) và đặt CTA chính ở vùng ngón cái (Thumb Zone) cạnh dưới để tránh chạm nhầm và mỏi tay.",
    skillId: "skill-ui-design",
    xpReward: 15,
  },
  {
    id: "game-contrast-fix-3",
    title: "Cân chỉnh Độ tương phản WCAG 2.2",
    category: "Accessibility",
    platform: "Web",
    type: "interactive_fix",
    prompt:
      "Kéo hoặc chọn bảng màu chữ/nền cho nút CTA và nhãn trạng thái bên dưới để đạt chuẩn WCAG AA (>= 4.5:1) mà không bị chói.",
    visualScenario: "wcag_contrast",
    options: [
      { id: "low", label: "Chữ xám nhạt (#9CA3AF) trên nền trắng (~2.5:1)" },
      { id: "neon", label: "Chữ trắng trên nền vàng chanh (~1.6:1)" },
      { id: "pass", label: "Chữ đậm (#17181C) trên nền pastel hoặc trắng trên #17181C (>= 12:1)" },
    ],
    correctOptionId: "pass",
    whyItMatters:
      "WCAG 2.2 AA yêu cầu tỷ lệ tương phản chữ thường tối thiểu 4.5:1. Dùng màu pastel làm nền kết hợp chữ tối (#17181C) vừa giữ thẩm mỹ thân thiện vừa đảm bảo dễ đọc ngoài trời.",
    skillId: "skill-ui-design",
    xpReward: 20,
  },
  {
    id: "game-spacing-4",
    title: "Luật Gần (Proximity) & Lưới 8pt",
    category: "Layout & Spacing",
    platform: "Web",
    type: "ab_visual",
    prompt:
      "Khi hiển thị danh sách thông báo, card nào áp dụng đúng Law of Proximity (khoảng cách trong nhóm < khoảng cách giữa các nhóm)?",
    visualScenario: "spacing_proximity",
    options: [
      { id: "a", label: "Card A — Khoảng cách mọi dòng đều bằng nhau (16px)" },
      { id: "b", label: "Card B — Tiêu đề & mô tả sát nhau (4px), cách cụm nút 16px" },
    ],
    correctOptionId: "b",
    whyItMatters:
      "Mắt người nhóm các phần tử gần nhau thành 1 cụm nghĩa. Khoảng cách nội bộ nhỏ hơn khoảng cách giữa các phần giúp UI sạch, dễ quét mà không cần kẻ nhiều đường viền.",
    skillId: "skill-ui-design",
    xpReward: 15,
  },
  {
    id: "game-error-5",
    title: "Phòng ngừa & Hồi phục lỗi Form (Nielsen #5 & #9)",
    category: "Usability & Interaction",
    platform: "UX Core",
    type: "ab_visual",
    prompt:
      "Người dùng nhập sai định dạng email hoặc thẻ thanh toán. Cách phản hồi nào giúp họ sửa nhanh nhất?",
    visualScenario: "form_error_state",
    options: [
      { id: "a", label: "Modal A — Chỉ hiện popup 'Lỗi hệ thống 422' và xóa trắng form" },
      { id: "b", label: "Form B — Giữ nguyên dữ liệu, báo lỗi inline ngay dưới ô sai + gợi ý sửa" },
    ],
    correctOptionId: "b",
    whyItMatters:
      "Theo Nielsen Heuristic #9, thông báo lỗi phải dùng ngôn ngữ tự nhiên, chỉ rõ ô bị lỗi và gợi ý cách sửa — tuyệt đối không xóa dữ liệu người dùng vừa nhập.",
    skillId: "skill-usability",
    xpReward: 15,
  },
  {
    id: "game-funnel-6",
    title: "Chẩn đoán Điểm rơi Phễu (Funnel Drop-off)",
    category: "Product Thinking",
    platform: "UX Core",
    type: "ab_visual",
    prompt:
      "Phễu thanh toán Mobile bị rơi 58% ở bước 'Nhập thông tin giao hàng'. Đâu là thay đổi tác động cao nhất (High Impact / Low Effort)?",
    visualScenario: "funnel_friction",
    options: [
      { id: "a", label: "Phương án A — Bắt tạo tài khoản + xác thực email trước khi xem phí ship" },
      { id: "b", label: "Phương án B — Cho phép Guest Checkout + hiện phí ship minh bạch trước" },
    ],
    correctOptionId: "b",
    whyItMatters:
      "Bắt đăng ký sớm và ẩn chi phí là 2 nguyên nhân bỏ giỏ hàng hàng đầu. Guest Checkout và minh bạch tổng tiền giúp giảm ma sát ngay tại bước rơi nhiều nhất.",
    skillId: "skill-product-thinking",
    xpReward: 20,
  },
];

export const JUNIOR_PRACTICE_BRIEFS: PracticeBrief[] = [
  {
    id: "brief-mobile-checkout",
    title: "Thiết kế lại màn hình Giỏ hàng & Thanh toán Mobile (iOS HIG)",
    platform: "Mobile",
    level: "Intermediate",
    estimatedMinutes: 45,
    goal: "Giảm bỏ giỏ hàng trên màn hình 390×844 bằng bố cục rõ giá, vùng chạm >= 44pt và thanh CTA cố định trong Thumb Zone.",
    requirements: [
      "Hiển thị rõ danh sách sản phẩm, số lượng (+/- tối thiểu 44×44pt) và tổng tiền minh bạch.",
      "Có phương án xử lý khi mã giảm giá không hợp lệ (Error state inline).",
      "Thanh CTA chính cố định cạnh dưới, tôn trọng Home Indicator Safe Area.",
    ],
    deliverables: [
      "Ảnh chụp màn hình thiết kế (PNG/JPG) hoặc link Figma Frame.",
      "2–3 câu giải trình lý do bố cục & khoảng cách bạn chọn.",
    ],
    rubric: [
      {
        id: "hierarchy",
        name: "Thứ bậc thị giác & Giá cả",
        description: "Tổng tiền, tên món và nút thanh toán nổi bật ngay lần nhìn đầu.",
      },
      {
        id: "touch_target",
        name: "Vùng chạm & Thumb Zone",
        description: "Các nút +/- và CTA đạt >= 44pt, dễ bấm bằng 1 tay.",
      },
      {
        id: "error_state",
        name: "Trạng thái lỗi / ngoại lệ",
        description: "Có xử lý lỗi mã giảm giá hoặc giỏ hàng trống rõ ràng.",
      },
      {
        id: "spacing",
        name: "Lưới 8pt & Độ tương phản",
        description: "Khoảng cách đều đặn, chữ giá và nhãn phụ đạt tương phản >= 4.5:1.",
      },
    ],
    skillId: "skill-ui-design",
  },
  {
    id: "brief-web-table-hierarchy",
    title: "Cải thiện Dashboard & Bảng dữ liệu SaaS (Web 1440px)",
    platform: "Web",
    level: "Intermediate",
    estimatedMinutes: 60,
    goal: "Sắp xếp lại bảng quản lý đơn hàng nhiều cột để nhân viên vận hành quét nhanh trạng thái và lọc đơn lỗi.",
    requirements: [
      "Phân tách rõ thanh tìm kiếm, bộ lọc trạng thái và vùng bảng dữ liệu.",
      "Dùng màu ngữ nghĩa (Semantic colors) kèm nhãn chữ cho badge trạng thái (không chỉ dùng màu).",
      "Thiết kế kèm Empty State khi không tìm thấy đơn phù hợp.",
    ],
    deliverables: [
      "Ảnh UI màn hình Web hoặc link Figma.",
      "Giải trình ngắn cách bạn xử lý độ dày thông tin (Data density).",
    ],
    rubric: [
      {
        id: "ia",
        name: "Phân cấp thông tin",
        description: "Cột quan trọng (Mã, Khách, Trạng thái, Hành động) dễ quét.",
      },
      {
        id: "contrast",
        name: "Màu ngữ nghĩa & WCAG",
        description: "Badge và chữ bảng đạt tương phản AA >= 4.5:1.",
      },
      {
        id: "states",
        name: "Bộ lọc & Empty state",
        description: "Có phương án khi rỗng hoặc đang tải.",
      },
      {
        id: "consistency",
        name: "Tính nhất quán Component",
        description: "Nút, input, badge dùng cùng quy chuẩn kích thước.",
      },
    ],
    skillId: "skill-ui-design",
  },
  {
    id: "brief-figma-component-set",
    title: "Mini Design System: Input + Button Variants với Auto Layout",
    platform: "Figma",
    level: "Intermediate",
    estimatedMinutes: 40,
    goal: "Xây dựng bộ component Form Input và Button tái sử dụng trong Figma chịu được chữ dài và đổi trạng thái mượt mà.",
    requirements: [
      "Dùng Auto Layout (Hug / Fill container) cho cả Button và Input.",
      "Đủ biến thể (Variants): Default, Hover/Focus, Error (kèm thông báo lỗi), Disabled.",
      "Gắn Color & Spacing Variables cơ bản.",
    ],
    deliverables: [
      "Link Figma đến trang Component Set hoặc ảnh chụp bảng Variants.",
      "Giải thích ngắn cách đặt tên Properties / Tokens.",
    ],
    rubric: [
      {
        id: "autolayout",
        name: "Cấu trúc Auto Layout",
        description: "Thử đổi độ dài text mà không bị tràn hay lệch icon.",
      },
      {
        id: "states",
        name: "Đầy đủ trạng thái",
        description: "Có Default, Focus, Error, Disabled rõ ràng.",
      },
      {
        id: "tokens",
        name: "Variables / Tokens",
        description: "Tách màu và spacing thành biến thay vì hardcode.",
      },
      {
        id: "handoff",
        name: "Đặt tên sạch sẽ cho Dev",
        description: "Layer và variant property dễ hiểu khi bàn giao.",
      },
    ],
    skillId: "skill-figma",
  },
];
