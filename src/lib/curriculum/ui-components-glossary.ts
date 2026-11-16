export type UiComponentCategory = "overlay" | "action" | "navigation" | "data";

export type TerminologyRoundNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface UiComponentTerm {
  id: string;
  term: string;
  shortLabel: string;
  category: UiComponentCategory;
  categoryLabel: string;
  round: TerminologyRoundNumber;
  commonMistakes: string[];
  shortDefinition: string;
  whenToUse: string;
  confusedWith: {
    term: string;
    difference: string;
  };
  codeHint: string;
  visualCue: string;
}

export const TERMINOLOGY_ROUNDS: Array<{
  round: TerminologyRoundNumber;
  title: string;
  subtitle: string;
}> = [
  {
    round: 1,
    title: "Vòng 1 · Component dễ gọi sai nhất",
    subtitle:
      "Tooltip, FAB (hay nhầm float butter), Snackbar/Toast, Popover, Bottom Sheet, Segmented Control",
  },
  {
    round: 2,
    title: "Vòng 2 · Điều hướng & Phân cấp",
    subtitle:
      "Breadcrumb, Accordion, Stepper, Navigation Drawer, Pagination, Kebab Menu",
  },
  {
    round: 3,
    title: "Vòng 3 · Trạng thái, Nhãn & Phản hồi",
    subtitle:
      "Badge, Chip / Tag, Skeleton Screen, Empty State, Avatar Stack, Inline Banner",
  },
  {
    round: 4,
    title: "Vòng 4 · Lớp phủ & Nhập liệu thông minh",
    subtitle:
      "Modal Dialog, Combobox / Autocomplete, Toggle Switch, Carousel, Hover Card, Date Range Picker",
  },
  {
    round: 5,
    title: "Vòng 5 · Điều khiển Form & Chọn lựa nâng cao",
    subtitle:
      "Radio Group, Checkbox (Indeterminate), Range Slider, Split Button, File Dropzone, OTP Input",
  },
  {
    round: 6,
    title: "Vòng 6 · Bố cục App & Navigation hiện đại",
    subtitle:
      "Tabs, Command Palette (⌘K), Bottom Tab Bar, Mega Menu, Navigation Rail, Anchor / TOC",
  },
  {
    round: 7,
    title: "Vòng 7 · Dữ liệu, Bảng biểu & Tác vụ nhanh",
    subtitle:
      "Data Table, Context Menu (Chuột phải), Popconfirm, Timeline, Progress Meter, Bulk Action Bar",
  },
];

export const UI_COMPONENT_CATEGORY_LABELS: Record<
  UiComponentCategory | "all",
  string
> = {
  all: "Tất cả (42)",
  overlay: "Lớp phủ & Phản hồi",
  action: "Hành động & Nhập liệu",
  navigation: "Điều hướng & Phân cấp",
  data: "Hiển thị & Dữ liệu",
};

export const UI_COMPONENT_GLOSSARY: UiComponentTerm[] = [
  // ================= ROUND 1 =================
  {
    id: "tooltip",
    term: "Tooltip",
    shortLabel: "Mẹo chú thích ngắn khi rê chuột",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 1,
    commonMistakes: ["pop-up nhỏ", "hover box", "chú thích nổi"],
    shortDefinition:
      "Hộp chữ ngắn xuất hiện khi người dùng hover hoặc focus vào một icon/nút để giải thích công dụng.",
    whenToUse:
      "Dùng cho nút chỉ có icon (icon-only button) hoặc nhãn bị cắt ngắn; tuyệt đối không nhét nút bấm hay link vào trong Tooltip.",
    confusedWith: {
      term: "Popover",
      difference:
        "Tooltip chỉ chứa văn bản ngắn thụ động; Popover chứa được nội dung dài, checkbox lọc hoặc nút bấm tương tác.",
    },
    codeHint: 'role="tooltip" + aria-describedby',
    visualCue: "Bong bóng chữ tối nhỏ có mũi nhọn trỏ thẳng vào nút đang hover.",
  },
  {
    id: "fab",
    term: "Floating Action Button (FAB)",
    shortLabel: "Nút hành động chính nổi ở góc",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 1,
    commonMistakes: ["float butter", "float button", "nút tròn dấu cộng"],
    shortDefinition:
      "Nút tròn (hoặc pill mở rộng) nổi trên mặt nội dung ở góc dưới màn hình, đại diện cho 1 hành động tạo mới quan trọng nhất.",
    whenToUse:
      "Chỉ dùng tối đa 1 FAB mỗi màn hình (như '+ Soạn thư', '+ Thêm ghi chú'); tránh dùng nếu màn hình đã có CTA chính nổi bật trên header.",
    confusedWith: {
      term: "Primary Button",
      difference:
        "FAB dùng position fixed/sticky nổi độc lập trên luồng cuộn; Primary Button nằm cố định trong layout form hoặc thẻ.",
    },
    codeHint: "position: fixed; right: 20px; bottom: 20px; border-radius: 9999px;",
    visualCue: "Nút tròn nổi góc phải dưới khung mobile kèm bóng đổ rõ.",
  },
  {
    id: "snackbar",
    term: "Snackbar / Toast",
    shortLabel: "Thông báo nhanh tự tắt ở mép màn",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 1,
    commonMistakes: ["alert", "popup thông báo", "banner đáy"],
    shortDefinition:
      "Thanh phản hồi ngắn hiện thoáng qua ở mép màn hình (thường 3–5 giây) sau một thao tác, có thể kèm 1 nút ngắn như 'Hoàn tác'.",
    whenToUse:
      "Xác nhận hành động nhẹ ('Đã sao chép', 'Đã xóa — Hoàn tác'). Không dùng cho lỗi nghiêm trọng bắt người dùng phải đọc kỹ.",
    confusedWith: {
      term: "Inline Banner / Alert",
      difference:
        "Snackbar nổi tạm rồi tự biến mất; Inline Banner nằm hẳn trong luồng trang đến khi người dùng xử lý xong hoặc tự đóng.",
    },
    codeHint: 'role="status" aria-live="polite"',
    visualCue: "Thanh nổi màu tối ở đáy màn hình kèm chữ 'Hoàn tác'.",
  },
  {
    id: "popover",
    term: "Popover",
    shortLabel: "Khung nổi neo vào nút kích hoạt",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 1,
    commonMistakes: ["modal", "tooltip lớn", "menu thả"],
    shortDefinition:
      "Khung nổi xuất hiện khi click, neo trực tiếp vào phần tử kích hoạt để hiển thị bộ lọc, tùy chọn nhanh hoặc thông tin tương tác.",
    whenToUse:
      "Khi cần thao tác phụ ngay tại chỗ (chọn màu, lọc trạng thái, xem chi tiết nhanh) mà không cần che mờ toàn màn hình.",
    confusedWith: {
      term: "Modal Dialog",
      difference:
        "Popover neo cạnh nút bấm và không chặn nền bằng lớp tối dày; Modal căn giữa màn hình và khóa tương tác nền.",
    },
    codeHint: 'aria-haspopup="dialog" + anchor positioning',
    visualCue: "Khung trắng có mũi nhọn neo vào nút [Bộ lọc], chứa checkbox bên trong.",
  },
  {
    id: "bottom-sheet",
    term: "Bottom Sheet",
    shortLabel: "Tấm trượt từ cạnh dưới (Mobile)",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 1,
    commonMistakes: ["mobile popup", "drawer dưới", "action box"],
    shortDefinition:
      "Tấm giao diện trượt từ mép dưới màn hình Mobile lên, có thanh kéo (grabber handle) ở đỉnh để vuốt đóng hoặc kéo giãn.",
    whenToUse:
      "Ưu tiên trên Mobile thay cho Dropdown hoặc Modal phức tạp vì nằm gọn trong vùng ngón tay cái (thumb zone).",
    confusedWith: {
      term: "Modal Dialog",
      difference:
        "Bottom Sheet bám mép dưới và kéo thả được bằng ngón tay trên Mobile; Modal nằm lơ lửng giữa màn hình (hợp Desktop hơn).",
    },
    codeHint: "border-radius: 24px 24px 0 0 + grabber handle 32×4px",
    visualCue: "Khung mobile có nền tối phía trên và tấm bo tròn trượt từ đáy kèm thanh nắm.",
  },
  {
    id: "segmented-control",
    term: "Segmented Control",
    shortLabel: "Thanh chuyển chế độ dạng viên",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 1,
    commonMistakes: ["tab bar", "button group", "radio pill"],
    shortDefinition:
      "Nhóm 2–5 lựa chọn ngang hàng đặt trong cùng một khay bo tròn, chỉ chọn 1 trạng thái tại một thời điểm để đổi góc nhìn dữ liệu.",
    whenToUse:
      "Đổi chế độ hiển thị ngay tại chỗ (VD: Ngày / Tuần / Tháng, Danh sách / Lưới); tránh dùng cho hơn 5 mục.",
    confusedWith: {
      term: "Tabs",
      difference:
        "Segmented Control đổi góc nhìn cùng 1 tập dữ liệu; Tabs chuyển qua lại giữa các trang/nhóm nội dung tách biệt.",
    },
    codeHint: 'role="radiogroup" hoặc segmented tablist',
    visualCue: "Thanh khay có 3 nút [Ngày | Tuần | Tháng] với 1 viên sáng nổi bật.",
  },

  // ================= ROUND 2 =================
  {
    id: "breadcrumb",
    term: "Breadcrumb",
    shortLabel: "Đường dẫn phân cấp thư mục",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["menu ngang", "path bar", "step bar"],
    shortDefinition:
      "Chuỗi liên kết chỉ rõ vị trí trang hiện tại trong cây thư mục website (VD: Trang chủ › Sản phẩm › Áo khoác).",
    whenToUse:
      "Web có cấu trúc phân tầng từ 3 cấp trở lên (e-commerce, tài liệu, dashboard quản trị) giúp quay lại cấp cha chỉ bằng 1 click.",
    confusedWith: {
      term: "Stepper",
      difference:
        "Breadcrumb thể hiện cấu trúc cây thư mục có thể nhảy cấp tự do; Stepper thể hiện trình tự các bước tuần tự (1 → 2 → 3).",
    },
    codeHint: '<nav aria-label="Breadcrumb"><ol>...</ol></nav>',
    visualCue: "Dòng điều hướng phân cấp cách nhau bởi dấu › hoặc /.",
  },
  {
    id: "accordion",
    term: "Accordion",
    shortLabel: "Danh sách đóng/mở nội dung dọc",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["dropdown", "collapse box", "faq list"],
    shortDefinition:
      "Danh sách các tiêu đề xếp dọc cho phép bấm để xổ rộng hoặc thu gọn phần nội dung chi tiết ngay bên dưới.",
    whenToUse:
      "Trang FAQ, bộ lọc sidebar nhiều nhóm, hoặc phần mô tả dài cần giữ bố cục gọn gàng trước khi người dùng muốn đọc.",
    confusedWith: {
      term: "Dropdown / Select",
      difference:
        "Accordion mở rộng trực tiếp trong luồng trang để đọc nội dung; Dropdown mở menu nổi phía trên để chọn 1 giá trị cho form.",
    },
    codeHint: 'aria-expanded="true|false" + aria-controls',
    visualCue: "Các hàng tiêu đề xếp dọc, hàng đầu đang xổ nội dung với mũi tên hướng xuống.",
  },
  {
    id: "stepper",
    term: "Stepper (Progress Stepper)",
    shortLabel: "Thanh tiến trình theo từng bước",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["breadcrumb", "timeline", "progress bar"],
    shortDefinition:
      "Thanh đánh số bước theo thứ tự tuyến tính giúp người dùng biết mình đang ở bước nào trong quy trình nhiều chặng (VD: Checkout).",
    whenToUse:
      "Luồng tạo tài khoản, đặt hàng, khai báo thông tin dài cần chia nhỏ để giảm tải nhận thức.",
    confusedWith: {
      term: "Breadcrumb",
      difference:
        "Stepper chỉ rõ thứ tự hoàn thành công việc (Bước 1 → Bước 2); Breadcrumb chỉ đường dẫn phân cấp thư mục.",
    },
    codeHint: 'aria-current="step" trên bước đang thực hiện',
    visualCue: "Vòng tròn đánh số 1 — 2 — 3 nối nhau bằng đường tiến trình.",
  },
  {
    id: "drawer",
    term: "Navigation Drawer",
    shortLabel: "Ngăn kéo điều hướng trượt cạnh",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["hamburger menu", "sidebar popup", "panel trái"],
    shortDefinition:
      "Panel điều hướng trượt ra hoặc cố định ở cạnh trái/phải màn hình chứa danh mục trang và thiết lập cấp hệ thống.",
    whenToUse:
      "Ứng dụng có nhiều phân khu điều hướng chính trên Web App hoặc menu phụ trên Mobile (kích hoạt qua nút Menu).",
    confusedWith: {
      term: "Bottom Sheet",
      difference:
        "Navigation Drawer trượt ngang từ cạnh trái/phải cho điều hướng tổng thể; Bottom Sheet trượt dọc từ đáy cho tác vụ ngữ cảnh.",
    },
    codeHint: '<aside aria-label="Primary navigation">',
    visualCue: "Cột menu dọc trượt ở cạnh trái, che nhẹ hoặc đẩy phần nội dung chính.",
  },
  {
    id: "pagination",
    term: "Pagination",
    shortLabel: "Phân trang theo số trang",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["page bar", "stepper", "number list"],
    shortDefinition:
      "Thanh chuyển trang đánh số thứ tự giúp chia danh sách dữ liệu lớn thành từng trang nhỏ có thể nhảy tới đúng trang mong muốn.",
    whenToUse:
      "Bảng dữ liệu (SaaS table), kết quả tìm kiếm hoặc danh mục cần người dùng nhớ vị trí trang và quay lại dễ dàng.",
    confusedWith: {
      term: "Infinite Scroll",
      difference:
        "Pagination giữ điểm neo rõ ràng và dễ chạm tới Footer; Infinite Scroll tự tải liên tục hợp feed giải trí nhưng khó tìm lại vị trí cũ.",
    },
    codeHint: '<nav aria-label="Pagination"> + aria-current="page"',
    visualCue: "Dãy nút số trang ‹ 1 [2] 3 ... 12 › với 1 trang được tô đậm.",
  },
  {
    id: "kebab-menu",
    term: "Kebab / Overflow Menu",
    shortLabel: "Menu dấu 3 chấm dọc (⋮)",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 2,
    commonMistakes: ["three dots button", "settings icon", "hamburger"],
    shortDefinition:
      "Nút biểu tượng 3 dấu chấm dọc (⋮ — Kebab) hoặc ngang (⋯ — Meatball) gom các hành động phụ ít dùng vào menu xổ xuống.",
    whenToUse:
      "Giữ từng dòng trong Table hoặc Card luôn sạch sẽ bằng cách cất các thao tác phụ như Nhân bản, Lưu trữ, Xóa.",
    confusedWith: {
      term: "Hamburger Menu (☰)",
      difference:
        "Hamburger (☰) mở điều hướng cấp toàn ứng dụng; Kebab (⋮) chỉ mở menu hành động cho đúng 1 đối tượng/dòng đó.",
    },
    codeHint: 'aria-haspopup="menu" aria-expanded="..."',
    visualCue: "Biểu tượng 3 chấm dọc ⋮ bên góc thẻ mở ra danh sách Chỉnh sửa / Xóa.",
  },

  // ================= ROUND 3 =================
  {
    id: "badge",
    term: "Badge",
    shortLabel: "Huy hiệu đếm số / trạng thái thụ động",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 3,
    commonMistakes: ["tag", "chip", "pill button"],
    shortDefinition:
      "Nhãn nhỏ hoặc chấm tròn gắn trên icon/tiêu đề để báo số lượng chưa đọc hoặc trạng thái (Mới, Đã duyệt, Chờ xử lý).",
    whenToUse:
      "Chỉ dùng để hiển thị thông tin thụ động (không phải nút để xóa hay bấm lọc); giữ text trong Badge thật ngắn (1–2 từ hoặc số).",
    confusedWith: {
      term: "Chip / Tag",
      difference:
        "Badge chỉ để xem trạng thái hoặc đếm số; Chip là phần tử tương tác (có thể bấm chọn filter hoặc bấm × để gỡ).",
    },
    codeHint: "inline-flex items-center rounded-full text-xs (chỉ hiển thị)",
    visualCue: "Chuông có chấm số đỏ '3' trên góc kèm nhãn trạng thái thụ động.",
  },
  {
    id: "chip",
    term: "Chip / Tag",
    shortLabel: "Thẻ chọn lọc hoặc gắn nhãn tương tác",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 3,
    commonMistakes: ["badge", "mini button", "label"],
    shortDefinition:
      "Khối viên nang nhỏ đại diện cho một bộ lọc, từ khóa hoặc lựa chọn có thể bấm bật/tắt hoặc xóa trực tiếp bằng dấu ×.",
    whenToUse:
      "Bộ lọc nhanh nhiều lựa chọn (Filter Chip), danh sách người nhận email, hoặc thẻ chủ đề có thể chọn.",
    confusedWith: {
      term: "Badge",
      difference:
        "Chip tương tác được (chọn / bỏ chọn / xóa ×); Badge chỉ mang tính báo trạng thái hoặc đếm số không tương tác.",
    },
    codeHint: "<button> cho Filter Chip hoặc kèm nút remove × có aria-label",
    visualCue: "Các thẻ bo tròn có dấu × để gỡ bỏ và chip + để thêm bộ lọc.",
  },
  {
    id: "skeleton",
    term: "Skeleton Screen",
    shortLabel: "Khung xương giả lập khi đang tải",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 3,
    commonMistakes: ["grey box", "loading bar", "spinner"],
    shortDefinition:
      "Bản phác thảo cấu trúc khung thẻ bằng các khối xám nhấp nháy giúp người dùng hình dung bố cục trước khi dữ liệu tải xong.",
    whenToUse:
      "Khi tải danh sách bài viết, bảng hoặc profile từ 0.5–3 giây để giảm cảm giác chờ đợi và tránh nhảy layout (CLS).",
    confusedWith: {
      term: "Spinner / Loader",
      difference:
        "Spinner xoay vòng chung chung và dễ gây sốt ruột nếu tải trang lớn; Skeleton giữ đúng khung chữ/ảnh giúp cảm giác tải nhanh hơn.",
    },
    codeHint: 'aria-busy="true" + CSS shimmer / animate-pulse',
    visualCue: "Khung thẻ gồm hình tròn xám và 2 thanh xám mô phỏng tiêu đề đang tải.",
  },
  {
    id: "empty-state",
    term: "Empty State",
    shortLabel: "Trạng thái rỗng có hướng dẫn hành động",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 3,
    commonMistakes: ["404 page", "blank screen", "error box"],
    shortDefinition:
      "Màn hình hiển thị khi chưa có dữ liệu (chưa có đơn hàng, giỏ hàng trống, không có kết quả tìm) kèm lời giải thích và CTA tạo mới.",
    whenToUse:
      "Mọi danh sách rỗng hoặc màn hình khởi tạo đầu tiên; luôn cho người dùng 1 lối thoát rõ ràng thay vì để trắng trơn.",
    confusedWith: {
      term: "Error State",
      difference:
        "Empty State là bình thường khi chưa có dữ liệu hoặc bộ lọc không khớp; Error State xảy ra khi hệ thống/mạng gặp sự cố.",
    },
    codeHint: "Icon/minh họa nhẹ + Heading + Helper text + 1 Primary CTA",
    visualCue: "Khung nét đứt ở giữa trang với biểu tượng thư mục trống và nút '+ Tạo mới'.",
  },
  {
    id: "avatar-stack",
    term: "Avatar Stack (Avatar Group)",
    shortLabel: "Cụm ảnh đại diện xếp chồng",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 3,
    commonMistakes: ["user icons", "circle list", "team badge"],
    shortDefinition:
      "Nhóm các ảnh đại diện hình tròn xếp chồng nhẹ lên nhau với viền tách trắng và vòng tròn đếm phần dư (+5) ở cuối.",
    whenToUse:
      "Hiển thị thành viên đang cùng xem file Figma, người tham gia dự án hoặc danh sách người đã phản ứng trong không gian hẹp.",
    confusedWith: {
      term: "User List Item",
      difference:
        "Avatar Stack tiết kiệm diện tích cho 3–10+ người trên 1 dòng; User List dùng khi cần đọc rõ họ tên và vai trò từng người.",
    },
    codeHint: "flex -space-x-2 + ring-2 ring-white trên mỗi avatar",
    visualCue: "Các vòng tròn đại diện xếp chồng lên nhau kèm ô tròn '+5'.",
  },
  {
    id: "alert-banner",
    term: "Inline Banner / Alert",
    shortLabel: "Dải cảnh báo nằm trong luồng trang",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 3,
    commonMistakes: ["toast", "snackbar", "top bar"],
    shortDefinition:
      "Khối thông báo đặt trực tiếp trong dòng chảy nội dung để báo thông tin quan trọng, cảnh báo hoặc lỗi theo ngữ cảnh.",
    whenToUse:
      "Thông báo hệ thống bảo trì, nhắc xác minh email, hoặc lỗi form cần người dùng đọc rõ mà không biến mất sau vài giây.",
    confusedWith: {
      term: "Snackbar / Toast",
      difference:
        "Banner bám cố định trong trang và không tự tắt; Toast/Snackbar nổi đè lên góc màn hình và tự đóng sau vài giây.",
    },
    codeHint: 'role="alert" (lỗi gấp) hoặc role="region" (thông tin)',
    visualCue: "Hộp thông báo viền màu nằm ngang bên trong luồng trang kèm biểu tượng ⚠.",
  },

  // ================= ROUND 4 =================
  {
    id: "modal",
    term: "Modal Dialog",
    shortLabel: "Hộp thoại chặn nền yêu cầu xác nhận",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 4,
    commonMistakes: ["popover", "popup", "window box"],
    shortDefinition:
      "Cửa sổ hộp thoại bật lên chính giữa màn hình cùng lớp phủ tối phía sau (backdrop), buộc người dùng xử lý trước khi quay lại trang.",
    whenToUse:
      "Hành động rủi ro cao không thể hoàn tác (xóa tài khoản, hủy thanh toán) hoặc form ngắn cần sự tập trung tuyệt đối.",
    confusedWith: {
      term: "Popover",
      difference:
        "Modal khóa nền và nằm giữa màn hình; Popover gắn sát phần tử bấm và tự đóng khi click ra ngoài.",
    },
    codeHint: 'role="dialog" aria-modal="true" + focus trap + ESC close',
    visualCue: "Nền xám tối phía sau làm nổi hộp thoại giữa màn hình có 2 nút Hủy / Xóa.",
  },
  {
    id: "combobox",
    term: "Combobox / Autocomplete",
    shortLabel: "Ô nhập kết hợp lọc gợi ý danh sách",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 4,
    commonMistakes: ["search bar", "select dropdown", "input box"],
    shortDefinition:
      "Ô nhập văn bản kết hợp danh sách thả xuống tự lọc gợi ý theo từng ký tự người dùng gõ vào.",
    whenToUse:
      "Khi danh sách lựa chọn dài (>15 mục) như chọn quốc gia, chọn font chữ, gán người phụ trách — dùng Select thường sẽ cuộn rất mệt.",
    confusedWith: {
      term: "Select Dropdown",
      difference:
        "Select chỉ bấm mở danh sách cố định để chọn; Combobox cho phép gõ từ khóa để tìm và lọc danh sách ngay lập tức.",
    },
    codeHint: 'role="combobox" aria-autocomplete="list" aria-expanded',
    visualCue: "Ô nhập chữ đang gõ kèm khung thả xuống tô sáng dòng gợi ý khớp.",
  },
  {
    id: "toggle-switch",
    term: "Toggle Switch",
    shortLabel: "Công tắc gạt Bật / Tắt tức thì",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 4,
    commonMistakes: ["checkbox", "radio button", "slider"],
    shortDefinition:
      "Công tắc trạng thái nhị phân (Bật / Tắt) có hiệu lực ngay lập tức mà không cần bấm thêm nút Lưu.",
    whenToUse:
      "Cài đặt hệ thống (Dark Mode, Bật thông báo, Công khai hồ sơ) nơi trạng thái đổi ngay khi chạm.",
    confusedWith: {
      term: "Checkbox",
      difference:
        "Toggle Switch đổi trạng thái hệ thống ngay lập tức; Checkbox dùng trong form cần bấm 'Gửi/Lưu' hoặc chọn nhiều mục trong danh sách.",
    },
    codeHint: 'role="switch" aria-checked="true|false"',
    visualCue: "Hai thanh công tắc gạt trạng thái BẬT (đậm) và TẮT (nhạt).",
  },
  {
    id: "carousel",
    term: "Carousel",
    shortLabel: "Băng chuyền trượt ngang nhiều thẻ",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 4,
    commonMistakes: ["gallery", "slider", "card row"],
    shortDefinition:
      "Khối trình chiếu cho phép lướt hoặc bấm mũi tên ‹ › để duyệt nhiều ảnh/thẻ nội dung theo chiều ngang trong 1 vùng cố định.",
    whenToUse:
      "Thư viện ảnh sản phẩm, danh sách gợi ý ngang trên Mobile (hãy để hé mép thẻ kế tiếp để báo hiệu cuộn được).",
    confusedWith: {
      term: "Grid Layout",
      difference:
        "Carousel giấu bớt nội dung ngoài khung nhìn để tiết kiệm chiều cao; Grid cho phép quét nhanh tất cả mục cùng lúc.",
    },
    codeHint: 'aria-roledescription="carousel" + nút Previous / Next rõ ràng',
    visualCue: "Khung thẻ có thẻ kế bên hé lộ ở mép phải, mũi tên ‹ › và các chấm tròn phía dưới.",
  },
  {
    id: "hover-card",
    term: "Hover Card (Preview Card)",
    shortLabel: "Thẻ xem trước giàu thông tin khi hover",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 4,
    commonMistakes: ["tooltip", "modal", "profile box"],
    shortDefinition:
      "Khung nổi xuất hiện khi rê chuột vào liên kết/tên người dùng để xem tóm tắt giàu hình ảnh (avatar, bio, chỉ số) trước khi bấm mở.",
    whenToUse:
      "Mạng xã hội, tài liệu nội bộ, GitHub/Figma nơi rê vào @tên hiển thị tóm tắt hồ sơ mà không cần chuyển trang.",
    confusedWith: {
      term: "Tooltip",
      difference:
        "Tooltip chỉ chứa 1 câu text thuần siêu ngắn; Hover Card chứa bố cục phức tạp (ảnh, nhãn, nút Follow/Xem chi tiết).",
    },
    codeHint: "hover delay ~200ms + giữ mở khi chuột di chuyển vào trong card",
    visualCue: "Chữ @tên có gạch chân chấm, bung ra thẻ hồ sơ mini gồm avatar và chỉ số.",
  },
  {
    id: "date-picker",
    term: "Date Range Picker",
    shortLabel: "Bộ chọn ngày / khoảng ngày theo lịch",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 4,
    commonMistakes: ["calendar", "time box", "dropdown date"],
    shortDefinition:
      "Lưới lịch tương tác cho phép chọn 1 ngày cụ thể hoặc kéo/chọn khoảng ngày bắt đầu – kết thúc trực quan.",
    whenToUse:
      "Đặt phòng/vé máy bay, lọc báo cáo doanh thu theo tuần/tháng (khi cần biết thứ trong tuần của ngày đó).",
    confusedWith: {
      term: "Masked Date Input",
      difference:
        "Date Picker trực quan để chọn ngày gần đây/khoảng ngày; ô nhập tay (DD/MM/YYYY) nhanh hơn nhiều cho Ngày sinh!",
    },
    codeHint: 'role="grid" + aria-selected cho ngày bắt đầu/kết thúc',
    visualCue: "Bảng lịch tháng thu nhỏ có khoảng ngày 12 → 15 được nối dải màu liên tục.",
  },

  // ================= ROUND 5 =================
  {
    id: "radio-group",
    term: "Radio Group",
    shortLabel: "Nhóm nút tròn chọn duy nhất 1 phương án",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["check circle", "option list", "single checkbox"],
    shortDefinition:
      "Nhóm các nút tròn đi kèm nhãn nơi người dùng chỉ được chọn đúng 1 phương án duy nhất và thấy ngay tất cả lựa chọn hiện có.",
    whenToUse:
      "Khi có từ 2–5 lựa chọn loại trừ nhau trong Form (VD: Phương thức thanh toán, Gói cước); nếu nhiều hơn 5 hãy cân nhắc Select.",
    confusedWith: {
      term: "Checkbox Group",
      difference:
        "Radio (hình tròn) chỉ chọn 1 phương án; Checkbox (hình vuông) cho phép chọn 0, 1 hoặc nhiều phương án cùng lúc.",
    },
    codeHint: '<fieldset> + <input type="radio" name="...">',
    visualCue: "Các vòng tròn xếp dọc với đúng 1 vòng tròn có chấm tâm đậm.",
  },
  {
    id: "checkbox-group",
    term: "Checkbox (kèm Indeterminate)",
    shortLabel: "Ô vuông đa lựa chọn & trạng thái chọn 1 phần",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["tick box", "check circle", "multi radio"],
    shortDefinition:
      "Ô vuông cho phép chọn nhiều mục độc lập, hỗ trợ 3 trạng thái: trống (unchecked), tích đủ (checked) và gạch ngang lửng (indeterminate).",
    whenToUse:
      "Chọn nhiều hàng trong bảng, đồng ý điều khoản, hoặc ô 'Chọn tất cả' khi mới tích một vài mục con bên dưới.",
    confusedWith: {
      term: "Toggle Switch",
      difference:
        "Checkbox thuộc Form cần bấm Lưu hoặc dùng chọn nhiều mục; Toggle Switch bật/tắt cài đặt có hiệu lực ngay lập tức.",
    },
    codeHint: 'input.indeterminate = true + aria-checked="mixed"',
    visualCue: "Ô vuông cấp cha mang dấu gạch ngang [–] khi bên dưới chỉ tích 1/2 mục con.",
  },
  {
    id: "range-slider",
    term: "Range Slider (Dual-Thumb Slider)",
    shortLabel: "Thanh trượt chọn giá trị hoặc khoảng giá trị",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["progress bar", "scroll bar", "drag line"],
    shortDefinition:
      "Thanh ray ngang có 1 hoặc 2 nút kéo (thumb) cho phép ước lượng nhanh giá trị liên tục như mức giá, âm lượng hoặc bán kính.",
    whenToUse:
      "Bộ lọc khoảng giá E-commerce, chỉnh âm lượng/độ mờ; nếu cần con số chính xác từng đồng thì luôn kèm thêm ô nhập số.",
    confusedWith: {
      term: "Progress Bar",
      difference:
        "Slider là điều khiển nhập liệu cho phép người dùng kéo chỉnh; Progress Bar chỉ dùng để hiển thị tiến độ hệ thống.",
    },
    codeHint: 'role="slider" aria-valuemin aria-valuemax aria-valuenow',
    visualCue: "Thanh trượt có 2 núm tròn kéo khoảng giá từ 200k đến 800k.",
  },
  {
    id: "split-button",
    term: "Split Button",
    shortLabel: "Nút kép: hành động chính + mũi tên tùy chọn phụ",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["dropdown button", "two buttons", "combo button"],
    shortDefinition:
      "Một cụm nút duy nhất chia 2 vùng: phần trái kích hoạt hành động mặc định ngay, phần mũi tên phải mở menu các biến thể hành động đó.",
    whenToUse:
      "Trong công cụ biên tập/SaaS (VD: [ Xuất bản | ▾ Lên lịch / Lưu nháp ], [ Phản hồi | ▾ Gửi & Đóng ticket ]).",
    confusedWith: {
      term: "Dropdown Menu Button",
      difference:
        "Dropdown Button bấm vào chỗ nào trên nút cũng chỉ mở danh sách; Split Button cho phép bấm phần trái để chạy ngay 1 lệnh chính.",
    },
    codeHint: "2 <button> kề nhau ngăn bởi 1px divider, nút phải aria-haspopup='menu'",
    visualCue: "Nút tối màu có đường vạch dọc ngăn phần chữ chính và ô mũi tên ▾ bên phải.",
  },
  {
    id: "file-dropzone",
    term: "File Dropzone",
    shortLabel: "Vùng kéo thả & tải lên tệp tin",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["upload box", "dashed card", "empty state"],
    shortDefinition:
      "Vùng viền nét đứt tiếp nhận thao tác kéo-thả file từ máy tính hoặc click để mở hộp thoại chọn tệp, hiển thị định dạng/dung lượng tối đa.",
    whenToUse:
      "Nộp bài tập, tải ảnh đại diện/CV, nhập file CSV; luôn hỗ trợ cả bấm nút chọn truyền thống cho Accessibility.",
    confusedWith: {
      term: "Empty State",
      difference:
        "Cả hai đều hay dùng khung nét đứt, nhưng Dropzone chuyên nhận kéo-thả tệp vào hệ thống; Empty State báo danh sách chưa có dữ liệu.",
    },
    codeHint: '<label> bọc <input type="file"> + dragover/drop event',
    visualCue: "Khung viền đứt kèm icon mũi tên tải lên và ghi chú PDF/PNG ≤ 10MB.",
  },
  {
    id: "otp-input",
    term: "OTP / PIN Input",
    shortLabel: "Dãy ô đơn nhập mã xác thực từng số",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 5,
    commonMistakes: ["code boxes", "password boxes", "square inputs"],
    shortDefinition:
      "Chuỗi 4–6 ô vuông tách rời, tự động nhảy con trỏ sang ô kế tiếp khi nhập và hỗ trợ dán (Ctrl+V) cả chuỗi mã OTP cùng lúc.",
    whenToUse:
      "Xác thực 2 lớp (2FA), nhập mã OTP ngân hàng/SMS có độ dài cố định (thường 4 hoặc 6 chữ số).",
    confusedWith: {
      term: "Single Text Input",
      difference:
        "OTP Input giúp đếm nhanh số chữ số còn thiếu bằng mắt, đồng thời kích hoạt bàn phím số + tự động điền SMS OTP trên Mobile.",
    },
    codeHint: 'inputmode="numeric" autocomplete="one-time-code"',
    visualCue: "Hàng 6 ô vuông rời nhau đã điền 4 số đầu, ô thứ 5 đang focus.",
  },

  // ================= ROUND 6 =================
  {
    id: "tabs",
    term: "Tabs (Tab Bar)",
    shortLabel: "Thanh thẻ chuyển cụm nội dung ngang",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["segmented control", "menu", "pills"],
    shortDefinition:
      "Dãy tiêu đề đặt ngang hàng cho phép chuyển đổi qua lại giữa các phân khu nội dung ngang cấp mà không rời khỏi trang hiện tại.",
    whenToUse:
      "Trang hồ sơ (Tổng quan / Bài viết / Đánh giá) hoặc trang chi tiết sản phẩm (Mô tả / Thông số / Bình luận).",
    confusedWith: {
      term: "Segmented Control",
      difference:
        "Tabs thường dùng thanh gạch chân dưới (underline) cho các cụm nội dung khác nhau; Segmented Control dạng viên khay để đổi chế độ xem cùng dữ liệu.",
    },
    codeHint: 'role="tablist" + role="tab" + aria-selected + role="tabpanel"',
    visualCue: "Thanh ngang có gạch chân đen đậm dưới thẻ đang chọn.",
  },
  {
    id: "command-palette",
    term: "Command Palette (⌘K)",
    shortLabel: "Hộp tìm kiếm & chạy lệnh nhanh toàn cục",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["search modal", "quick popup", "spotlight box"],
    shortDefinition:
      "Hộp thoại tìm kiếm kết hợp thực thi lệnh toàn ứng dụng được mở bằng phím tắt ⌘K / Ctrl+K (phong cách Linear, Notion, Figma).",
    whenToUse:
      "Sản phẩm SaaS/công cụ chuyên sâu giúp người dùng thành thạo nhảy nhanh tới trang, tìm dữ liệu hoặc đổi giao diện không cần rời bàn phím.",
    confusedWith: {
      term: "Search Bar",
      difference:
        "Search Bar chỉ lọc dữ liệu văn bản trên trang; Command Palette thực thi cả hành động (Tạo task mới, Đổi Dark Mode...) kèm phím tắt.",
    },
    codeHint: "Global keydown listener (metaKey/ctrlKey + k) + role='combobox'",
    visualCue: "Hộp nổi giữa màn có ô tìm kiếm + chữ ⌘K và danh sách lệnh kèm phím tắt.",
  },
  {
    id: "bottom-nav",
    term: "Bottom Navigation Bar (Tab Bar)",
    shortLabel: "Thanh điều hướng đáy cố định trên Mobile",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["footer bar", "dock", "mobile menu"],
    shortDefinition:
      "Thanh cố định ở đáy màn hình Mobile chứa 3–5 điểm đến cấp cao nhất của ứng dụng (iOS gọi là Tab Bar, Material gọi là Navigation Bar).",
    whenToUse:
      "Mọi Mobile App cần chuyển qua lại nhanh bằng ngón tay cái giữa 3–5 phân khu chính; tránh nhét quá 5 mục gây chật.",
    confusedWith: {
      term: "Sticky Action Footer",
      difference:
        "Bottom Nav Bar để chuyển trang gốc (Trang chủ / Khám phá / Hồ sơ); Sticky Action Footer chứa nút CTA chốt đơn như 'Thanh toán'.",
    },
    codeHint: "position: fixed; bottom: 0; padding-bottom: env(safe-area-inset-bottom)",
    visualCue: "Khung đáy màn hình điện thoại có 4 icon + nhãn nhỏ, 1 mục đang sáng màu.",
  },
  {
    id: "mega-menu",
    term: "Mega Menu",
    shortLabel: "Menu thả cỡ lớn chia nhiều cột danh mục",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["big dropdown", "popover", "category box"],
    shortDefinition:
      "Panel thả xuống khổ rộng từ thanh điều hướng trên cùng, tổ chức hàng chục danh mục con theo nhiều cột rõ ràng thay vì menu lồng 3 tầng.",
    whenToUse:
      "Website thương mại điện tử hoặc cổng thông tin lớn có rất nhiều ngành hàng cần người dùng quét mắt cùng lúc trên Desktop.",
    confusedWith: {
      term: "Nested Dropdown (Menu xổ nhiều tầng)",
      difference:
        "Menu xổ nhiều tầng dễ trượt chuột làm đóng menu; Mega Menu trải phẳng toàn bộ nhóm con vào các cột dễ nhìn.",
    },
    codeHint: "hover intent delay hoặc click toggle + lưới grid 3–4 cột",
    visualCue: "Bảng thả rộng dưới thanh header chia 3 cột danh mục + thẻ nổi bật bên phải.",
  },
  {
    id: "nav-rail",
    term: "Navigation Rail (Mini Sidebar)",
    shortLabel: "Thanh icon điều hướng dọc thu gọn bên trái",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["left bar", "toolbar", "drawer"],
    shortDefinition:
      "Dải điều hướng dọc hẹp (khoảng 56–72px) chứa các icon cấp cao nhất bên cạnh vùng làm việc chính, có thể mở rộng thành Sidebar đầy đủ.",
    whenToUse:
      "Web App / Tablet cần tối đa hóa diện tích nội dung nhưng vẫn giữ lối chuyển khu vực chỉ với 1 click (như chính app MeowProduct!).",
    confusedWith: {
      term: "Navigation Drawer",
      difference:
        "Navigation Rail luôn lộ diện gọn theo chiều dọc (icon-first); Drawer rộng hơn hoặc trượt phủ lên màn hình.",
    },
    codeHint: "<nav className='w-16 flex flex-col items-center'>",
    visualCue: "Cột trắng hẹp bên mép trái xếp dọc các icon trong khung bo tròn.",
  },
  {
    id: "anchor-toc",
    term: "Anchor / Table of Contents (TOC)",
    shortLabel: "Mục lục neo mục đang đọc bên lề",
    category: "navigation",
    categoryLabel: "Điều hướng & Phân cấp",
    round: 6,
    commonMistakes: ["sidebar menu", "stepper", "tabs"],
    shortDefinition:
      "Danh mục các đề mục H2/H3 gắn dính bên cạnh bài viết dài, tự động đánh dấu mục người dùng đang cuộn tới (Scrollspy) và bấm nhảy tới đoạn đó.",
    whenToUse:
      "Trang tài liệu kỹ thuật (Docs), bài phân tích dài, chính sách giúp người đọc nắm cấu trúc và nhảy thẳng tới phần cần xem.",
    confusedWith: {
      term: "Primary Sidebar Navigation",
      difference:
        "Primary Sidebar điều hướng giữa các TRANG khác nhau; TOC điều hướng giữa các ĐỀ MỤC ngay trong cùng 1 trang.",
    },
    codeHint: "IntersectionObserver + position: sticky + anchor <a href='#section'>",
    visualCue: "Cột đường kẻ dọc bên phải với 1 đề mục được đánh dấu vạch đậm nổi bật.",
  },

  // ================= ROUND 7 =================
  {
    id: "data-table",
    term: "Data Table (Sticky Header & Sort)",
    shortLabel: "Bảng dữ liệu có sắp xếp & cố định tiêu đề",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 7,
    commonMistakes: ["excel grid", "list view", "card grid"],
    shortDefinition:
      "Bảng hiển thị dữ liệu cấu trúc theo hàng/cột, hỗ trợ sắp xếp cột (Sort ⇅), giữ tiêu đề dính khi cuộn và căn phải các cột số tiền/số lượng.",
    whenToUse:
      "Màn hình quản trị SaaS, đối soát đơn hàng, bảng điểm cần so sánh chéo nhiều thuộc tính giữa các dòng.",
    confusedWith: {
      term: "Card List",
      difference:
        "Data Table tối ưu so sánh từng cột theo hàng dọc trên Desktop; Card List hợp hiển thị tóm tắt trên màn hình Mobile hẹp.",
    },
    codeHint: "<table> + thead { position: sticky; top: 0 } + font-variant-numeric: tabular-nums",
    visualCue: "Bảng có hàng tiêu đề dính kèm mũi tên ⇅ và cột số tiền căn thẳng mép phải.",
  },
  {
    id: "context-menu",
    term: "Context Menu (Right-Click Menu)",
    shortLabel: "Menu ngữ cảnh bật tại vị trí chuột phải",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 7,
    commonMistakes: ["kebab menu", "dropdown", "popover"],
    shortDefinition:
      "Menu thả nổi xuất hiện chính xác tại tọa độ con trỏ chuột khi nhấp chuột phải (hoặc nhấn giữ trên Mobile), chỉ chứa lệnh áp dụng cho đối tượng đó.",
    whenToUse:
      "Công cụ thiết kế (Figma), quản lý file, bảng dữ liệu nơi người dùng quen bấm chuột phải để Sao chép, Nhân bản, Đổi tên.",
    confusedWith: {
      term: "Kebab Menu (⋮)",
      difference:
        "Kebab Menu có nút icon ⋮ hiển thị rõ để bấm chuột trái; Context Menu ẩn đi và chỉ hiện tại điểm click chuột phải.",
    },
    codeHint: "onContextMenu (preventDefault) + tọa độ clientX / clientY",
    visualCue: "Mũi tên chuột phải trên dòng đối tượng bung ra bảng Sao chép / Đổi tên / Xóa.",
  },
  {
    id: "popconfirm",
    term: "Popconfirm",
    shortLabel: "Khung xác nhận nhanh neo ngay cạnh nút bấm",
    category: "overlay",
    categoryLabel: "Lớp phủ & Phản hồi",
    round: 7,
    commonMistakes: ["tooltip", "mini modal", "alert box"],
    shortDefinition:
      "Popover xác nhận thu gọn bật ngay cạnh nút vừa bấm (VD: nút Xóa trong bảng) với câu hỏi ngắn + 2 nút Hủy / Xác nhận.",
    whenToUse:
      "Xác nhận nhanh các thao tác xóa/gỡ mức trung bình ngay trong dòng bảng để không làm mất ngữ cảnh như Modal che toàn màn hình.",
    confusedWith: {
      term: "Modal Dialog",
      difference:
        "Popconfirm nhỏ gọn neo ngay cạnh nút bấm và giữ nguyên tầm mắt; Modal che mờ cả màn hình cho thao tác cực kỳ hệ trọng.",
    },
    codeHint: "Anchored confirmation dialog + focus tự động vào nút Hủy/an toàn",
    visualCue: "Nút Xóa nhỏ bật ra bong bóng trắng ngay phía trên hỏi 'Xác nhận xóa?' + 2 nút.",
  },
  {
    id: "timeline",
    term: "Timeline (Activity Feed)",
    shortLabel: "Dòng thời gian nối mốc sự kiện dọc",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 7,
    commonMistakes: ["stepper", "vertical list", "history box"],
    shortDefinition:
      "Danh sách sự kiện xếp theo chiều dọc nối bằng đường kẻ và các chấm mốc, thể hiện lịch sử thay đổi hoặc hành trình đơn hàng theo thời gian.",
    whenToUse:
      "Theo dõi vận đơn, lịch sử chỉnh sửa thiết kế, audit log hệ thống hoặc tiến trình tuyển dụng.",
    confusedWith: {
      term: "Stepper",
      difference:
        "Timeline ghi lại các sự kiện đã/đang diễn ra kèm dấu thời gian (timestamps); Stepper dẫn hướng người dùng tự thao tác qua các bước Form.",
    },
    codeHint: "<ol> với đường nối dọc border-l + dấu thời gian <time>",
    visualCue: "Các chấm mốc nối bởi đường kẻ dọc kèm mốc giờ và trạng thái giao hàng.",
  },
  {
    id: "progress-meter",
    term: "Progress Bar vs Meter",
    shortLabel: "Thanh đo tiến trình hoặc mức độ (Meter)",
    category: "data",
    categoryLabel: "Hiển thị & Dữ liệu",
    round: 7,
    commonMistakes: ["slider", "loading line", "chart bar"],
    shortDefinition:
      "Thanh ngang hiển thị phần trăm hoàn thành một tác vụ (Progress) hoặc mức độ đo lường tại một ngưỡng (Meter: dung lượng ổ đĩa, độ mạnh mật khẩu).",
    whenToUse:
      "Dùng Progress Bar cho quá trình đang chạy (upload 65%); dùng Meter cho tỷ lệ tĩnh trong giới hạn (8/10 GB, Mật khẩu Mạnh).",
    confusedWith: {
      term: "Range Slider",
      difference:
        "Progress/Meter chỉ để ĐỌC trạng thái; Slider có nút kéo tròn để người dùng TƯƠNG TÁC thay đổi giá trị.",
    },
    codeHint: "<progress value='65' max='100'> hoặc <meter min='0' max='100'>",
    visualCue: "Thanh bo tròn thể hiện phần trăm tô màu kèm nhãn tỷ lệ rõ ràng.",
  },
  {
    id: "bulk-action-bar",
    term: "Bulk Action Bar (Contextual Toolbar)",
    shortLabel: "Thanh thao tác hàng loạt khi tích nhiều dòng",
    category: "action",
    categoryLabel: "Hành động & Nhập liệu",
    round: 7,
    commonMistakes: ["snackbar", "floating menu", "top bar"],
    shortDefinition:
      "Thanh công cụ nổi bật xuất hiện khi người dùng tích chọn từ 1–nhiều hàng trong bảng/lưới, gom số lượng đã chọn + nút Xuất/Xóa hàng loạt.",
    whenToUse:
      "Bảng dữ liệu, thư viện ảnh hoặc hộp thư cho phép thao tác nhiều đối tượng cùng lúc mà không làm rác giao diện khi chưa chọn gì.",
    confusedWith: {
      term: "Snackbar / Toast",
      difference:
        "Snackbar chỉ thông báo kết quả sau khi làm xong; Bulk Action Bar hiện ra TRƯỚC khi làm để cung cấp các nút tác vụ hàng loạt.",
    },
    codeHint: "role='toolbar' aria-label='Thao tác hàng loạt' xuất hiện khi selectedCount > 0",
    visualCue: "Thanh nổi tối màu hiện chữ 'Đã chọn 3' cùng nút [Xuất CSV] [Xóa] và dấu × bỏ chọn.",
  },
];
