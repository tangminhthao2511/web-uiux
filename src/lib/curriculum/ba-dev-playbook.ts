export interface CollabScenario {
  id: string;
  partner: "BA" | "Dev FE" | "Dev BE / Fullstack";
  stageLabel: string;
  title: string;
  context: string;
  incomingMessage: string;
  options: {
    id: string;
    label: string;
    detail: string;
  }[];
  correctOptionId: string;
  whyItWorks: string;
  copyTemplate: string;
}

export interface CollabChecklistGroup {
  id: string;
  partner: "BA" | "Dev";
  title: string;
  subtitle: string;
  items: {
    id: string;
    label: string;
    why: string;
  }[];
}

export interface CommunicationTemplate {
  id: string;
  audience: "Với BA" | "Với Dev";
  situation: string;
  script: string;
}

export const BA_DEV_SCENARIOS: CollabScenario[] = [
  {
    id: "ba-1-story-gap",
    partner: "BA",
    stageLabel: "Nhận User Story / PRD",
    title: "BA gửi mô tả chỉ có Happy Path (thiếu ngoại lệ)",
    context:
      "Bạn nhận task thiết kế màn hình 'Áp dụng mã giảm giá khi Thanh toán'. Tài liệu của BA chỉ viết 2 dòng: 'User nhập mã -> Hệ thống giảm tiền -> Bấm Thanh toán'.",
    incomingMessage:
      "BA: 'Em vẽ giúp chị màn hình nhập voucher đơn giản thôi nha, mai mình review với team Dev.'",
    options: [
      {
        id: "a",
        label: "Vẽ ngay 1 màn hình nhập mã thành công cho kịp mai review",
        detail: "Các lỗi nhập sai hay mã hết hạn để Dev tự xử lý lúc code.",
      },
      {
        id: "b",
        label: "Chốt trước 5 câu hỏi Edge Cases với BA rồi mới vẽ Wireframe",
        detail:
          "Hỏi rõ: mã hết hạn/sai điều kiện tối thiểu báo thế nào, có dùng nhiều mã cùng lúc không, và hoàn tiền ra sao nếu hủy đơn.",
      },
      {
        id: "c",
        label: "Tự bịa ra rule 'mỗi đơn chỉ dùng 1 mã' và không hỏi lại BA",
        detail: "Tiết kiệm thời gian nhắn tin trao đổi với BA.",
      },
    ],
    correctOptionId: "b",
    whyItWorks:
      "Junior hay mắc lỗi tự đoán nghiệp vụ (Business Rules) rồi vẽ UI cực đẹp nhưng sai logic công ty. Hỏi BA 5 phút trước khi vẽ giúp tránh sửa lại 80% Figma và giúp Dev không phải dừng code để hỏi ngược.",
    copyTemplate:
      "Chị BA ơi, trước khi em lên wireframe màn Voucher, chị confirm giúp em 4 case này nhé:\n1. Nếu mã hết hạn / chưa đủ giá trị đơn tối thiểu thì hiện lỗi cụ thể hay chung?\n2. User có được áp đồng thời 2 mã (Freeship + Giảm giá) không?\n3. Khi gỡ mã hoặc sửa giỏ hàng làm đơn rớt dưới ngưỡng, hệ thống tự gỡ mã hay báo nhắc?\n4. Có danh sách mã gợi ý sẵn cho user chọn không ạ?",
  },
  {
    id: "ba-2-scope-creep",
    partner: "BA",
    stageLabel: "Chốt Spec & Phạm vi",
    title: "BA/PM thêm yêu cầu mới sát ngày Dev bắt đầu code",
    context:
      "Màn hình Bảng quản lý đơn hàng đã được duyệt wireframe. Hôm nay BA nhắn xin bổ sung thêm bộ lọc nâng cao 8 trường và xuất báo cáo PDF ngay vào sprint này.",
    incomingMessage:
      "BA: 'Khách vừa nhờ thêm lọc theo 8 tiêu chí với xuất PDF nữa, em nhét thêm vào góc bảng giúp chị kịp sprint tuần này nhé.'",
    options: [
      {
        id: "a",
        label: "Im lặng nhét hết 8 ô lọc lên đầu bảng để kịp deadline",
        detail: "Giao diện chật nhưng đáp ứng đủ yêu cầu vừa nhận.",
      },
      {
        id: "b",
        label: "Trao đổi tách Phase 1 (MVP) vs Phase 2 dựa trên Impact/Effort cùng BA & Dev",
        detail:
          "Giữ bộ lọc cốt lõi cho Sprint 1, đề xuất đưa xuất PDF/lọc phụ vào Sprint 2 hoặc dùng Drawer 'Bộ lọc nâng cao' nếu bắt buộc làm ngay.",
      },
      {
        id: "c",
        label: "Từ chối thẳng thừng vì thiết kế đã chốt rồi không sửa nữa",
        detail: "Bảo vệ thiết kế ban đầu bằng mọi giá.",
      },
    ],
    correctOptionId: "b",
    whyItWorks:
      "Làm sản phẩm cần giữ cả chất lượng UI lẫn tiến độ phát hành. Tách Phase 1/Phase 2 minh bạch cùng BA và Dev cho thấy tư duy Product Design trưởng thành thay vì 'làm cho xong' hoặc từ chối cứng nhắc.",
    copyTemplate:
      "Em đã xem yêu cầu lọc nâng cao & xuất PDF. Nếu đưa toàn bộ lên đầu bảng sẽ làm rối màn hình chính trên laptop 13 inch. Em đề xuất 2 hướng để mình cùng Dev chốt nhanh:\n• Hướng 1 (Khuyên dùng cho Sprint này): Giữ 3 bộ lọc dùng 80% hằng ngày ở ngoài, gom 5 lọc còn lại vào nút 'Bộ lọc khác', còn Xuất PDF dời sang Sprint sau.\n• Hướng 2: Nếu PDF là Must-have tuần này, nhờ Dev ước lượng giúp thêm effort để team cân đối scope nhé.",
  },
  {
    id: "dev-3-feasibility",
    partner: "Dev FE",
    stageLabel: "Grooming Kỹ thuật",
    title: "Dev báo hiệu ứng & component vượt quá thời gian Sprint",
    context:
      "Bạn thiết kế bảng kéo-thả cột tùy chỉnh kèm biểu đồ animation phức tạp. Khi họp Grooming, Frontend Dev báo phần kéo-thả tùy biến sẽ mất 5 ngày trong khi sprint chỉ còn 2 ngày UI.",
    incomingMessage:
      "Dev FE: 'Cái kéo-thả đổi vị trí cột custom này thư viện chưa hỗ trợ sẵn, viết tay mất cả tuần lận bạn ơi.'",
    options: [
      {
        id: "a",
        label: "Khăng khăng bắt Dev phải code đúng từng pixel như Figma",
        detail: "Vì trải nghiệm người dùng cần mượt y như bản mẫu.",
      },
      {
        id: "b",
        label: "Hỏi Dev thư viện sẵn có (vd: Checkbox bật/tắt cột) và điều chỉnh UI giữ nguyên mục tiêu UX",
        detail:
          "Thay kéo-thả bằng Popover tick chọn cột hiển thị — Dev làm trong 3 giờ mà user vẫn tùy chỉnh được bảng.",
      },
      {
        id: "c",
        label: "Xóa luôn tính năng chọn cột khỏi Figma không nói với BA",
        detail: "Cắt bỏ yêu cầu để Dev nhàn hơn.",
      },
    ],
    correctOptionId: "b",
    whyItWorks:
      "Dev rất trân trọng Designer hiểu ràng buộc kỹ thuật (Technical Constraints). Cùng tìm giải pháp nhẹ 1/10 công sức nhưng vẫn giải quyết đúng bài toán người dùng là dấu hiệu của Senior mindset.",
    copyTemplate:
      "Mục tiêu chính của user là ẩn bớt cột không cần xem cho gọn bảng. Nếu kéo-thả custom tốn 5 ngày thì mình đổi sang dùng Popover có Checkbox + nút Lên/Xuống có sẵn trong thư viện UI nhé — vừa nhẹ cho FE code trong sprint vừa đạt đúng UX, xong mình confirm nhanh với BA nha!",
  },
  {
    id: "dev-4-handoff",
    partner: "Dev BE / Fullstack",
    stageLabel: "Developer Handoff",
    title: "Bàn giao Figma để Dev code không phải hỏi lại liên tục",
    context:
      "Bạn đã hoàn thành 4 màn hình chính của tính năng Quản lý Yêu cầu Hỗ trợ (Support Tickets) và chuẩn bị gửi link Figma lên Jira cho Dev.",
    incomingMessage:
      "Dev: 'Link Figma bạn gửi đẹp rồi nhưng khi chưa có ticket nào, API đang loading, hoặc tiêu đề dài 3 dòng thì hiển thị sao bạn?'",
    options: [
      {
        id: "a",
        label: "Chỉ gửi 4 màn hình Happy Path, bảo Dev cứ lấy spinner mặc định",
        detail: "Phần phụ Dev tự linh động theo thư viện.",
      },
      {
        id: "b",
        label: "Đóng gói đủ 6 States + Edge Text (tên dài/số lớn) + Naming Token trước khi gắn link Jira",
        detail:
          "Đánh dấu 'Ready for Dev', tách rõ Desktop/Mobile breakpoint, Loading Skeleton, Empty State có CTA, Error inline và quy tắc cắt dòng (`line-clamp-2`).",
      },
      {
        id: "c",
        label: "Xuất hết cả trang Figma thành 1 ảnh PNG gửi qua chat cho nhanh",
        detail: "Dev nhìn ảnh rồi tự ước lượng px.",
      },
    ],
    correctOptionId: "b",
    whyItWorks:
      "80% bug giao diện và câu hỏi lắt nhắt từ Dev đến từ việc Designer quên thiết kế Empty/Loading/Error states và dữ liệu biên (tên quá dài, ảnh lỗi). Chuẩn bị sẵn giúp giảm một nửa thời gian ping qua lại.",
    copyTemplate:
      "Mình gửi link Figma (Section 'Ready for Dev' đã chốt với BA):\n• Đã gắn đủ Variables/Tokens (màu, spacing 8pt, radius) và Auto Layout.\n• Có khung riêng cho Loading Skeleton, Empty State, API Error & Phân quyền.\n• Quy tắc text dài: Tiêu đề cắt tối đa 2 dòng (`truncate / line-clamp-2`), hover hiện tooltip đầy đủ.\nDev xem qua có vướng chỗ nào báo mình sửa ngay nhé!",
  },
  {
    id: "dev-5-design-qa",
    partner: "Dev FE",
    stageLabel: "Design QA trên Staging",
    title: "Review bản Dev vừa code lên môi trường Test (Staging)",
    context:
      "Dev báo xong màn hình Mobile Checkout trên Staging. Bạn mở kiểm tra thấy nút CTA bị sát đáy đè lên thanh Home Indicator, khoảng cách card bị chật (4px thay vì 16px) và màu chữ mô tả bị mờ.",
    incomingMessage:
      "Dev FE: 'Mình đẩy bản Checkout lên staging rồi nhé, bạn check giúp xem ổn chưa để QA test.'",
    options: [
      {
        id: "a",
        label: "Nhắn vào nhóm chung: 'Code sai hết Figma rồi, làm lại đi!'",
        detail: "Nói thẳng để Dev sửa nhanh hơn.",
      },
      {
        id: "b",
        label: "Phân loại lỗi (Blocker vs Polish) kèm ảnh chụp đối chiếu & thông số CSS/Token cụ thể",
        detail:
          "Khen điểm làm tốt trước, liệt kê 3 gạch đầu dòng rõ 'Hiện tại vs Mong muốn' (vd: padding-bottom safe-area, gap-4 16px, màu #5A5B60).",
      },
      {
        id: "c",
        label: "Cho qua luôn vì ngại góp ý sợ mất lòng Dev",
        detail: "Miễn chạy được không crash là ổn.",
      },
    ],
    correctOptionId: "b",
    whyItWorks:
      "Design QA hiệu quả cần sự tôn trọng lẫn nhau và thông số chính xác (px, token, ảnh ghép cạnh nhau) để Dev sửa trong 5 phút thay vì phải tự đi mò lại cả file Figma.",
    copyTemplate:
      "Mình vừa test luồng Checkout trên Staging, phần chọn số lượng & animation chạy mượt lắm! Có 3 điểm UI nhỏ mình note lại để bản release nét hơn:\n1. [Quan trọng] Nút CTA đang sát mép dưới trên iPhone -> thêm `pb-safe` / cách Home Indicator tối thiểu 16px.\n2. [Dễ sửa] Khoảng cách giữa Tổng tiền & nút CTA hiện là `4px` -> đổi giúp mình thành `16px` (`gap-4`).\n3. [Tương phản] Text phụ đang dùng `#9CA3AF` hơi mờ -> đổi sang token `text-secondary (#5A5B60)` nhé. Cảm ơn bạn nhiều!",
  },
];

export const BA_DEV_CHECKLISTS: CollabChecklistGroup[] = [
  {
    id: "chk-ba",
    partner: "BA",
    title: "Checklist 5 bước làm việc với BA (Trước khi lên UI)",
    subtitle: "Đọc kỹ User Story & khóa logic nghiệp vụ trước khi mở Figma.",
    items: [
      {
        id: "ba-goal",
        label: "Xác nhận Business Goal & đối tượng sử dụng chính (Role/Permission)",
        why: "Biết ai được xem, ai được sửa, ai chỉ đọc để tránh vẽ nhầm nút hành động.",
      },
      {
        id: "ba-ac",
        label: "Đối chiếu từng tiêu chí Acceptance Criteria (AC) với luồng màn hình",
        why: "Đảm bảo không sót bất kỳ bước xác nhận, validation hoặc trạng thái đơn hàng nào.",
      },
      {
        id: "ba-edge",
        label: "Hỏi đủ ngoại lệ: Hủy giữa chừng, trùng dữ liệu, hết hạn, mất quyền",
        why: "Tránh tình trạng code xong mới phát hiện hệ thống không xử lý được case lỗi.",
      },
      {
        id: "ba-copy",
        label: "Thống nhất trước thông báo lỗi & microcopy nhạy cảm (xóa, thanh toán)",
        why: "BA nắm quy định pháp lý/nghiệp vụ, Designer giúp câu chữ dễ hiểu cho người dùng.",
      },
      {
        id: "ba-signoff",
        label: "Ghi rõ Scope đã chốt (Phase 1 vs Phase 2) trong comment Figma/Jira",
        why: "Có bằng chứng đối chiếu nếu phát sinh yêu cầu thay đổi đột ngột về sau.",
      },
    ],
  },
  {
    id: "chk-dev",
    partner: "Dev",
    title: "Checklist 6 hạng mục Handoff & QA với Dev",
    subtitle: "Giảm 80% câu hỏi vặt và lỗi lệch giao diện khi Dev code.",
    items: [
      {
        id: "dev-feasibility",
        label: "Review Wireframe sớm với FE/BE để kiểm tra API & thư viện UI sẵn có",
        why: "Phát hiện sớm các trường dữ liệu BE chưa có hoặc UI tốn quá nhiều công code.",
      },
      {
        id: "dev-states",
        label: "Đủ 6 States: Default, Hover/Focus, Loading, Empty, Error, Disabled",
        why: "Happy path chỉ chiếm 40% thực tế; 60% lỗi UX xảy ra ở các trạng thái biên.",
      },
      {
        id: "dev-edge-data",
        label: "Kiểm thử dữ liệu biên: Tên 60 ký tự, số 10 chữ số, không có ảnh avatar",
        why: "Quy định rõ `truncate`, `line-clamp-2` hay fallback icon để không vỡ layout.",
      },
      {
        id: "dev-tokens",
        label: "Dùng Auto Layout + Token ngữ nghĩa (vd: `bg-surface`, `space-4` = 16px)",
        why: "Dev Dev-Mode map thẳng sang CSS Flex/Grid và Tailwind class không cần đoán.",
      },
      {
        id: "dev-responsive",
        label: "Có đủ tối thiểu 2 breakpoint (Desktop 1280/1440 & Mobile 375/390)",
        why: "Chỉ rõ trên mobile cột nào xếp dọc, thanh nào thu gọn thành drawer.",
      },
      {
        id: "dev-qa",
        label: "Nghiệm thu Design QA trên Staging phân mức Blocker vs Polish",
        why: "Ưu tiên sửa lỗi chặn thao tác/contrast trước, chỉnh chi tiết nhỏ nhẹ nhàng.",
      },
    ],
  },
];

export const COLLAB_TEMPLATES: CommunicationTemplate[] = [
  {
    id: "tpl-ba-clarify",
    audience: "Với BA",
    situation: "Hỏi làm rõ luồng khi User Story còn mơ hồ",
    script:
      "Chị BA ơi, em đang chuẩn bị lên flow cho màn [Tên màn]. Em check nhanh 3 điểm nghiệp vụ để khớp với hệ thống bên mình:\n1. Nếu user chưa có quyền [X] thì ẩn nút hay vẫn hiện kèm khóa?\n2. Khi danh sách trống lần đầu, hệ thống có dữ liệu mẫu hay hiện Empty State mời tạo mới?\n3. Các trường [A, B] trường nào bắt buộc, giới hạn tối đa bao nhiêu ký tự ạ?",
  },
  {
    id: "tpl-dev-kickoff",
    audience: "Với Dev",
    situation: "Nhờ Dev kiểm tra tính khả thi trước khi vẽ UI chi tiết",
    script:
      "Team Dev ơi, đây là bản Wireframe nháp của tính năng [Tên]. Trước khi mình đổ UI chi tiết và token, nhờ mọi người lướt qua giúp 2 ý:\n• API hiện tại đã trả đủ các trường mình đang hiện trên Card chưa?\n• Có tương tác nào (lọc, sắp xếp, modal) khó hoặc tốn effort lớn hơn dự kiến để mình điều chỉnh pattern sớm cho nhẹ sprint không?",
  },
  {
    id: "tpl-dev-handoff",
    audience: "Với Dev",
    situation: "Gửi link Figma Ready for Dev kèm Spec tóm tắt",
    script:
      "[Ready for Dev] Đã hoàn thiện thiết kế màn [Tên] tại Section [Tên Section]:\n• Breakpoints: Desktop 1280px & Mobile 375px.\n• Đã bổ sung đầy đủ States (Loading Skeleton, Empty, Validation Error, Disabled).\n• Dùng hệ thống 8pt spacing (`gap-2/4/6`) và Color Variables trong library.\nDev bấm vào từng Frame xem chú thích màu xanh bên cạnh giúp mình nhé!",
  },
  {
    id: "tpl-dev-qa",
    audience: "Với Dev",
    situation: "Báo lỗi Design QA tinh tế sau khi check Staging",
    script:
      "Mình vừa test tính năng [Tên] trên Staging, flow tổng thể chạy rất mượt! Có 2 chỗ UI nhỏ nhờ Dev tinh chỉnh giúp cho khớp spec:\n1. [Cần sửa trước release] Trên màn 375px, thẻ bảng bị tràn ngang -> thêm `overflow-x-auto` ở wrapper giúp mình.\n2. [Polish] Khoảng cách giữa tiêu đề và nút đang là `4px` -> tăng lên `16px` (`gap-4`) cho thoáng mắt nha.",
  },
];
