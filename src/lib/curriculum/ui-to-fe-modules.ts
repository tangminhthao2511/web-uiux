import type { UiToFeModule } from "@/types/learning";

export const UI_TO_FE_MODULES: UiToFeModule[] = [
  {
    id: "auto-layout-flex",
    order: 1,
    badge: "Layout · Figma → CSS",
    title: "Auto Layout → CSS Flexbox & Gap",
    subtitle:
      "Dịch thẳng Horizontal/Vertical, Gap, Padding và Hug/Fill Container sang Flexbox & Tailwind.",
    figmaConcept: "Auto Layout (Direction · Gap · Padding · Hug / Fill)",
    feConcept: "display: flex · flex-direction · gap · flex-1",
    mappingRows: [
      {
        figmaProperty: "Horizontal / Vertical",
        feEquivalent: "flex-row / flex-col",
        pitfallNote:
          "Đừng dùng margin từng item; dùng flex + flex-col để đổi hướng responsive.",
      },
      {
        figmaProperty: "Item spacing = 16",
        feEquivalent: "gap-4 (1rem / 16px)",
        pitfallNote:
          "Gap không tạo khoảng dư ở rìa đầu/cuối như margin-right.",
      },
      {
        figmaProperty: "Width: Fill container",
        feEquivalent: "flex-1 w-full min-w-0",
        pitfallNote:
          "Thiếu min-w-0 làm text dài trong flex item đẩy vỡ khung card.",
      },
    ],
    challenge: {
      question:
        "Trong Figma, một ô input nằm cạnh nút 'Tìm kiếm' đang bật Width = Fill container để tự giãn hết chỗ trống còn lại. Sang Tailwind CSS bạn dùng class nào cho ô input đó?",
      options: [
        { id: "a", label: "w-fit shrink-0" },
        { id: "b", label: "flex-1 min-w-0" },
        { id: "c", label: "mx-auto block" },
        { id: "d", label: "fixed inset-x-0" },
      ],
      correctOptionId: "b",
      explanation:
        "flex-1 giúp phần tử giãn chiếm phần không gian còn lại (tương đương Fill container), còn min-w-0 ngăn chữ dài làm tràn flex parent.",
    },
  },
  {
    id: "tokens-variables",
    order: 2,
    badge: "Tokens · Design System",
    title: "Figma Variables → CSS Variables & Tailwind",
    subtitle:
      "Đổi hard-code mã màu/bo góc thành Semantic Tokens dùng chung giữa Figma và FE.",
    figmaConcept: "Semantic Color / Radius Variables (--surface, --accent)",
    feConcept: ":root { --surface: ... } + Tailwind arbitrary/theme tokens",
    mappingRows: [
      {
        figmaProperty: "surface/card = #FFFFFF",
        feEquivalent: "--surface-card: #ffffff; bg-[var(--surface-card)]",
        pitfallNote:
          "Đặt tên theo vai trò (surface, text-muted), không đặt theo màu (purple-200).",
      },
      {
        figmaProperty: "Corner radius = 16px",
        feEquivalent: "--radius-card: 16px; rounded-2xl",
        pitfallNote:
          "Card ngoài bo R, nút con bên trong nên bo R - padding (Concentric radius).",
      },
      {
        figmaProperty: "1px Stroke #E3E0D7",
        feEquivalent: "border border-[#E3E0D7]",
        pitfallNote:
          "Tăng contrast border >= 3:1 nếu là input/button tương tác (WCAG 2.2).",
      },
    ],
    challenge: {
      question:
        "Vì sao khi chuyển Figma Variables sang CSS Variables cho dự án thật, nên đặt tên token là `--color-bg-danger` thay vì `--color-red-500`?",
      options: [
        {
          id: "a",
          label: "Vì CSS không hỗ trợ tên màu có chữ số.",
        },
        {
          id: "b",
          label:
            "Để tách biệt vai trò ngữ nghĩa (Semantic) — đổi theme Light/Dark hay brand color chỉ cần sửa giá trị 1 chỗ.",
        },
        {
          id: "c",
          label: "Để code file CSS ngắn hơn 50%.",
        },
        {
          id: "d",
          label: "Vì trình duyệt tự dịch Semantic Token thành HTML.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Semantic Token tách 'ý nghĩa dùng ở đâu' khỏi 'mã màu thô', giúp Dark Mode hoặc rebrand không phải đi tìm sửa hàng trăm file.",
    },
  },
  {
    id: "responsive-touch",
    order: 3,
    badge: "Mobile vs Web · WCAG 2.2",
    title: "Breakpoints & Touch Target trong FE",
    subtitle:
      "Chuyển Frame Mobile/Desktop từ Figma sang CSS Grid/Responsive và bảo toàn vùng chạm 44px–48px.",
    figmaConcept: "375px Mobile Frame ↔ 1280px Desktop + Touch Box",
    feConcept: "grid-cols-1 md:grid-cols-2 · min-h-[44px] · clamp()",
    mappingRows: [
      {
        figmaProperty: "1 cột Mobile → 2 cột Web",
        feEquivalent: "grid grid-cols-1 md:grid-cols-2 gap-4",
        pitfallNote:
          "Mobile-first: viết class cho màn nhỏ trước, dùng md:/lg: cho màn lớn.",
      },
      {
        figmaProperty: "Hit area 44pt (iOS) / 48dp (M3)",
        feEquivalent: "min-h-[44px] min-w-[44px] px-4",
        pitfallNote:
          "Icon 20px vẫn cần button padding đủ 44x44px để không bấm trượt.",
      },
      {
        figmaProperty: "H1 22px Mobile → 32px Web",
        feEquivalent: "text-[clamp(1.375rem,2vw+0.8rem,2rem)]",
        pitfallNote:
          "clamp() giúp chữ co giãn mượt giữa các màn hình mà không bị vỡ dòng.",
      },
    ],
    challenge: {
      question:
        "Một icon 'Xóa' có kích thước hình vẽ 18x18px đặt trên thanh công cụ mobile. Khi viết FE React/Tailwind, cách nào vừa giữ icon nhỏ gọn vừa đạt chuẩn touch target?",
      options: [
        {
          id: "a",
          label: "Phóng to chính icon SVG lên 48x48px.",
        },
        {
          id: "b",
          label:
            "Đặt <button className='inline-flex h-11 w-11 items-center justify-center'> bọc quanh icon 18px.",
        },
        {
          id: "c",
          label: "Gắn onClick thẳng vào thẻ <svg> với w-[18px] h-[18px].",
        },
        {
          id: "d",
          label: "Giảm opacity xuống 0.5 để dễ nhìn.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Thẻ <button> kích thước h-11 w-11 (44x44px) mở rộng vùng chạm và hỗ trợ focus/keyboard, trong khi icon bên trong vẫn giữ 18px thanh thoát.",
    },
  },
  {
    id: "states-a11y",
    order: 4,
    badge: "Interaction · A11y Code",
    title: "Component States & Semantic A11y",
    subtitle:
      "Biến Variants (Default/Hover/Focus/Error/Disabled) từ Figma thành HTML chuẩn trợ năng.",
    figmaConcept: "Variants: Default · Hover · Focus · Error · Disabled",
    feConcept: ":hover · :focus-visible · aria-invalid · role='alert'",
    mappingRows: [
      {
        figmaProperty: "Variant State = Focus Ring",
        feEquivalent: "focus-visible:outline-2 focus-visible:outline-[#6D4AFF]",
        pitfallNote:
          "Không bao giờ viết outline: none mà không có style thay thế cho người dùng Tab.",
      },
      {
        figmaProperty: "Variant State = Error + Helper",
        feEquivalent: "aria-invalid={hasError} + <p role='alert'>",
        pitfallNote:
          "Không chỉ tô viền đỏ; phải gắn icon + chữ hướng dẫn sửa rõ ràng.",
      },
      {
        figmaProperty: "Clickable Card / Button",
        feEquivalent: "Luôn dùng <button type='button'> hoặc <a href>",
        pitfallNote:
          "Thẻ <div onClick> mất khả năng Tab bằng bàn phím và screen reader.",
      },
    ],
    challenge: {
      question:
        "Khi bạn code lại một ô nhập Email bị sai định dạng từ thiết kế Figma, cặp thuộc tính/element nào giúp cả người dùng thường lẫn Screen Reader nhận biết lỗi?",
      options: [
        {
          id: "a",
          label: "Chỉ thêm class border-red-500 là đủ.",
        },
        {
          id: "b",
          label:
            "Thêm aria-invalid='true' trên <input> + thông báo lỗi rõ ràng gắn role='alert' hoặc aria-describedby.",
        },
        {
          id: "c",
          label: "Disable luôn nút Hủy và nút Nhập lại.",
        },
        {
          id: "d",
          label: "Dùng thẻ <div> thay vì <input> để dễ style viền đỏ.",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Màu đỏ chỉ giúp người nhìn màu bình thường; aria-invalid + thông báo chữ cụ thể giúp cả keyboard/screen reader hiểu ngay lỗi gì và sửa thế nào.",
    },
  },
];
