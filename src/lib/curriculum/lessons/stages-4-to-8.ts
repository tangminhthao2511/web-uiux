import type { LessonStructuredContent } from "@/types/learning";

export const STAGES_4_TO_8_CONTENT: LessonStructuredContent[] = [
  // Stage 4: Prioritization & Product Thinking
  {
    lessonId: "les-4-1",
    theoryBlocks: [
      {
        heading: "Cân bằng mục tiêu người dùng & mục tiêu sản phẩm",
        points: [
          "User Goal: Người dùng muốn hoàn thành việc nhanh, ít lỗi và dễ hiểu.",
          "Business/Product Goal: Tăng tỷ lệ kích hoạt (Activation), giữ chân (Retention) hoặc doanh thu, trong giới hạn kỹ thuật & thời gian của team.",
          "Junior Designer thường chỉ thiết kế màn hình 'đẹp theo ý người dùng' mà quên câu hỏi: tính năng này giúp chỉ số nào của sản phẩm?",
        ],
        webNote: "Trên Web B2B/SaaS, mục tiêu thường là tốc độ xử lý nhiều tác vụ và giảm sai sót nhập liệu.",
        mobileNote: "Trên Mobile, mục tiêu thường là giảm số bước chạm và hoàn thành tác vụ trong < 30 giây.",
      },
    ],
    whyItMatters:
      "Khi phỏng vấn Junior Product Designer, nhà tuyển dụng đánh giá cao ứng viên biết giải thích thiết kế phục vụ mục tiêu kinh doanh nào thay vì chỉ nói 'em thấy đẹp'.",
    whenToUse: {
      useWhen: [
        "Trước khi bắt tay vẽ wireframe cho một tính năng mới.",
        "Khi PM yêu cầu thêm nhiều tính năng cùng lúc lên 1 màn hình.",
      ],
      limitations: [
        "Không vì KPI ngắn hạn (như ép người dùng bấm quảng cáo / dark pattern) mà phá hủy niềm tin dài hạn.",
      ],
    },
    realWorldExamples: [
      {
        product: "Luồng Onboarding ứng dụng học / SaaS",
        context: "Cân bằng giữa thu thập dữ liệu cá nhân hóa và cho người dùng trải nghiệm giá trị sớm.",
        takeaway: "Chỉ hỏi 2–3 câu thật sự ảnh hưởng tới màn hình đầu tiên, các thông tin phụ dời sang sau.",
      },
    ],
    goodVsBad: {
      scenario: "Thiết kế popup mời nâng cấp gói trả phí",
      badTitle: "Che toàn màn hình ngay khi vừa mở app, nút đóng ẩn mờ",
      badReason: "Tăng khó chịu và tỷ lệ thoát app ngay lập tức (dark pattern).",
      goodTitle: "Hiện gợi ý nhẹ ngay đúng lúc người dùng chạm giới hạn tính năng miễn phí",
      goodReason: "Đúng ngữ cảnh nhu cầu thật, vừa bảo vệ trải nghiệm vừa tăng chuyển đổi tự nhiên.",
    },
    practicalPrompt:
      "Chọn 1 tính năng bạn hay dùng trên app đặt đồ ăn và ghi 2 dòng: User Goal của nó là gì? Product Goal của công ty là gì?",
    quiz: [
      {
        id: "q-4-1-1",
        question: "Điểm khác biệt cốt lõi của tư duy Product Design so với chỉ làm UI thuần túy là gì?",
        options: [
          { id: "a", text: "Chỉ tập trung phối màu và hiệu ứng chuyển động bắt mắt" },
          { id: "b", text: "Kết nối nhu cầu người dùng với mục tiêu sản phẩm và giới hạn kỹ thuật" },
          { id: "c", text: "Viết toàn bộ code frontend cho sản phẩm" },
        ],
        correctOptionId: "b",
        explanation: "Product Design đòi hỏi cân bằng giữa User Goal, Business Goal và ràng buộc kỹ thuật (Engineering constraints).",
      },
      {
        id: "q-4-1-2",
        question: "Khi PM muốn nhét thêm 5 biểu đồ lên màn hình trang chủ Mobile, phản ứng đúng là gì?",
        options: [
          { id: "a", text: "Vẽ đủ 5 biểu đồ thật nhỏ để vừa màn hình" },
          { id: "b", text: "Hỏi lại quyết định cốt lõi người dùng cần làm trên trang chủ và đề xuất ưu tiên" },
          { id: "c", text: "Từ chối thẳng không cần giải thích" },
        ],
        correctOptionId: "b",
        explanation: "Luôn bám vào mục tiêu chính của người dùng trên màn hình đó và trao đổi trade-off với PM.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Product & UX Strategy",
        url: "https://www.nngroup.com/topic/strategy/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-4-2",
    theoryBlocks: [
      {
        heading: "Impact/Effort, RICE & MoSCoW",
        points: [
          "Impact vs Effort (2×2): Ưu tiên nhóm High Impact + Low Effort (Quick Wins) làm trước.",
          "RICE Score = (Reach × Impact × Confidence) / Effort — giúp so sánh các ý tưởng bằng con số ước lượng minh bạch.",
          "MoSCoW: Chia phạm vi bản phát hành thành Must-have, Should-have, Could-have, Won't-have.",
        ],
      },
    ],
    whyItMatters:
      "Nguồn lực Dev luôn có hạn. Designer biết ưu tiên sẽ biết đâu là phiên bản MVP gọn nhẹ ra mắt đúng hạn.",
    whenToUse: {
      useWhen: ["Backlog có quá nhiều lỗi UX hoặc yêu cầu tính năng cần chốt thứ tự làm trong sprint."],
      limitations: ["RICE phụ thuộc vào độ tin cậy của dữ liệu đầu vào (Confidence); nếu đoán mò thì điểm dễ bị lệch."],
    },
    realWorldExamples: [
      {
        product: "Checkout E-commerce",
        context: "So sánh giữa 'Sửa lỗi báo sai mã giảm giá' (Effort thấp, Reach cao) và 'Làm lại toàn bộ giỏ hàng 3D' (Effort rất cao).",
        takeaway: "Quick Win sửa thông báo lỗi inline đem lại tác động chuyển đổi nhanh hơn nhiều.",
      },
    ],
    goodVsBad: {
      scenario: "Đề xuất danh sách cải tiến cho PM",
      badTitle: "Liệt kê 15 lỗi giao diện không xếp thứ tự ưu tiên",
      badReason: "PM và Dev không biết bắt đầu từ đâu và dễ bỏ qua cả danh sách.",
      goodTitle: "Phân 3 nhóm Quick Wins, Strategic Bets và Ghi chú Effort",
      goodReason: "Giúp đội ngũ chốt được việc làm ngay trong sprint tới.",
    },
    practicalPrompt:
      "Lấy 3 điểm bạn muốn sửa trên 1 app quen thuộc, tự chấm Impact (1–3) và Effort (1–3) để chọn ra 1 Quick Win.",
    quiz: [
      {
        id: "q-4-2-1",
        question: "Trong công thức RICE, yếu tố nào nằm ở mẫu số (chia cho)?",
        options: [
          { id: "a", text: "Reach (Số người bị ảnh hưởng)" },
          { id: "b", text: "Confidence (Độ tự tin vào dữ liệu)" },
          { id: "c", text: "Effort (Công sức thực hiện)" },
        ],
        correctOptionId: "c",
        explanation: "RICE = (Reach × Impact × Confidence) / Effort. Effort càng lớn thì điểm ưu tiên càng giảm.",
      },
      {
        id: "q-4-2-2",
        question: "Nhóm nào nên được ưu tiên xử lý đầu tiên trong ma trận Impact vs Effort?",
        options: [
          { id: "a", text: "High Impact + Low Effort" },
          { id: "b", text: "Low Impact + High Effort" },
          { id: "c", text: "Low Impact + Low Effort" },
        ],
        correctOptionId: "a",
        explanation: "High Impact + Low Effort là các Quick Wins mang lại giá trị cao với chi phí thấp nhất.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Prioritization Matrices",
        url: "https://www.nngroup.com/articles/prioritization-matrices/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-4-3",
    theoryBlocks: [
      {
        heading: "Opportunity Solution Tree & Design Trade-offs",
        points: [
          "OST nối từ Outcome (Kết quả) → Opportunity (Cơ hội/Nỗi đau) → Solution (Giải pháp) → Experiment (Thử nghiệm).",
          "Mọi thiết kế đều có đánh đổi (Trade-off): VD tăng bảo mật (nhiều bước OTP) sẽ giảm tốc độ đăng nhập.",
          "Khi trình bày Design Rationale: Nêu Bối cảnh → 2 phương án đã cân nhắc → Lý do chọn + Rủi ro chấp nhận.",
        ],
      },
    ],
    whyItMatters:
      "Thay vì phòng thủ khi bị hỏi 'Sao em lại làm thế?', bạn trình bày được lập luận khách quan dựa trên trade-offs.",
    whenToUse: {
      useWhen: ["Review thiết kế với PM/Lead/Dev hoặc viết mục Design Decisions trong Portfolio Case Study."],
      limitations: ["Không nên vẽ cây cơ hội quá phức tạp nếu bài toán đã quá rõ ràng ở cấp component nhỏ."],
    },
    realWorldExamples: [
      {
        product: "Tìm kiếm & Bộ lọc Mobile",
        context: "Đặt bộ lọc dạng thanh cuộn ngang (nhanh, 1 chạm) vs Mở trang Filter riêng (đủ chi tiết nhưng thêm bước).",
        takeaway: "Kết hợp 3 chip lọc phổ biến nhất ở ngoài + nút 'Tất cả bộ lọc' để cân bằng cả hai.",
      },
    ],
    goodVsBad: {
      scenario: "Giải thích lý do chọn thiết kế trong buổi review",
      badTitle: "'Em thấy đặt nút ở đây nhìn cân và hiện đại hơn.'",
      badReason: "Chủ quan, khó thuyết phục PM/Dev khi có ý kiến trái chiều.",
      goodTitle: "'Phương án B giảm 1 bước chạm trên Mobile và giữ giá tiền nổi bật, đánh đổi là mất thêm 48px chiều cao.'",
      goodReason: "Rõ lợi ích, rõ đánh đổi, dễ thống nhất cùng team.",
    },
    practicalPrompt:
      "Viết 1 đoạn giải trình ngắn (3 câu) cho 1 quyết định thiết kế gồm: Đã cân nhắc gì, Chọn gì, Đánh đổi là gì.",
    quiz: [
      {
        id: "q-4-3-1",
        question: "Cấu trúc chuẩn để trình bày Design Rationale thuyết phục gồm gì?",
        options: [
          { id: "a", text: "Chỉ gửi 1 ảnh màn hình đẹp nhất" },
          { id: "b", text: "Bối cảnh vấn đề, các phương án đã cân nhắc, lý do chọn & trade-off" },
          { id: "c", text: "Trích dẫn tên các app nổi tiếng làm giống vậy" },
        ],
        correctOptionId: "b",
        explanation: "Nêu rõ bối cảnh, phương án thay thế và trade-off chứng minh bạn tư duy có hệ thống.",
      },
      {
        id: "q-4-3-2",
        question: "Thứ tự đúng trong Opportunity Solution Tree (OST) là gì?",
        options: [
          { id: "a", text: "Solution → Outcome → Opportunity" },
          { id: "b", text: "Outcome → Opportunity → Solution → Experiment" },
          { id: "c", text: "Wireframe → UI → Outcome" },
        ],
        correctOptionId: "b",
        explanation: "OST bắt đầu từ mục tiêu kết quả (Outcome), tìm cơ hội/nỗi đau (Opportunity) rồi mới nghĩ giải pháp và thử nghiệm.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Communicating UX Decisions",
        url: "https://www.nngroup.com/articles/presenting-design-decisions/",
        reviewedAt: "2026-11-14",
      },
    ],
  },

  // Stage 5: Usability Testing & Experimentation
  {
    lessonId: "les-5-1",
    theoryBlocks: [
      {
        heading: "10 Nguyên lý Nielsen & Đánh giá Heuristic",
        points: [
          "Heuristic Evaluation là phương pháp chuyên gia tự rà soát giao diện dựa trên 10 nguyên lý khả dụng của Jakob Nielsen trước khi tốn chi phí test với người dùng thật.",
          "Mỗi lỗi tìm được phải gắn: Nguyên lý vi phạm + Vị trí màn hình + Mức độ nghiêm trọng (0–4) + Đề xuất sửa.",
        ],
        webNote: "Web thường hay vi phạm: thiếu trạng thái hover/focus, bảng thiếu tìm kiếm, thông báo lỗi form mờ nhạt.",
        mobileNote: "Mobile thường hay vi phạm: thiếu nút Back/Hủy rõ ràng, mất dữ liệu khi lỡ đóng sheet, vùng chạm quá nhỏ.",
      },
    ],
    whyItMatters:
      "Đây là kỹ năng 'ăn điểm' ngay lập tức khi Junior đi làm: bạn có thể tự audit bất kỳ sản phẩm nào của công ty trong ngày đầu tiên.",
    whenToUse: {
      useWhen: ["Trước khi đem prototype đi Usability Test hoặc khi cần audit sản phẩm đang chạy."],
      limitations: ["Heuristic Evaluation phản ánh góc nhìn chuyên gia, không thay thế hoàn toàn việc quan sát người dùng thật."],
    },
    realWorldExamples: [
      {
        product: "Biểu mẫu đăng ký / thanh toán",
        context: "Bấm nút Lưu nhưng không có spinner hay thông báo -> người dùng tưởng bị đơ và bấm liên tục 3 lần.",
        takeaway: "Vi phạm Heuristic #1 (Visibility of System Status). Sửa bằng loading state rõ ràng và khóa bấm đúp.",
      },
    ],
    goodVsBad: {
      scenario: "Viết báo cáo lỗi UX cho Dev",
      badTitle: "'Màn hình đăng nhập dùng khó hiểu quá, cần làm lại.'",
      badReason: "Mơ hồ, Dev không biết lỗi cụ thể nằm ở đâu.",
      goodTitle: "'Vi phạm #9 (Error Recovery): Khi sai mật khẩu, chỉ hiện 'Lỗi 401'. Đề xuất sửa thành câu tiếng Việt rõ ràng + link Quên mật khẩu.'",
      goodReason: "Chính xác, hành động được ngay.",
    },
    practicalPrompt:
      "Mở 1 app ngân hàng hoặc ví điện tử bạn dùng, tìm 1 điểm vi phạm trong 10 nguyên lý Nielsen và đặt tên nguyên lý đó.",
    quiz: [
      {
        id: "q-5-1-1",
        question: "Khi xóa nhầm 1 item và app hiện thanh 'Đã xóa · Hoàn tác (Undo)', điều này đáp ứng nguyên lý nào?",
        options: [
          { id: "a", text: "User Control and Freedom (#3)" },
          { id: "b", text: "Aesthetic and Minimalist Design (#8)" },
          { id: "c", text: "Help and Documentation (#10)" },
        ],
        correctOptionId: "a",
        explanation: "User Control and Freedom cung cấp 'lối thoát khẩn cấp' như Undo/Cancel khi người dùng thao tác nhầm.",
      },
      {
        id: "q-5-1-2",
        question: "Hiển thị thanh gợi ý các từ khóa vừa tìm gần đây giúp đáp ứng nguyên lý nào?",
        options: [
          { id: "a", text: "Recognition Rather than Recall (#6)" },
          { id: "b", text: "Match Between System and Real World (#2)" },
          { id: "c", text: "Error Prevention (#5)" },
        ],
        correctOptionId: "a",
        explanation: "Giảm gánh nặng trí nhớ bằng cách hiển thị sẵn tùy chọn để người dùng nhận ra thay vì phải tự nhớ lại.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — 10 Usability Heuristics",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-5-2",
    theoryBlocks: [
      {
        heading: "Viết kịch bản & Quan sát Usability Testing",
        points: [
          "Moderated Testing: Có người điều phối hỏi trực tiếp (tốt để đào sâu 'tại sao'). Unmoderated: Người dùng tự làm qua công cụ ghi hình (nhanh, ít tốn giờ điều phối).",
          "Task Scenario phải đặt bối cảnh thực tế và KHÔNG chứa từ khóa gợi ý đáp án trên UI (VD: đừng nói 'Hãy bấm vào nút Giỏ hàng ở góc phải').",
          "Nguyên tắc vàng khi quan sát: Im lặng chờ người dùng xoay xở 5–10 giây trước khi can thiệp; chú ý chỗ họ ngập ngừng hoặc hiểu nhầm.",
        ],
      },
    ],
    whyItMatters:
      "Chỉ cần test với 5 người dùng phù hợp đã có thể phát hiện phần lớn vấn đề usability nghiêm trọng nhất trước khi code.",
    whenToUse: {
      useWhen: ["Khi có prototype tương tác cho luồng mới hoặc nghi ngờ tỷ lệ rơi cao ở một màn hình."],
      limitations: ["Không dùng Usability Testing để hỏi 'Bạn có sẵn sàng trả 200k mua app này không?'."],
    },
    realWorldExamples: [
      {
        product: "Kiểm thử luồng đặt lịch khám Mobile",
        context: "Nhờ người dùng: 'Bạn muốn đặt lịch khám răng vào sáng thứ Bảy tuần này, hãy thử thao tác trên prototype'.",
        takeaway: "3/5 người bấm nhầm vào thẻ ngày đã hết slot vì màu xám quá giống thẻ còn trống.",
      },
    ],
    goodVsBad: {
      scenario: "Viết câu lệnh giao nhiệm vụ cho người test",
      badTitle: "'Hãy bấm vào biểu tượng Bánh răng rồi chọn Đổi mật khẩu.'",
      badReason: "Chỉ đường sẵn nên không kiểm tra được xem người dùng có tự tìm thấy hay không.",
      goodTitle: "'Tài khoản của bạn vừa có dấu hiệu lạ, bạn hãy thử đổi sang mật khẩu mới.'",
      goodReason: "Mô phỏng tình huống thật để xem người dùng tự tìm đường như thế nào.",
    },
    practicalPrompt:
      "Viết 1 Task Scenario không gợi ý đáp án cho tác vụ: 'Tìm và lưu lại một khóa học UI/UX yêu thích'.",
    quiz: [
      {
        id: "q-5-2-1",
        question: "Lỗi lớn nhất khi viết Task Scenario cho Usability Test là gì?",
        options: [
          { id: "a", text: "Dùng ngôn ngữ đời thường" },
          { id: "b", text: "Gọi tên chính xác nút/icon trên màn hình để chỉ chỗ bấm" },
          { id: "c", text: "Nêu bối cảnh thực tế của người dùng" },
        ],
        correctOptionId: "b",
        explanation: "Nêu tên nút/vị trí trên UI làm mất tác dụng kiểm tra khả năng tự tìm kiếm (findability).",
      },
      {
        id: "q-5-2-2",
        question: "Trong buổi test, nếu người dùng im lặng nhìn màn hình 4 giây chưa biết bấm đâu, bạn nên làm gì?",
        options: [
          { id: "a", text: "Chỉ ngay nút đúng cho họ bấm cho nhanh" },
          { id: "b", text: "Kiên nhẫn quan sát và hỏi nhẹ 'Bạn đang tìm kiếm điều gì ở đây?'" },
          { id: "c", text: "Dừng buổi test lại" },
        ],
        correctOptionId: "b",
        explanation: "Hỏi mở giúp hiểu mô hình tư duy (mental model) của họ mà không dẫn dắt đáp án.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Usability Testing 101",
        url: "https://www.nngroup.com/articles/usability-testing-101/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-5-3",
    theoryBlocks: [
      {
        heading: "Đặt giả thuyết, A/B Testing & Cải tiến Before/After",
        points: [
          "Cấu trúc Hypothesis: 'Nếu thay đổi [X] cho [nhóm người dùng], chỉ số [Y] sẽ cải thiện vì [lý do từ nghiên cứu/dữ liệu].'",
          "A/B Testing chia lưu lượng ngẫu nhiên giữa bản A (Control) và bản B (Variant) để đo tác động thực tế trên sản phẩm đang chạy.",
          "Giới hạn A/B Test: Cần lượng traffic đủ lớn mới có ý nghĩa thống kê, và chỉ cho biết bản nào thắng chứ không tự giải thích lý do nếu thiếu nghiên cứu định tính.",
        ],
      },
    ],
    whyItMatters:
      "Case Study Junior có phần Before → After kèm lý do cải tiến từ bằng chứng test luôn nổi bật hơn hẳn các dự án làm một mạch không kiểm chứng.",
    whenToUse: {
      useWhen: ["Sau khi tổng hợp findings từ Usability Test để lặp lại thiết kế (Iteration)."],
      limitations: ["Không nên chạy A/B test khi app mới có vài chục người dùng mỗi ngày (không đủ cỡ mẫu)."],
    },
    realWorldExamples: [
      {
        product: "Trang gói dịch vụ Web",
        context: "Sau khi quan sát người dùng do dự vì không rõ hủy gói thế nào, team thêm dòng 'Hủy bất cứ lúc nào trong 1 chạm' ngay dưới nút CTA.",
        takeaway: "Giả thuyết rõ ràng gắn với nỗi lo thật được phát hiện qua test.",
      },
    ],
    goodVsBad: {
      scenario: "Trình bày bản cải tiến Before/After trong Portfolio",
      badTitle: "Đặt 2 ảnh cạnh nhau không chú thích gì thêm",
      badReason: "Người xem không biết bạn đã sửa cái gì và dựa vào bằng chứng nào.",
      goodTitle: "Khoanh vùng điểm sửa + Ghi chú phát hiện test + Lý do thay đổi",
      goodReason: "Chứng minh tư duy thiết kế dựa trên bằng chứng (Evidence-based design).",
    },
    practicalPrompt:
      "Viết 1 giả thuyết theo mẫu 'Nếu [thay đổi]... thì [chỉ số]... vì [lý do]...' cho màn hình giỏ hàng.",
    quiz: [
      {
        id: "q-5-3-1",
        question: "A/B Testing trả lời tốt câu hỏi nào nhất?",
        options: [
          { id: "a", text: "Tại sao người dùng lại cảm thấy thất vọng?" },
          { id: "b", text: "Giữa phương án A và B trên sản phẩm live, phương án nào cho tỷ lệ chuyển đổi cao hơn?" },
          { id: "c", text: "Người dùng muốn tính năng mới nào trong năm sau?" },
        ],
        correctOptionId: "b",
        explanation: "A/B Test đo hiệu quả định lượng giữa các biến thể thực tế, nhưng cần kết hợp định tính để hiểu 'tại sao'.",
      },
      {
        id: "q-5-3-2",
        question: "Khi sản phẩm chỉ có 30 lượt truy cập mỗi ngày, có nên ưu tiên A/B Testing không?",
        options: [
          { id: "a", text: "Nên, vì chạy 1 ngày là có kết quả chuẩn" },
          { id: "b", text: "Không nên; hãy ưu tiên Usability Testing với 5 người và Heuristic Evaluation" },
        ],
        correctOptionId: "b",
        explanation: "Traffic quá nhỏ khiến A/B test không đạt ý nghĩa thống kê; Usability Testing nhanh và hiệu quả hơn nhiều.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — A/B Testing vs Usability Testing",
        url: "https://www.nngroup.com/articles/ab-testing-usability-engineering/",
        reviewedAt: "2026-11-14",
      },
    ],
  },

  // Stage 6: UI Design & Visual Design
  {
    lessonId: "les-6-1",
    theoryBlocks: [
      {
        heading: "Thứ bậc thị giác, Lưới & Hệ thống khoảng cách 8pt",
        points: [
          "Thứ bậc thị giác (Visual Hierarchy) điều hướng mắt người xem: Điểm chính (Cỡ chữ lớn/đậm/tương phản cao) → Thông tin hỗ trợ → Hành động phụ.",
          "Hệ thống khoảng cách bội số 4/8px (4, 8, 12, 16, 24, 32px): Giúp mọi màn hình đồng đều và dev dễ chuyển thành spacing tokens.",
          "Law of Proximity: Khoảng cách giữa các phần tử cùng nhóm phải nhỏ hơn khoảng cách giữa các nhóm khác nhau.",
        ],
        webNote: "Web dùng lưới 12 cột (Material 3 Expanded/Large >= 840dp), giữ độ rộng dòng văn bản tối ưu 55–75 ký tự để không mỏi mắt.",
        mobileNote: "Mobile dùng lưới 4 cột (Compact < 600dp), lề ngang phổ biến 16px hoặc 20px, ưu tiên thẻ xếp dọc rõ ràng.",
      },
    ],
    whyItMatters:
      "80% lỗi UI của người mới đến từ khoảng cách lộn xộn và mọi chữ đều tranh nhau nổi bật khiến màn hình rối mắt.",
    whenToUse: {
      useWhen: ["Khi chuyển từ wireframe thô sang thiết kế UI hoàn chỉnh trên cả Web và Mobile."],
      limitations: ["Không cứng nhắc dùng bội số 8px cho chi tiết siêu nhỏ như khoảng cách icon–text (có thể dùng 4px hoặc 6px)."],
    },
    realWorldExamples: [
      {
        product: "Thẻ bài học MeowProduct",
        context: "Tiêu đề bài (16px bold) + mô tả ngắn (12px) cách nhau 4px, tách biệt với nút hành động bằng 16px.",
        takeaway: "Mắt người quét ngay được cụm nội dung chính trước khi nhìn xuống nút bấm.",
      },
    ],
    goodVsBad: {
      scenario: "Khoảng cách trong một Card thông tin",
      badTitle: "Tất cả khoảng cách trên/dưới/giữa đều để 12px bằng nhau",
      badReason: "Các phần tử bị rời rạc, khó phân biệt đâu là tiêu đề đi cùng mô tả.",
      goodTitle: "Trong cụm (Tiêu đề + Mô tả) dùng 4–6px; giữa các cụm dùng 16px; Padding card 16–20px",
      goodReason: "Cấu trúc mạch lạc tự nhiên nhờ Luật Gần (Proximity).",
    },
    practicalPrompt:
      "Kiểm tra lại 1 màn hình bạn từng vẽ trong Figma xem khoảng cách có đang dùng bội số 4/8px và rõ nhóm gần-xa chưa.",
    quiz: [
      {
        id: "q-6-1-1",
        question: "Theo Luật Gần (Law of Proximity), mối quan hệ giữa khoảng cách trong nhóm (A) và khoảng cách giữa các nhóm (B) phải thế nào?",
        options: [
          { id: "a", text: "A bằng B để nhìn đều nhau" },
          { id: "b", text: "A nhỏ hơn B rõ rệt để mắt tự gom nhóm" },
          { id: "c", text: "A lớn hơn B" },
        ],
        correctOptionId: "b",
        explanation: "Khoảng cách nội bộ nhỏ hơn khoảng cách giữa các cụm giúp mắt nhận diện cấu trúc nhóm tức thì.",
      },
      {
        id: "q-6-1-2",
        question: "Trên giao diện Desktop (Expanded/Large >= 840dp theo Material 3), hệ thống lưới phổ biến có bao nhiêu cột?",
        options: [
          { id: "a", text: "4 cột" },
          { id: "b", text: "12 cột" },
          { id: "c", text: "2 cột" },
        ],
        correctOptionId: "b",
        explanation: "Lưới 12 cột linh hoạt chia 2, 3, 4 hoặc 6 phần đều nhau cho bố cục Web/Desktop.",
      },
    ],
    sourceLinks: [
      {
        label: "Material Design 3 — Responsive Layout Grid",
        url: "https://m3.material.io/foundations/layout/applying-layout/window-size-classes",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-6-2",
    theoryBlocks: [
      {
        heading: "Typography, Màu ngữ nghĩa & Tương phản WCAG 2.2 AA",
        points: [
          "Thang chữ gọn (3–4 cấp chính trên 1 màn hình): Display/Heading, Title, Body (14–16px Web / 15–17pt iOS), Caption (12px). Line-height cho đoạn văn tiếng Việt nên đạt ~1.45–1.6.",
          "Màu ngữ nghĩa (Semantic Colors): Tách màu Thương hiệu (Primary) khỏi màu Trạng thái (Success xanh lá, Warning vàng, Error đỏ, Neutral xám).",
          "Độ tương phản WCAG 2.2 AA: Chữ thường tối thiểu 4.5:1; Chữ lớn (>= 24px hoặc >= 18.66px đậm) và Icon/Viền Input tối thiểu 3:1.",
        ],
        webNote: "Web ưu tiên body >= 14–16px, tập trung trạng thái focus ring rõ ràng khi dùng bàn phím Tab.",
        mobileNote: "iOS HIG quy chuẩn Dynamic Type (body mặc định 17pt) và độ tương phản cao khi dùng ngoài trời nắng.",
      },
    ],
    whyItMatters:
      "Màu pastel rất dễ nhìn nhưng nếu đặt chữ trắng hoặc xám nhạt lên nền pastel sẽ rớt chuẩn tương phản 4.5:1 ngay lập tức.",
    whenToUse: {
      useWhen: ["Khi thiết lập bảng màu Design System hoặc kiểm tra tính dễ đọc của UI."],
      limitations: ["Không dùng màu đỏ cho mục trang trí không liên quan lỗi vì dễ gây hiểu nhầm."],
    },
    realWorldExamples: [
      {
        product: "Thẻ trạng thái trong MeowProduct",
        context: "Dùng nền pastel dịu (#D4F0DC, #E6DAFB) nhưng chữ luôn là màu rất đậm (#133220, #211834).",
        takeaway: "Giữ được cảm giác thân thiện mà độ tương phản vẫn vượt xa ngưỡng 4.5:1.",
      },
    ],
    goodVsBad: {
      scenario: "Thiết kế nút và chữ phụ trên nền trắng",
      badTitle: "Dùng chữ xám #B0B5BD (tương phản ~2.0:1) cho nhãn input và mô tả",
      badReason: "Mờ nhạt, người dùng nhìn màn hình độ sáng thấp gần như không đọc được.",
      goodTitle: "Dùng chữ phụ tối nhất từ #5A5B60 trở lên (~6.5:1 trên nền trắng)",
      goodReason: "Vừa phân cấp nhẹ hơn chữ chính #17181C vừa đạt chuẩn WCAG AA.",
    },
    practicalPrompt:
      "Mở plugin Contrast hoặc bảng màu bạn hay dùng: kiểm tra xem chữ phụ trên nền trắng đã đạt >= 4.5:1 chưa.",
    quiz: [
      {
        id: "q-6-2-1",
        question: "Theo WCAG 2.2 Level AA, tỷ lệ tương phản tối thiểu cho chữ thường (Normal text) là bao nhiêu?",
        options: [
          { id: "a", text: "2.5:1" },
          { id: "b", text: "3:1" },
          { id: "c", text: "4.5:1" },
        ],
        correctOptionId: "c",
        explanation: "WCAG 2.2 AA yêu cầu tối thiểu 4.5:1 cho chữ thường và 3:1 cho chữ lớn / icon UI.",
      },
      {
        id: "q-6-2-2",
        question: "Khi báo lỗi một ô nhập liệu trên Form, cách nào chuẩn Accessibility nhất?",
        options: [
          { id: "a", text: "Chỉ đổi viền ô nhập sang màu đỏ" },
          { id: "b", text: "Đổi viền đỏ + hiện icon cảnh báo + dòng chữ giải thích lỗi cụ thể" },
        ],
        correctOptionId: "b",
        explanation: "Không chỉ dựa vào màu sắc (người mù màu sẽ không phân biệt được nếu thiếu icon và chữ).",
      },
    ],
    sourceLinks: [
      {
        label: "W3C — WCAG 2.2 Contrast Minimum",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-6-3",
    theoryBlocks: [
      {
        heading: "Component States, Bảng dữ liệu & Responsive Web/Mobile",
        points: [
          "Đủ trạng thái Component: Default, Hover (Web), Focus (Keyboard), Active/Pressed, Disabled, Loading, Error.",
          "Bảng dữ liệu (Data-dense UI): Căn phải cho cột số tiền/số lượng để dễ so hàng; căn trái cho chữ; cố định cột hành động khi bảng rộng.",
          "Kích thước vùng chạm: Web WCAG 2.2 AA >= 24×24 CSS px; iOS HIG >= 44×44pt; Android M3 >= 48×48dp (cách nhau >= 8dp).",
        ],
      },
    ],
    whyItMatters:
      "Sự khác biệt giữa bài thiết kế sinh viên và Junior đi làm nằm ở việc có nghĩ tới trạng thái Loading/Empty/Error và phiên bản Mobile hay không.",
    whenToUse: {
      useWhen: ["Khi hoàn thiện UI trước khi bàn giao cho lập trình viên (Handoff)."],
      limitations: ["Trên Mobile, tránh ép nguyên bảng 7 cột ngang — hãy chuyển mỗi dòng thành 1 Card tóm tắt thông tin."],
    },
    realWorldExamples: [
      {
        product: "Trang quản lý đơn hàng SaaS",
        context: "Desktop dùng bảng 6 cột có filter + sort; Mobile chuyển thành danh sách Card gồm Mã đơn, Khách, Giá và Badge trạng thái.",
        takeaway: "Responsive là thiết kế lại cách trình bày phù hợp màn hình nhỏ, không phải thu nhỏ trang Web.",
      },
    ],
    goodVsBad: {
      scenario: "Chuyển bảng dữ liệu Web sang Mobile",
      badTitle: "Giữ nguyên bảng 6 cột ép nhỏ chữ xuống 9px và bắt cuộn ngang liên tục",
      badReason: "Rất khó đọc và dễ bấm nhầm nút Sửa/Xóa.",
      goodTitle: "Chuyển sang Card dọc ưu tiên 3 thông tin chính + chạm để xem chi tiết",
      goodReason: "Đọc nhanh trên màn hình hẹp và nút bấm đủ lớn >= 44pt.",
    },
    practicalPrompt:
      "Thử chuyển qua tab 'Nộp bài & Đánh giá' và chọn đề 'Web SaaS Table' hoặc 'Mobile Checkout' để thực hành ngay.",
    quiz: [
      {
        id: "q-6-3-1",
        question: "Kích thước vùng chạm (Touch Target) tối thiểu theo Apple iOS HIG và Android Material 3 lần lượt là bao nhiêu?",
        options: [
          { id: "a", text: "24×24pt và 24×24dp" },
          { id: "b", text: "44×44pt (iOS) và 48×48dp (Android)" },
          { id: "c", text: "32×32pt và 36×36dp" },
        ],
        correctOptionId: "b",
        explanation: "Apple HIG quy định tối thiểu 44×44pt; Material Design 3 quy định 48×48dp (~9mm).",
      },
      {
        id: "q-6-3-2",
        question: "Trong bảng dữ liệu (Data Table), cột chứa Số tiền hoặc Số lượng nên căn lề thế nào?",
        options: [
          { id: "a", text: "Căn giữa (Center)" },
          { id: "b", text: "Căn phải (Right-aligned) với tabular numbers" },
          { id: "c", text: "Căn đều hai bên" },
        ],
        correctOptionId: "b",
        explanation: "Căn phải giúp các hàng đơn vị, hàng chục, dấu phẩy thẳng cột để so sánh con số nhanh hơn.",
      },
    ],
    sourceLinks: [
      {
        label: "Apple HIG — Layout & Touch Targets",
        url: "https://developer.apple.com/design/human-interface-guidelines/layout",
        reviewedAt: "2026-11-14",
      },
    ],
  },

  // Stage 7: Figma & Design System
  {
    lessonId: "les-7-1",
    theoryBlocks: [
      {
        heading: "Frames, Constraints & Auto Layout thành thạo",
        points: [
          "Dùng Frame (không dùng Group) cho các khối giao diện để tận dụng Clip content, Constraints và Auto Layout.",
          "Auto Layout (Shift + A): Kết hợp đúng 3 chế độ Sizing — Fixed (cố định), Hug contents (co theo nội dung), Fill container (giãn đầy khung cha).",
          "Constraints dùng cho phần tử ghim cố định (ví dụ thanh CTA dưới đáy hoặc nút đóng nổi ở góc trên).",
        ],
      },
    ],
    whyItMatters:
      "File Figma dùng Auto Layout chuẩn giúp sửa chữ hay đổi kích thước từ 1440px xuống 390px chỉ trong vài giây thay vì kéo lại từng layer.",
    whenToUse: {
      useWhen: ["Mọi lúc tạo nút, card, form, thanh điều hướng và toàn bộ bố cục trang trong Figma."],
      limitations: ["Nếu cần một badge đè lên góc avatar, bật Absolute Position trên badge thay vì phá vỡ Auto Layout của card."],
    },
    realWorldExamples: [
      {
        product: "Card thông báo có nút hành động",
        context: "Khung ngoài Fill container (ngang) + Hug contents (dọc); cụm chữ bên trong để Fill container để tự xuống dòng khi chữ dài.",
        takeaway: "Không bao giờ bị tràn chữ ra khỏi card khi dịch sang ngôn ngữ khác dài hơn.",
      },
    ],
    goodVsBad: {
      scenario: "Dựng 1 Button có icon và chữ trong Figma",
      badTitle: "Vẽ 1 hình chữ nhật Rectangle rồi đặt chữ đè lên bằng Group",
      badReason: "Khi đổi chữ 'Lưu' thành 'Lưu thay đổi và tiếp tục', chữ bị tràn ra ngoài hình chữ nhật.",
      goodTitle: "Bọc Icon + Text bằng Auto Layout (Shift+A), đặt Padding ngang 16px, dọc 10px, Fill nền trực tiếp trên Frame",
      goodReason: "Nút tự động co giãn chuẩn xác theo độ dài chữ.",
    },
    practicalPrompt:
      "Thử tạo 1 Card bài viết trong Figma có Badge + Tiêu đề + Nút bằng Auto Layout lồng nhau và kéo giãn chiều ngang Frame từ 320px lên 500px kiểm tra.",
    quiz: [
      {
        id: "q-7-1-1",
        question: "Để một đoạn Text bên trong Auto Layout Card tự động xuống dòng khi thu hẹp chiều ngang Card, Text layer cần đặt chế độ Width là gì?",
        options: [
          { id: "a", text: "Hug contents" },
          { id: "b", text: "Fill container" },
          { id: "c", text: "Fixed width" },
        ],
        correctOptionId: "b",
        explanation: "Fill container khiến Text bám theo chiều rộng khả dụng của Frame cha và tự ngắt dòng.",
      },
      {
        id: "q-7-1-2",
        question: "Khi muốn 1 chấm thông báo đỏ nằm đè lên góc phải của Avatar bên trong Auto Layout, dùng tính năng nào?",
        options: [
          { id: "a", text: "Bỏ Auto Layout đi dùng Group" },
          { id: "b", text: "Bật Absolute Position cho chấm thông báo" },
        ],
        correctOptionId: "b",
        explanation: "Absolute Position cho phép phần tử đứng theo tọa độ tương đối trong Auto Layout mà không đẩy các phần tử khác.",
      },
    ],
    sourceLinks: [
      {
        label: "Figma Help — Guide to Auto Layout",
        url: "https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-7-2",
    theoryBlocks: [
      {
        heading: "Components, Properties, Variants & Variables",
        points: [
          "Component Set & Variants: Gom các trạng thái (Default, Hover, Error, Disabled) và kích thước (SM, MD, LG) vào 1 khối gọn gàng.",
          "Component Properties (Text, Boolean, Instance Swap): Cho phép ẩn/hiện icon hoặc đổi chữ ngay ở bảng Properties mà không cần nhân bản hàng chục variants thừa.",
          "Variables (Design Tokens): Lưu màu ngữ nghĩa (bg/primary, text/muted) và số (spacing/md, radius/lg) để đồng bộ toàn bộ file và chuyển Mode Light/Dark hoặc Web/Mobile.",
        ],
      },
    ],
    whyItMatters:
      "Khi dự án có 30 màn hình, chỉ cần sửa màu nút chính ở Variables hoặc Master Component là cả 30 màn hình tự cập nhật đồng bộ.",
    whenToUse: {
      useWhen: ["Bất kỳ phần tử nào xuất hiện từ 2 lần trở lên (Button, Input, Badge, Card, Header)."],
      limitations: ["Tránh lồng quá nhiều biến thể không dùng tới ngay từ đầu (variant sprawl); hãy dùng Boolean/Text property."],
    },
    realWorldExamples: [
      {
        product: "Bộ Button Component chuẩn",
        context: "Chỉ cần 2 Variant axes (Hierarchy: Primary/Secondary, State: Default/Hover/Disabled) + 2 Boolean properties (Show Left Icon, Show Right Icon).",
        takeaway: "Giảm từ 24 variants xuống còn 6 variants dễ bảo trì hơn gấp 4 lần.",
      },
    ],
    goodVsBad: {
      scenario: "Quản lý màu sắc và khoảng cách trong file Figma",
      badTitle: "Copy mã hex #17181C thủ công vào 50 nút khác nhau",
      badReason: "Khi đổi màu thương hiệu phải đi sửa tay từng màn hình, rất dễ sót.",
      goodTitle: "Gắn Color Variable `color/action/primary` và Number Variable `spacing/md`",
      goodReason: "Đồng bộ 100% với code của Dev và đổi theme trong 1 cú click.",
    },
    practicalPrompt:
      "Mở tab 'Nộp bài & Đánh giá' → chọn đề 'Figma Mini Design System' để thực hành tạo Button + Input Variants.",
    quiz: [
      {
        id: "q-7-2-1",
        question: "Tính năng nào giúp ẩn/hiện Icon bên trong Button mà KHÔNG cần tạo thêm Variant mới?",
        options: [
          { id: "a", text: "Boolean Property" },
          { id: "b", text: "Detach Instance" },
          { id: "c", text: "Flatten layer" },
        ],
        correctOptionId: "a",
        explanation: "Boolean Property gắn với layer visibility giúp bật/tắt icon ngay trên instance panel.",
      },
      {
        id: "q-7-2-2",
        question: "Vai trò chính của Figma Variables trong Design System là gì?",
        options: [
          { id: "a", text: "Chỉ để xuất ảnh PNG nhanh hơn" },
          { id: "b", text: "Lưu trữ giá trị tái sử dụng (màu, số, chuỗi) làm Design Tokens và hỗ trợ Modes" },
        ],
        correctOptionId: "b",
        explanation: "Variables đóng vai trò Design Tokens cầu nối giữa thiết kế Figma và mã nguồn.",
      },
    ],
    sourceLinks: [
      {
        label: "Figma Help — Guide to Variables",
        url: "https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-7-3",
    theoryBlocks: [
      {
        heading: "Interactive Prototype & Developer Handoff",
        points: [
          "Interactive Components: Thiết lập chuyển đổi trạng thái ngay trong Component (như Checkbox bật/tắt, Tab chuyển màu) để không phải nối dây chằng chịt ở từng màn hình.",
          "Handoff sạch sẽ cho Dev: Đặt tên Frame rõ ràng, dọn layer rác ('Rectangle 421'), liệt kê đầy đủ Empty/Loading/Error states và chú thích hành vi cuộn/responsive.",
        ],
      },
    ],
    whyItMatters:
      "Dev đánh giá rất cao Designer bàn giao file sạch, đủ trạng thái biên và giải thích rõ tương tác — giúp giảm hẳn lỗi hiểu nhầm khi code.",
    whenToUse: {
      useWhen: ["Khi chuẩn bị prototype đi Usability Test hoặc bàn giao thiết kế cho đội Kỹ thuật."],
      limitations: ["Không cần tạo animation quá cầu kỳ trong Figma nếu chỉ để kiểm tra luồng nghiệp vụ."],
    },
    realWorldExamples: [
      {
        product: "Trang Handoff chuẩn",
        context: "Chia rõ từng section trong Figma: 1. Happy Path Flow, 2. Edge Cases & Error States, 3. Mobile vs Desktop Notes.",
        takeaway: "Dev vào Dev Mode có thể inspect và code đúng ngay lần đầu không cần hỏi lại nhiều.",
      },
    ],
    goodVsBad: {
      scenario: "Bàn giao file Figma cho lập trình viên",
      badTitle: "Quăng 1 link file có 40 màn hình xếp lộn xộn tên 'Frame 12 copy 3', thiếu màn hình báo lỗi",
      badReason: "Dev phải tự đoán khi lỗi xảy ra thì hiện gì, dễ code sai với ý định UX.",
      goodTitle: "Sắp xếp theo Section luồng rõ ràng + kèm chú thích trạng thái Empty/Loading/Error + dùng Tokens",
      goodReason: "Tăng tốc độ phối hợp giữa Design và Engineering.",
    },
    practicalPrompt:
      "Kiểm tra lại 1 file Figma của bạn: đổi tên các Section và kiểm tra xem đã có màn hình Empty/Error state đi kèm chưa.",
    quiz: [
      {
        id: "q-7-3-1",
        question: "Ngoài màn hình chính (Happy Path), khi Handoff cho Dev bạn cần bổ sung những gì quan trọng nhất?",
        options: [
          { id: "a", text: "Thêm nhiều ảnh trang trí nền" },
          { id: "b", text: "Đặc tả Empty, Loading, Error states, hành vi responsive và chú thích tương tác" },
        ],
        correctOptionId: "b",
        explanation: "Dev cần biết hệ thống hiển thị thế nào khi chưa có dữ liệu, đang tải hoặc gặp lỗi.",
      },
      {
        id: "q-7-3-2",
        question: "Lợi ích lớn nhất của Interactive Components khi làm Prototype là gì?",
        options: [
          { id: "a", text: "Tương tác (như hover, toggle switch) được đóng gói sẵn trong Component, tái sử dụng ở mọi màn hình" },
          { id: "b", text: "Tự động xuất ra app iOS hoàn chỉnh" },
        ],
        correctOptionId: "a",
        explanation: "Interactive Components giúp tái sử dụng micro-interactions mà không cần nối dây trùng lặp.",
      },
    ],
    sourceLinks: [
      {
        label: "Figma Help — Developer Handoff",
        url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode",
        reviewedAt: "2026-11-14",
      },
    ],
  },

  // Stage 8: Case Study & Portfolio
  {
    lessonId: "les-8-1",
    theoryBlocks: [
      {
        heading: "Quy trình Product Design đầu-cuối & Đóng khung dự án",
        points: [
          "Một Portfolio Junior vững cần 2–3 Case Study thể hiện rõ khả năng giải quyết vấn đề từ Khám phá → Định nghĩa → Luồng & Wireframe → UI → Kiểm chứng & Lặp lại.",
          "Đóng khung trung thực: Nếu là dự án giả lập/tự học, ghi rõ 'Dự án mô phỏng' và nêu rõ giả định thay vì bịa số liệu tăng trưởng doanh thu ảo.",
        ],
      },
    ],
    whyItMatters:
      "Nhà tuyển dụng xem hàng trăm Portfolio giống nhau theo khuôn mẫu 'làm đủ 5 bước máy móc'. Họ tìm người thật sự hiểu vì sao mình chọn giải pháp đó.",
    whenToUse: {
      useWhen: ["Khi tổng hợp các bài thực hành đã làm thành Case Study hoàn chỉnh để đi ứng tuyển."],
      limitations: ["Không cần kể lể mọi chi tiết vụn vặt; chỉ giữ lại những bước dẫn tới quyết định thiết kế quan trọng."],
    },
    realWorldExamples: [
      {
        product: "Case Study cải tiến luồng Checkout Mobile",
        context: "Bắt đầu bằng vấn đề cụ thể (khó bấm, ẩn phí ship) → Sơ đồ luồng sửa đổi → Màn hình Before/After → Tự kiểm chứng bằng Usability Test với 3 người quen.",
        takeaway: "Dù quy mô nhỏ vẫn cực kỳ thuyết phục vì trung thực và có minh chứng.",
      },
    ],
    goodVsBad: {
      scenario: "Viết kết quả dự án tự làm trong Portfolio",
      badTitle: "'Sau khi thiết kế lại, doanh thu app tăng 240% và 99% người dùng hài lòng.' (số bịa)",
      badReason: "Nhà tuyển dụng nhận ra ngay thiếu trung thực nếu bạn không có dữ liệu thật.",
      goodTitle: "'Dự án mô phỏng: Kiểm thử nhanh với 4 người dùng giúp giảm nhầm lẫn ở bước nhập mã giảm giá; giới hạn là chưa đo được trên traffic thật.'",
      goodReason: "Trung thực, chuyên nghiệp và cho thấy tư duy phản biện.",
    },
    practicalPrompt:
      "Chọn 1 bài thực hành bạn đã nộp (Mobile Checkout hoặc Web SaaS Table) để dùng làm nền cho Case Study đầu tiên.",
    quiz: [
      {
        id: "q-8-1-1",
        question: "Khi làm một dự án Portfolio tự chọn (không phải dự án công ty thật), cách trình bày kết quả nào được đánh giá cao nhất?",
        options: [
          { id: "a", text: "Tự viết con số tăng 150% chuyển đổi cho ấn tượng" },
          { id: "b", text: "Ghi rõ là dự án mô phỏng, trình bày phát hiện từ usability test nhỏ và nêu thẳng giới hạn chưa có số liệu live" },
        ],
        correctOptionId: "b",
        explanation: "Tính trung thực (integrity) và khả năng nhận biết giới hạn dự án là phẩm chất cốt lõi của Product Designer.",
      },
      {
        id: "q-8-1-2",
        question: "Portfolio Junior nên có khoảng bao nhiêu Case Study chất lượng sâu?",
        options: [
          { id: "a", text: "10 dự án nhưng mỗi dự án chỉ có 2 ảnh" },
          { id: "b", text: "2–3 Case Study chỉn chu, rõ bối cảnh, quyết định thiết kế và cải tiến" },
        ],
        correctOptionId: "b",
        explanation: "Chất lượng lập luận sâu ở 2–3 Case Study giá trị hơn nhiều so với 10 gallery ảnh rời rạc.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — UX Portfolios & Case Studies",
        url: "https://www.nngroup.com/articles/ux-design-portfolios/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-8-2",
    theoryBlocks: [
      {
        heading: "Kể chuyện Portfolio Case Study ngắn gọn & dễ quét",
        points: [
          "Cấu trúc kể chuyện 5 nhịp cho người bận rộn (đọc lướt trong 2 phút): Tóm tắt 30s (Vấn đề + Kết quả chính) → Bối cảnh & Ràng buộc → Insight cốt lõi → Quá trình thiết kế & Trade-offs → Kiểm chứng & Bài học.",
          "Dùng nhiều hình ảnh minh họa (ảnh trước/sau có chú thích mũi tên, sơ đồ luồng) thay cho đoạn văn dài.",
        ],
      },
    ],
    whyItMatters:
      "Hiring Manager thường chỉ dành 1–3 phút xem lướt 1 Case Study trước khi quyết định có gọi phỏng vấn hay không.",
    whenToUse: {
      useWhen: ["Khi biên tập nội dung Case Study lên web cá nhân, Notion hoặc Figma Slides."],
      limitations: ["Tránh dán ảnh quá nhỏ hoặc chữ trong ảnh không đọc nổi trên laptop."],
    },
    realWorldExamples: [
      {
        product: "Trang mở đầu Case Study chuẩn",
        context: "Ngay đầu trang có: Vai trò của bạn, Thời gian, Nền tảng (Web/Mobile), Bài toán 2 câu, và 1 ảnh Final UI rõ nét.",
        takeaway: "Giúp người đọc nắm ngay ngữ cảnh chỉ trong 10 giây đầu.",
      },
    ],
    goodVsBad: {
      scenario: "Trình bày phần Research trong Case Study",
      badTitle: "Viết 800 chữ kể lể chi tiết định nghĩa Persona là gì",
      badReason: "Người tuyển dụng đã biết Persona là gì — họ muốn xem insight gì đã thay đổi thiết kế của bạn.",
      goodTitle: "Chốt 3 Insight chính + Mũi tên nối trực tiếp sang 3 thay đổi cụ thể trên màn hình",
      goodReason: "Cho thấy nghiên cứu thật sự dẫn đường cho thiết kế.",
    },
    practicalPrompt:
      "Viết phần Tóm tắt 30 giây (Role, Platform, Problem 1 câu, Solution 1 câu) cho Case Study của bạn vào ô Ghi chú.",
    quiz: [
      {
        id: "q-8-2-1",
        question: "Vì sao không nên kể định nghĩa sách giáo khoa (như 'Design Thinking có 5 bước...') trong Case Study?",
        options: [
          { id: "a", text: "Vì người đọc muốn thấy insight và quyết định thiết kế riêng của dự án bạn, không phải lý thuyết chung" },
          { id: "b", text: "Vì Design Thinking đã lỗi thời hoàn toàn" },
        ],
        correctOptionId: "a",
        explanation: "Hãy đi thẳng vào bối cảnh, dữ kiện tìm được và cách nó định hình giải pháp.",
      },
      {
        id: "q-8-2-2",
        question: "Thời gian trung bình người tuyển dụng đọc lướt vòng đầu 1 Portfolio thường rất ngắn, nên ưu tiên điều gì?",
        options: [
          { id: "a", text: "Đoạn văn dài phân tích triết lý thiết kế" },
          { id: "b", text: "Tóm tắt 30s ở đầu, tiêu đề mục chứa insight chính và ảnh Before/After có chú thích" },
        ],
        correctOptionId: "b",
        explanation: "Giúp người bận rộn quét nhanh được năng lực giải quyết vấn đề của bạn.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Storytelling in UX",
        url: "https://www.nngroup.com/articles/ux-stories/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
  {
    lessonId: "les-8-3",
    theoryBlocks: [
      {
        heading: "Phỏng vấn Walkthrough & Phối hợp PM / BA / Dev",
        points: [
          "Portfolio Walkthrough 10 phút: Dành 2 phút cho bối cảnh & bài toán, 5 phút cho quyết định thiết kế & luồng chính, 3 phút cho kiểm thử, cải tiến và bài học.",
          "Khi bị chất vấn: Lắng nghe góc nhìn của PM (business/scope) và Dev (effort/data), dùng bằng chứng và trade-off để trao đổi bình tĩnh thay vì bảo vệ cái tôi.",
        ],
      },
    ],
    whyItMatters:
      "Làm sản phẩm là làm việc nhóm. Kỹ năng giao tiếp và hợp tác quyết định bạn có vượt qua vòng phỏng vấn chuyên môn hay không.",
    whenToUse: {
      useWhen: ["Chuẩn bị vòng phỏng vấn chuyên môn hoặc buổi Design Critique hàng tuần."],
      limitations: ["Khi được hỏi về điểm chưa biết, nói thẳng 'Em chưa có dữ liệu phần này, nếu làm tiếp em sẽ kiểm tra bằng...'."],
    },
    realWorldExamples: [
      {
        product: "Tình huống Dev báo component quá khó code đúng deadline",
        context: "Thay vì khăng khăng giữ hiệu ứng phức tạp, Designer đề xuất dùng pattern chuẩn nhẹ hơn cho Phase 1 và đưa hiệu ứng vào Phase 2.",
        takeaway: "Giữ chất lượng trải nghiệm cốt lõi mà vẫn đảm bảo tiến độ ra mắt.",
      },
    ],
    goodVsBad: {
      scenario: "Phản hồi khi người phỏng vấn chỉ ra 1 lỗ hổng trong thiết kế",
      badTitle: "Cãi lại hoặc im lặng lúng túng vì nghĩ bài mình bị chê",
      badReason: "Cho thấy thiếu cởi mở khi làm việc nhóm.",
      goodTitle: "'Góc nhìn này rất hay! Lúc đó em chưa xét tới trường hợp này vì ưu tiên X, nếu sửa lại em sẽ xử lý bằng Y.'",
      goodReason: "Thể hiện tư duy cầu tiến và phản xạ Product Design trưởng thành.",
    },
    practicalPrompt:
      "Chuẩn bị gạch đầu dòng 3 ý cho phần trình bày 3 phút về 1 màn hình bạn tâm đắc nhất.",
    quiz: [
      {
        id: "q-8-3-1",
        question: "Trong buổi thuyết trình Case Study 10 phút, bạn nên dành phần lớn thời gian nói về điều gì?",
        options: [
          { id: "a", text: "Cách bạn chọn font chữ và tạo bóng đổ trong Figma" },
          { id: "b", text: "Bài toán, các quyết định thiết kế/trade-offs và những lần lặp lại sau kiểm thử" },
        ],
        correctOptionId: "b",
        explanation: "Người phỏng vấn muốn hiểu cách bạn suy nghĩ và xử lý vấn đề hơn là thao tác công cụ.",
      },
      {
        id: "q-8-3-2",
        question: "Khi Dev báo một tương tác bạn thiết kế tốn quá nhiều công sức kỹ thuật cho sprint hiện tại, cách xử lý tốt nhất là gì?",
        options: [
          { id: "a", text: "Cùng Dev bàn phương án thay thế nhẹ hơn vẫn giữ được mục tiêu UX cốt lõi" },
          { id: "b", text: "Bỏ qua ý kiến Dev vì UX là quan trọng nhất" },
        ],
        correctOptionId: "a",
        explanation: "Designer giỏi biết phối hợp linh hoạt để sản phẩm chạy ổn định và đúng hạn.",
      },
    ],
    sourceLinks: [
      {
        label: "NN/g — Design Critiques",
        url: "https://www.nngroup.com/articles/design-critiques/",
        reviewedAt: "2026-11-14",
      },
    ],
  },
];
