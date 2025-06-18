import SubHeader from "../../../components/SubHeader";
import ImageHeading from "/doc5.jpg";
import img from "/favicon.png";

const Blog = () => {
  return (
    <>
      <SubHeader
        title="Về chúng tôi"
        subtitle="Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất."
      />

      {/* Doctor Achievement Section */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{ marginBottom: 100, marginTop: 100 }}
      >
        <div className="flex flex-wrap -mx-4 p-5">
          <div className="lg:w-1/3 w-full px-4">
            <div className="text-center mb-6">
              <h2 className="uppercase text-2xl font-bold text-slate-700 mb-2">
                Thành tựu của đội ngũ bác sĩ
              </h2>
              <p className="text-md text-gray-600 m-0">
                Những cống hiến đáng tự hào trong lĩnh vực y tế.
              </p>
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Đội ngũ bác sĩ của chúng tôi có nhiều năm kinh nghiệm trong việc
              điều trị và chăm sóc bệnh nhân. Với sự tận tâm và chuyên môn cao,
              chúng tôi đã giúp hàng nghìn bệnh nhân phục hồi sức khỏe và có
              cuộc sống tốt đẹp hơn. Mỗi thành công của bệnh nhân chính là niềm
              tự hào và động lực của chúng tôi.
            </p>
          </div>

          <div className="lg:w-2/3 w-full px-4">
            <img
              src={ImageHeading}
              alt="Đội ngũ bác sĩ chuyên nghiệp"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{ marginBottom: 100, marginTop: 100 }}
      ></div>

      {/* Awards Section */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{ marginBottom: 100, marginTop: 100 }}
      >
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="lg:w-1/3 w-full px-4">
            <div className="text-center mb-6">
              <h2 className="uppercase text-2xl font-bold text-slate-700 mb-2">
                Giải thưởng và chứng nhận
              </h2>
              <p className="text-md text-gray-600 m-0">
                Những vinh danh từ các tổ chức y tế uy tín.
              </p>
            </div>
          </div>
          <div className="lg:w-2/3 w-full px-4">
            <div className="flex flex-wrap -mx-4">
              {Array(6)
                .fill(null)
                .map((_, id) => (
                  <div
                    className="lg:w-1/3 md:w-1/2 sm:w-1/2 w-full px-4 mb-4"
                    key={id + 3}
                  >
                    <div className="h-30 mb-2.5 flex items-center justify-center bg-gray-100 overflow-hidden rounded-2xl hover:bg-gray-200 transition-colors duration-300">
                      <img
                        src={img}
                        alt="Giải thưởng y tế"
                        className="w-full h-auto max-w-24"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Specialist Section */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{ marginBottom: 100, marginTop: 100 }}
      >
        <div className="flex flex-wrap -mx-4 justify-center">
          <div className="lg:w-1/2 w-full px-4">
            <div className="mb-8 text-center">
              <h2 className="uppercase text-2xl font-bold text-slate-700 mb-2">
                Gặp gỡ các chuyên gia của chúng tôi
              </h2>
              <p className="text-md text-gray-600 m-0">
                Đội ngũ bác sĩ chuyên khoa hàng đầu với nhiều năm kinh nghiệm
                trong lĩnh vực chăm sóc sức khỏe trực tuyến.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Doctor's Say Section */}
      <div
        className="max-w-7xl mx-auto px-4"
        style={{
          marginBottom: 100,
          marginTop: 100,
        }}
      >
        <div className="flex flex-wrap -mx-4 items-center">
          {/* Image Section - Left Side */}
          <div className="lg:w-1/2 w-full px-4">
            <img
              src="/public/doc4.jpg"
              alt="Bác sĩ tư vấn trực tuyến"
              className="object-cover w-full rounded-lg"
            />
          </div>

          {/* Content Section - Right Side */}
          <div className="lg:w-1/2 w-full px-4">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="uppercase text-2xl font-bold text-slate-700 mb-2">
                Bác sĩ nói gì về chúng tôi
              </h2>
              <p className="text-md text-gray-600 m-0">
                Chia sẻ từ những bác sĩ đầu ngành về trải nghiệm làm việc tại
                bệnh viện trực tuyến của chúng tôi.
              </p>
            </div>

            <div className="my-4">
              <h4 className="text-slate-700 text-xl font-semibold my-0">
                Dịch vụ tuyệt vời!
              </h4>
              <span className="text-gray-600 font-medium">
                BS. Nguyễn Văn An
              </span>
            </div>
            <p className="text-md text-gray-700 leading-relaxed">
              Hệ thống bệnh viện trực tuyến này cung cấp nền tảng tuyệt vời để
              tôi có thể tư vấn và chăm sóc bệnh nhân một cách hiệu quả. Công
              nghệ hiện đại, giao diện thân thiện và quy trình chuyên nghiệp
              giúp tôi mang đến dịch vụ chăm sóc sức khỏe chất lượng cao cho mọi
              bệnh nhân.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
