import type { LessonStructuredContent } from "@/types/learning";

export const STAGES_1_TO_3_OVERRIDES: Partial<
  Record<string, Partial<LessonStructuredContent>>
> = {
  "les-1-1": {
    theoryBlocks: [
      {
        heading: "Phân biệt UX, UI và Product Designer",
        points: [
          "UX (User Experience): Toàn bộ cảm nhận, luồng đi và mức độ giải quyết vấn đề khi người dùng tương tác sản phẩm.",
          "UI (User Interface): Lớp giao diện trực quan (bố cục, màu sắc, typography, component) giúp người dùng thao tác dễ dàng.",
          "Product Designer: Kết hợp cả UX + UI + Tư duy sản phẩm (Product Thinking) & đo lường chỉ số kinh doanh.",
        ],
      },
    ],
    goodVsBad: {
      scenario: "Thiết kế nút hành động chính trên màn hình thanh toán",
      badTitle: "Nút bo góc bóng đổ cầu kỳ nhưng đặt chữ 'Tiếp' màu xám nhạt khó thấy",
      badReason: "UI trang trí nhưng trải nghiệm UX kém vì người dùng không nhận ra bước tiếp theo.",
      goodTitle: "Nút đơn giản, tương phản cao, nhãn rõ nghĩa 'Thanh toán 250.000đ'",
      goodReason: "Kết hợp UI rõ ràng với UX minh bạch giúp giảm do dự.",
    },
    quiz: [
      {
        id: "q-1-1-1",
        question: "Điểm giao thoa lớn nhất từ nền tảng Marketing sang UX/Product Design là gì?",
        options: [
          { id: "a", text: "Hiểu hành vi, insight khách hàng và hành trình chuyển đổi" },
          { id: "b", text: "Chỉ biết chạy quảng cáo Facebook" },
        ],
        correctOptionId: "a",
        explanation: "Tư duy nghiên cứu khách hàng và phễu chuyển đổi từ Marketing là lợi thế rất lớn khi học UX.",
      },
      {
        id: "q-1-1-2",
        question: "Một sản phẩm có UI đẹp nhưng không giải quyết đúng nhu cầu người dùng thì vấn đề nằm ở đâu?",
        options: [
          { id: "a", text: "Thiếu UX Research và Problem Framing" },
          { id: "b", text: "Chưa dùng đủ màu gradient" },
        ],
        correctOptionId: "a",
        explanation: "Giao diện đẹp không thể cứu một giải pháp giải sai bài toán của người dùng.",
      },
    ],
  },
  "les-2-1": {
    theoryBlocks: [
      {
        heading: "Events & Funnel Analysis",
        points: [
          "Event Tracking ghi nhận hành động cụ thể (vd: `view_cart`, `apply_coupon_failed`, `checkout_submit`).",
          "Funnel cho thấy tỷ lệ chuyển đổi qua từng bước và bước nào có tỷ lệ rơi (Drop-off) cao nhất.",
        ],
      },
    ],
    quiz: [
      {
        id: "q-2-1-1",
        question: "Phân tích phễu (Funnel Analysis) giúp Designer phát hiện điều gì nhanh nhất?",
        options: [
          { id: "a", text: "Bước cụ thể trong luồng nơi nhiều người dùng bỏ cuộc nhất" },
          { id: "b", text: "Màu sắc logo nào đẹp hơn" },
        ],
        correctOptionId: "a",
        explanation: "Funnel chỉ rõ điểm rơi (drop-off) định lượng để tập trung nghiên cứu nguyên nhân UX.",
      },
      {
        id: "q-2-1-2",
        question: "Chỉ dựa vào số liệu Funnel có đủ để biết lý do người dùng rời bỏ không?",
        options: [
          { id: "a", text: "Không; số liệu cho biết 'ở đâu', cần Usability Test/Phỏng vấn để biết 'tại sao'" },
          { id: "b", text: "Đủ hoàn toàn" },
        ],
        correctOptionId: "a",
        explanation: "Kết hợp định lượng (Funnel) và định tính (Testing) giúp chẩn đoán đúng gốc rễ.",
      },
    ],
  },
  "les-3-2": {
    theoryBlocks: [
      {
        heading: "User Flow vs Task Flow & Rẽ nhánh lỗi",
        points: [
          "Task Flow mô tả 1 đường thẳng hoàn thành nhiệm vụ chuẩn (Happy Path).",
          "User Flow bao gồm các điểm rẽ nhánh điều kiện (đã đăng nhập / chưa đăng nhập) và đường xử lý lỗi.",
        ],
      },
    ],
    quiz: [
      {
        id: "q-3-2-1",
        question: "Khác biệt chính giữa User Flow và Task Flow là gì?",
        options: [
          { id: "a", text: "User Flow có các điểm rẽ nhánh điều kiện và ngoại lệ; Task Flow thường là 1 mạch tuyến tính" },
          { id: "b", text: "Task Flow dùng để vẽ icon" },
        ],
        correctOptionId: "a",
        explanation: "User Flow thể hiện đầy đủ quyết định và ngã rẽ theo từng trạng thái người dùng.",
      },
      {
        id: "q-3-2-2",
        question: "Một User Flow đạt chuẩn Junior cần chú ý điều gì ngoài Happy Path?",
        options: [
          { id: "a", text: "Các trường hợp lỗi, rẽ nhánh và lối quay lại (recovery)" },
          { id: "b", text: "Phối màu bóng đổ cho mũi tên" },
        ],
        correctOptionId: "a",
        explanation: "Xử lý edge cases và đường hồi phục lỗi là dấu hiệu của thiết kế UX chín chắn.",
      },
    ],
  },
};
