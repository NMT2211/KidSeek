import React from "react";
import "../styles/about.css"; 

export default function AboutPage() {
  const team = [
    {
      initials: "HP",
      name: "Huy Phúc",
      role: "Đồng sáng lập & CEO",
      bio: "Chuyên gia về lĩnh vực giáo dục và công nghệ, với kinh nghiệm nhiều năm trong phát triển các nền tảng học tập trực tuyến.",
    },
    {
      initials: "TT",
      name: "Thanh Tùng",
      role: "Giám đốc kỹ thuật",
      bio: "Chuyên gia công nghệ với nhiều năm kinh nghiệm trong phát triển phần mềm và hệ thống AI, đặc biệt trong lĩnh vực giáo dục.",
    },
    {
      initials: "TQ",
      name: "Thanh Quý",
      role: "Giám đốc sản phẩm",
      bio: "Chuyên gia thiết kế trải nghiệm người dùng với tầm nhìn sáng tạo, tập trung vào việc phát triển giải pháp giáo dục hiện đại và hiệu quả.",
    },
  ];

  const values = [
    {
      iconBg: "bg-indigo-100 text-indigo-600",
      title: "Chất lượng giáo dục",
      description:
        "Chúng tôi cam kết mang đến nội dung học tập chính xác, cập nhật và theo đúng chuẩn giáo dục Việt Nam. Mọi tính năng và nội dung đều được thiết kế để hỗ trợ việc học hiệu quả.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-green-100 text-green-600",
      title: "Cá nhân hóa",
      description:
        "Chúng tôi tin rằng mỗi học sinh là duy nhất với phong cách học tập và nhu cầu riêng. KidSeek sử dụng AI để cung cấp trải nghiệm học tập được điều chỉnh cho từng cá nhân.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 12C17 14.76 14.76 17 12 17S7 14.76 7 12 9.24 7 12 7s5 2.24 5 5ZM12 1C5.92 1 1 5.92 1 12s4.92 11 11 11 11-4.92 11-11S18.08 1 12 1Zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9Z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-yellow-100 text-yellow-600",
      title: "Minh bạch và an toàn",
      description:
        "Bảo vệ dữ liệu của học sinh và sự minh bạch trong mọi hoạt động là ưu tiên hàng đầu. Chúng tôi cam kết tạo ra môi trường học tập an toàn và đáng tin cậy.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM12 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19Z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-pink-100 text-pink-600",
      title: "Tính sáng tạo",
      description:
        "Chúng tôi khuyến khích và phát triển tư duy sáng tạo thông qua các bài học tương tác, trò chơi giáo dục và thách thức tư duy. Học tập không chỉ là ghi nhớ mà còn là sáng tạo.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 15c0-1.66 1.34-3 3-3s3 1.34 3 3l-3 3-3-3Zm7-2 3-3 1 1-4 4-2-2 1-1 1 1Zm-9 0 3-3 1 1-4 4-2-2 1-1 1 1Z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-purple-100 text-purple-600",
      title: "Liên tục cải tiến",
      description:
        "Chúng tôi không ngừng lắng nghe phản hồi từ người dùng và cập nhật nền tảng để mang đến trải nghiệm tốt nhất. Sự phát triển liên tục là cam kết của chúng tôi với cộng đồng.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0L15.13 5.12l3.75 3.75 1.83-1.83Z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-orange-100 text-orange-600",
      title: "Hợp tác",
      description:
        "Chúng tôi tin rằng giáo dục thành công đòi hỏi sự hợp tác giữa học sinh, phụ huynh, giáo viên và công nghệ. KidSeek là cầu nối để tất cả các bên cùng đồng hành.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
        </svg>
      ),
    },
  ];


  // timelineData.js (hoặc nằm trong file nếu bạn muốn gộp)
  const timelineItems = [
    {
      step: '01',
      title: 'Khởi nguồn',
      content:
        'KidSeek bắt đầu từ ý tưởng của một nhóm các kỹ sư và giáo viên đam mê công nghệ và giáo dục. Chúng tôi nhận thấy tầm quan trọng của việc kết hợp trí tuệ nhân tạo vào quá trình học tập để giúp học sinh tiếp thu kiến thức hiệu quả hơn.',
    },
    {
      step: '02',
      title: 'Nghiên cứu và phát triển',
      content:
        'Sau nhiều tháng nghiên cứu chương trình giáo dục Việt Nam và phát triển công nghệ, chúng tôi đã tạo ra một mô hình AI được huấn luyện đặc biệt để hiểu và hỗ trợ học sinh từ lớp 1 đến lớp 12 trong các môn học khác nhau.',
    },
    {
      step: '03',
      title: 'Ra mắt nền tảng',
      content:
        'KidSeek chính thức ra mắt vào năm 2025, mang đến một nền tảng học tập trực tuyến toàn diện với các tính năng như trợ lý AI, bài tập tương tác, và báo cáo tiến độ chi tiết. Sự đón nhận tích cực từ học sinh và phụ huynh giúp chúng tôi không ngừng cải tiến.',
    },
    {
      step: '04',
      title: 'Phát triển liên tục',
      content:
        'Hiện tại, KidSeek tiếp tục mở rộng và cải thiện nền tảng, phát triển thêm nhiều tính năng mới như phân tích học tập dựa trên dữ liệu, nội dung cá nhân hóa thông minh hơn, và tích hợp với các trường học để hỗ trợ giáo viên trong việc giảng dạy.',
    },
  ];


  return (
    <div className="text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#f5f7ff] to-[#eef2ff] hero-highlight text-black py-20 text-center">
        <h2 className="text-5xl  mb-5">
            Về  <span className="underline-animate"> KidSeek</span>
        </h2>
        <p className="text-xl  text-black/80">
            Nền tảng học tập thông minh được thiết kế riêng cho học sinh Việt Nam
        </p>
      </section>

      {/* Sứ mệnh */}
      <section className="py-16 bg-white text-[17px]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-40 justify-center">

            {/* Left Text */}
            <div className="max-w-2xl w-full mx-auto md:mx-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Sứ mệnh của chúng tôi
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                  KidSeek ra đời với sứ mệnh cải thiện trải nghiệm học tập của học sinh Việt Nam bằng cách tận dụng sức mạnh của trí tuệ nhân tạo. Chúng tôi tin rằng mỗi học sinh đều xứng đáng được tiếp cận với công cụ học tập hiện đại, hiệu quả và phù hợp với nhu cầu cá nhân.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                  Thông qua nền tảng của mình, KidSeek cam kết:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                  <li>Cung cấp nội dung học tập chất lượng cao, theo đúng chuẩn chương trình của Bộ Giáo dục và Đào tạo Việt Nam</li>
                  <li>Tạo môi trường học tập tương tác, hấp dẫn và phù hợp với độ tuổi</li>
                  <li>Phát triển kỹ năng tư duy phản biện và khả năng giải quyết vấn đề</li>
                  <li>Mang đến trải nghiệm học tập cá nhân hóa dựa trên khả năng và tiến độ của từng học sinh</li>
                  <li>Hỗ trợ phụ huynh trong việc theo dõi và đồng hành cùng con trên hành trình học tập</li>
              </ul>
            </div>

            {/* Right SVG Image */}
            <div className="w-full max-w-sm mx-auto md:mx-0 flex justify-center">
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
            >
                <rect width="400" height="400" rx="20" fill="#F8F9FA" />
                <path
                d="M200 50C117.2 50 50 117.2 50 200C50 282.8 117.2 350 200 350C282.8 350 350 282.8 350 200C350 117.2 282.8 50 200 50Z"
                fill="#E6EEFE"
                />
                <path
                d="M200 100C150.3 100 110 140.3 110 190C110 239.7 150.3 280 200 280C249.7 280 290 239.7 290 190C290 140.3 249.7 100 200 100Z"
                fill="#4F6DF5"
                fillOpacity="0.1"
                />
                <path
                d="M260 190C260 223.1 233.1 250 200 250C166.9 250 140 223.1 140 190C140 156.9 166.9 130 200 130C233.1 130 260 156.9 260 190Z"
                fill="#4F6DF5"
                fillOpacity="0.2"
                />
                <path
                d="M240 190C240 212 222 230 200 230C178 230 160 212 160 190C160 168 178 150 200 150C222 150 240 168 240 190Z"
                fill="#4F6DF5"
                />
                <circle cx="200" cy="70" r="20" fill="#FF6B8B" />
                <circle cx="320" cy="200" r="15" fill="#FFC149" />
                <circle cx="200" cy="330" r="15" fill="#0FBA81" />
                <circle cx="70" cy="200" r="20" fill="#FF6B8B" />
            </svg>
            </div>
            
        </div>
      </section>



      {/* Timeline */}
       <section className="bg-gray-50 py-16">
        <div className="container max-w-7xl mx-auto px-6">

          {/* Header */}

          <div className="flex flex-col md:flex-row items-center mb-12 gap-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Câu chuyện của chúng tôi
            </h2>
            <p className="text-gray-500 text-lg ml-40">
              Từ ý tưởng đến nền tảng giáo dục hàng đầu
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-12 custom-timeline space-y-16 max-w-4xl  mx-auto">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[52px] w-12 h-12 bg-blue-600 text-white font-bold text-sm flex items-center justify-center rounded-full shadow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Team */}
       <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-12 gap-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-gray-500 text-lg ml-40">
              Những người đứng sau KidSeek
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-blue-600 text-white text-3xl font-extrabold flex items-center justify-center">
                    {member.initials}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row items-center mb-12 gap-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Giá trị cốt lõi
            </h2>
            <p className="text-gray-500 text-lg ml-40">
              Những nguyên tắc định hướng mọi quyết định của chúng tôi
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${value.iconBg}`}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center py-16">
        <h3 className="text-3xl font-bold mb-4">
          Hãy đồng hành cùng KidSeek trong hành trình học tập
        </h3>
        <p className="text-lg mb-8">
          Đăng ký ngay hôm nay để trải nghiệm nền tảng học tập thông minh
        </p>
        <div className="space-x-4 inline-flex">
          {/* Nút 1: Bắt đầu miễn phí */}
          <a
        href="/register"
        className="relative inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-md overflow-hidden group transition-colors duration-300 hover:bg-blue-600 hover:text-white"
      >
        {/* Hiệu ứng xanh nhạt chạy qua, delay sau hover */}
        <span className="absolute inset-0 bg-blue-400 opacity-20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out delay-200 z-10"></span>

        {/* Chữ luôn nằm trên */}
        <span className="relative z-20">Bắt đầu miễn phí</span>
      </a>




          {/* Nút 2: Liên hệ với chúng tôi */}
          <a
            href="/contact"
            className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Liên hệ với chúng tôi
          </a>
        </div>
      </section>

      
    </div>
  );
}
