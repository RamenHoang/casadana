// Shared bilingual content for the Casadana Homestay site.
// Edit copy here — both the home page and (later) property pages can import from this file.

export const UI = {
  en: {
    navAbout: "About",
    navRooms: "Rooms",
    navStays: "Stays",
    navGallery: "Gallery",
    navLocation: "Location",
    book: "BOOK →",
    bookHero: "BOOK VIA MESSENGER",
    heroTagline: "Your cozy home in Da Nang",
    heroSub:
      "A warm retreat in the heart of Da Nang — cozy rooms, local charm, and hospitality that feels like family.",
    amenity1Title: "COZY ROOMS",
    amenity1Sub: "Feel at home",
    amenity2Title: "GREAT LOCATION",
    amenity2Sub: "Near beaches & city center",
    amenity3Title: "LOCAL EXPERIENCE",
    amenity3Sub: "Live like a local",
    amenity4Title: "WARM HOSPITALITY",
    amenity4Sub: "We care about your stay",
    helloWeAre: "Hello, we are",
    aboutPara:
      "Casadana was created with the hope of offering a warm and cozy retreat where you can take a break from the everyday and enjoy peaceful moments with family, friends, or by yourself. Every corner of the house has been thoughtfully designed to provide comfort, warmth, and the feeling of being right at home.",
    propertiesHeading: "Our Homestays",
    galleryHeading: "Gallery",
    locationHeading: "Prime Location",
    locationSub:
      "Perfectly located in Da Nang, Casadana offers easy access to the city\u2019s most popular attractions and everyday conveniences.",
    footerTagline: "Enjoy your stay!",
    footerCta: "BOOK WITH US ON MESSENGER",
    comingSoon: "Coming soon",
    comingSoonBody:
      "This property page is being prepared. In the meantime, message us on Messenger for photos, rates and availability.",
    backHome: "← Back to home",
  },
  vi: {
    navAbout: "Giới thiệu",
    navRooms: "Phòng",
    navStays: "Cơ sở",
    navGallery: "Thư viện ảnh",
    navLocation: "Vị trí",
    book: "ĐẶT PHÒNG →",
    bookHero: "ĐẶT QUA MESSENGER",
    heroTagline: "Ngôi nhà ấm cúng của bạn tại Đà Nẵng",
    heroSub:
      "Không gian nghỉ dưỡng ấm cúng giữa lòng Đà Nẵng — phòng ốc tiện nghi, đậm chất địa phương và sự hiếu khách như người thân.",
    amenity1Title: "PHÒNG ẤM CÚNG",
    amenity1Sub: "Cảm giác như ở nhà",
    amenity2Title: "VỊ TRÍ THUẬN TIỆN",
    amenity2Sub: "Gần biển & trung tâm",
    amenity3Title: "TRẢI NGHIỆM ĐỊA PHƯƠNG",
    amenity3Sub: "Sống như người bản xứ",
    amenity4Title: "HIẾU KHÁCH NỒNG HẬU",
    amenity4Sub: "Quan tâm đến kỳ nghỉ của bạn",
    helloWeAre: "Xin chào, chúng tôi là",
    aboutPara:
      "Casadana là homestay ấm cúng tại Đà Nẵng, được thiết kế tỉ mỉ để mang đến không gian nghỉ dưỡng thư giãn, nơi bạn thật sự cảm thấy như ở nhà. Từng góc nhỏ trong nhà đều được chăm chút để mang lại sự thoải mái và ấm áp.",
    propertiesHeading: "Các Cơ Sở Của Chúng Tôi",
    galleryHeading: "Thư Viện Ảnh",
    locationHeading: "Vị Trí Đắc Địa",
    locationSub:
      "Tọa lạc tại Đà Nẵng, Casadana giúp bạn dễ dàng di chuyển đến các điểm tham quan nổi tiếng và tiện ích xung quanh.",
    footerTagline: "Chúc bạn kỳ nghỉ vui vẻ!",
    footerCta: "ĐẶT PHÒNG QUA MESSENGER",
    comingSoon: "Sắp ra mắt",
    comingSoonBody:
      "Trang của cơ sở này đang được chuẩn bị. Trong lúc chờ, hãy nhắn tin qua Messenger để xem ảnh, giá phòng và tình trạng còn phòng.",
    backHome: "← Về trang chủ",
  },
};

export const MESSENGER_HANDLE = "casadana.home";
export const messengerUrl = `https://www.facebook.com/Casadanahome`;

export const roomsData = [
  {
    id: "deluxe",
    img: "/assets/deluxe-1.webp",
    name: { en: "Deluxe Room", vi: "Phòng Deluxe" },
    tagline: { en: "STANDARD COMFORT", vi: "TIỆN NGHI TIÊU CHUẨN" },
    text: {
      en: "Two cozy bedrooms, each furnished with a 1.4m double bed, a wardrobe, a dressing table, and a private en-suite bathroom with all essential amenities.",
      vi: "Casadana Lê Đình Dương có 2 phòng ngủ nhỏ, mỗi phòng được trang bị 1 giường đôi 1,4m, tủ quần áo và bàn trang điểm, mang đến không gian ấm cúng và tiện nghi.",
    },
  },
  {
    id: "master",
    img: "/assets/master-room.webp",
    name: { en: "Master Room", vi: "Phòng Master" },
    tagline: { en: "LUXURY & EXCLUSIVITY", vi: "SANG TRỌNG & ĐỘC QUYỀN" },
    text: {
      en: "A spacious 1.6m queen-size bed and a large floor-to-ceiling window filling the room with natural light for a bright, airy stay.",
      vi: "Phòng ngủ lớn được trang bị giường đôi 1,6m, nổi bật với cửa sổ kính lớn đón ánh sáng tự nhiên, tạo cảm giác thoáng đãng và dễ chịu.",
    },
  },
];

export const spacesData = [
  {
    img: "/assets/living-main.webp",
    name: { en: "Living Room", vi: "Phòng Khách" },
    text: {
      en: "A warm gathering space with a comfortable sofa and projector, perfect for movie nights.",
      vi: "Không gian ấm cúng với sofa lớn và máy chiếu, lý tưởng để thư giãn cùng gia đình.",
    },
  },
  {
    img: "/assets/kitchen.webp",
    name: { en: "Kitchen & Dining", vi: "Bếp & Phòng Ăn" },
    text: {
      en: "Fully equipped with cooktop, fridge and all utensils for easy home-cooked meals.",
      vi: "Bếp đầy đủ tiện nghi: bếp từ, tủ lạnh, nồi chảo — nấu ăn thoải mái như ở nhà.",
    },
  },
  {
    img: "/assets/massage-chair.webp",
    name: { en: "Massage Chair", vi: "Ghế Massage" },
    text: {
      en: "A full-body massage chair to unwind and recharge after a day of exploring.",
      vi: "Ghế massage toàn thân giúp bạn thư giãn sau một ngày khám phá Đà Nẵng.",
    },
  },
];

// slug -> used for /properties/[slug] routes
export const propertiesData = [
  {
    slug: "le-dinh-duong",
    img: "/assets/le-dinh-duong-home.webp",
    name: "Casadana Lê Đình Dương",
    addr: "125/3 Lê Đình Dương, Hải Châu, Đà Nẵng",
    tag: { en: "HOUSE 1 · 2 BEDROOMS", vi: "NHÀ 1 · 2 PHÒNG NGỦ" },
  },
  {
    slug: "nguyen-thong-1",
    img: "/assets/nguyen-thong-1-home.webp",
    name: "Casadana Nguyễn Thông I",
    addr: "25/22 Nguyễn Thông, An Hải, Đà Nẵng",
    tag: { en: "HOUSE 2 · FAMILY SUITE", vi: "NHÀ 2 · CĂN GIA ĐÌNH" },
  },
  {
    slug: "nguyen-thong-2",
    img: "/assets/nguyen-thong-2-home.webp",
    name: "Casadana Nguyễn Thông II",
    addr: "25/22 Nguyễn Thông, An Hải, Đà Nẵng",
    tag: { en: "HOUSE 3 · MASTER SUITE", vi: "NHÀ 3 · CĂN MASTER" },
  },
];

export const nearbyData = [
  {
    img: "/assets/location-airport.jpg",
    name: { en: "Da Nang Int'l Airport", vi: "Sân bay Quốc tế Đà Nẵng" },
    dist: {
      en: "2.5 km · 10–15 min by car",
      vi: "2.5 km · 10–15 phút di chuyển",
    },
  },
  {
    img: "/assets/location-market.jpg",
    name: { en: "Chợ Cồn – Con Market", vi: "Chợ Cồn" },
    dist: {
      en: "850 m · Local food & shopping",
      vi: "850 m · Ẩm thực & mua sắm địa phương",
    },
  },
  {
    img: "/assets/location-bridge.jpg",
    name: { en: "Dragon Bridge", vi: "Cầu Rồng" },
    dist: {
      en: "1.3 km · Iconic landmark",
      vi: "1.3 km · Biểu tượng của Đà Nẵng",
    },
  },
];

export const pick = (obj, lang) => (typeof obj === "string" ? obj : obj[lang]);
