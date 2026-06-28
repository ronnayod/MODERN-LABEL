import { ref } from 'vue'

export const currentLang = ref(localStorage.getItem('lang') || 'EN')

export const toggleLang = () => {
  currentLang.value = currentLang.value === 'EN' ? 'TH' : 'EN'
  localStorage.setItem('lang', currentLang.value)
}

const translations = {
  // NavBar
  'NEW IN': { EN: 'NEW IN', TH: 'มาใหม่' },
  'MEN': { EN: 'MEN', TH: 'ผู้ชาย' },
  'WOMEN': { EN: 'WOMEN', TH: 'ผู้หญิง' },
  'ALL CATEGORIES': { EN: 'ALL CATEGORIES', TH: 'หมวดหมู่ทั้งหมด' },
  'ALL PRODUCTS': { EN: 'ALL PRODUCTS', TH: 'สินค้าทั้งหมด' },
  'SHIRTS & T-SHIRTS': { EN: 'SHIRTS & T-SHIRTS', TH: 'เสื้อยืด & เสื้อเชิ้ต' },
  'HOODIES & SWEATERS': { EN: 'HOODIES & SWEATERS', TH: 'เสื้อฮู้ด & เสื้อกันหนาว' },
  'TROUSERS & SKIRTS': { EN: 'TROUSERS & SKIRTS', TH: 'กางเกง & กระโปรง' },
  'GENDER COLLECTIONS': { EN: 'GENDER COLLECTIONS', TH: 'คอลเลกชันตามเพศ' },
  "MEN'S COLLECTION": { EN: "MEN'S COLLECTION", TH: 'คอลเลกชันผู้ชาย' },
  "WOMEN'S COLLECTION": { EN: "WOMEN'S COLLECTION", TH: 'คอลเลกชันผู้หญิง' },
  "MEN'S CATEGORIES": { EN: "MEN'S CATEGORIES", TH: 'หมวดหมู่สินค้าผู้ชาย' },
  "ALL MEN'S PRODUCTS": { EN: "ALL MEN'S PRODUCTS", TH: 'สินค้าผู้ชายทั้งหมด' },
  'TROUSERS': { EN: 'TROUSERS', TH: 'กางเกง' },
  'SHOP BY PRODUCT': { EN: 'SHOP BY PRODUCT', TH: 'ช้อปตามประเภทสินค้า' },
  'T-SHIRTS': { EN: 'T-SHIRTS', TH: 'เสื้อยืด' },
  'T-SHIRT': { EN: 'T-SHIRT', TH: 'เสื้อยืด' },
  'HOODIES': { EN: 'HOODIES', TH: 'เสื้อฮู้ด' },
  'CASUAL TROUSERS': { EN: 'CASUAL TROUSERS', TH: 'กางเกงลำลอง' },
  "WOMEN'S CATEGORIES": { EN: "WOMEN'S CATEGORIES", TH: 'หมวดหมู่สินค้าผู้หญิง' },
  "ALL WOMEN'S PRODUCTS": { EN: "ALL WOMEN'S PRODUCTS", TH: 'สินค้าผู้หญิงทั้งหมด' },
  'SKIRTS': { EN: 'SKIRTS', TH: 'กระโปรง' },
  'JEANS': { EN: 'JEANS', TH: 'กางเกงยีนส์' },
  'SHORTS': { EN: 'SHORTS', TH: 'กางเกงขาสั้น' },
  'NEW SEASON': { EN: 'NEW SEASON', TH: 'ฤดูกาลใหม่' },
  'STREETWEAR DROPS 2026': { EN: 'STREETWEAR DROPS 2026', TH: 'สตรีทแวร์ดรอป 2026' },
  'EXPLORE LATEST ARRIVALS': { EN: 'EXPLORE LATEST ARRIVALS', TH: 'สำรวจสินค้ามาใหม่' },
  'STREETWEAR MEN': { EN: 'STREETWEAR MEN', TH: 'สตรีทแวร์ผู้ชาย' },
  "EXPLORE MEN'S COLLECTION": { EN: "EXPLORE MEN'S COLLECTION", TH: 'สำรวจคอลเลกชันผู้ชาย' },
  'VIEW ALL PRODUCTS': { EN: 'VIEW ALL PRODUCTS', TH: 'ดูสินค้าทั้งหมด' },
  'STREETWEAR WOMEN': { EN: 'STREETWEAR WOMEN', TH: 'สตรีทแวร์ผู้หญิง' },
  "EXPLORE WOMEN'S COLLECTION": { EN: "EXPLORE WOMEN'S COLLECTION", TH: 'สำรวจคอลเลกชันผู้หญิง' },
  'WHAT ARE YOU LOOKING FOR?': { EN: 'WHAT ARE YOU LOOKING FOR?', TH: 'คุณกำลังมองหาอะไรอยู่?' },
  'POPULAR SEARCHES': { EN: 'POPULAR SEARCHES', TH: 'คำค้นหายอดนิยม' },
  '#HOODIE': { EN: '#HOODIE', TH: '#เสื้อฮู้ด' },
  '#CARGO PANTS': { EN: '#CARGO PANTS', TH: '#กางเกงคาร์โก้' },
  '#OVERSIZED T-SHIRT': { EN: '#OVERSIZED T-SHIRT', TH: '#เสื้อยืดโอเวอร์ไซส์' },
  '#JACKETS': { EN: '#JACKETS', TH: '#เสื้อแจ็คเก็ต' },
  'ACCOUNT': { EN: 'ACCOUNT', TH: 'บัญชีผู้ใช้' },
  'WISHLIST': { EN: 'WISHLIST', TH: 'รายการโปรด' },
  'LANGUAGE': { EN: 'LANGUAGE', TH: 'ภาษา' },

  // HomePage
  'NEW PRODUCT': { EN: 'NEW PRODUCT', TH: 'สินค้ามาใหม่' },
  'A series of all items available in the online shop': {
    EN: 'A series of all items available in the online shop',
    TH: 'ซีรีส์สินค้าทั้งหมดที่มีจำหน่ายในร้านค้าออนไลน์'
  },
  'See All →': { EN: 'See All →', TH: 'ดูทั้งหมด →' },
  'CHOOSE YOUR STYLE': { EN: 'CHOOSE YOUR STYLE', TH: 'เลือกสไตล์ของคุณ' },
  'Design how many way to beautiful in your own way': {
    EN: 'Design how many way to beautiful in your own way',
    TH: 'ออกแบบความสวยงามในแบบของคุณเอง'
  },
  'DESIGN LIFE BY DRESSING UP': { EN: 'DESIGN LIFE BY DRESSING UP', TH: 'ออกแบบชีวิตด้วยการแต่งตัว' },
  'Combine creative ideas to be unique to yourself': {
    EN: 'Combine creative ideas to be unique to yourself',
    TH: 'ผสมผสานความคิดสร้างสรรค์ให้เป็นเอกลักษณ์ในแบบของคุณเอง'
  },
  'Shop now': { EN: 'Shop now', TH: 'ช้อปเลย' },
  'SHOPPING FOR YOUR LOVED ONES': { EN: 'SHOPPING FOR YOUR LOVED ONES', TH: 'ช้อปปิ้งเพื่อคนที่คุณรัก' },
  'Find the perfect gift from our curated collections': {
    EN: 'Find the perfect gift from our curated collections',
    TH: 'ค้นหาของขวัญที่สมบูรณ์แบบจากคอลเลกชันที่คัดสรรมาของเรา'
  },
  'Latest collection': { EN: 'Latest collection', TH: 'คอลเลกชันล่าสุด' },
  "Women's collection": { EN: "Women's collection", TH: 'คอลเลกชันผู้หญิง' },
  "Men's collection": { EN: "Men's collection", TH: 'คอลเลกชันผู้ชาย' },

  // CategoryPage
  'ALL': { EN: 'ALL', TH: 'ทั้งหมด' },
  'SHIRT': { EN: 'SHIRT', TH: 'เสื้อยืด & เสื้อเชิ้ต' },
  'TROUSERS': { EN: 'TROUSERS', TH: 'กางเกง' },
  'TROUSERS&SKIRTS': { EN: 'TROUSERS & SKIRTS', TH: 'กางเกง & กระโปรง' },
  'HOODIE': { EN: 'HOODIE', TH: 'เสื้อฮู้ด' },
  'No products found in this category.': {
    EN: 'No products found in this category.',
    TH: 'ไม่พบสินค้าในหมวดหมู่นี้'
  },

  // Breadcrumb
  'HOME': { EN: 'HOME', TH: 'หน้าแรก' },

  // ProductDetail
  'Back': { EN: 'Back', TH: 'ย้อนกลับ' },
  'Select Size': { EN: 'Select Size', TH: 'เลือกขนาด' },
  'Select Color': { EN: 'Select Color', TH: 'เลือกสี' },
  'Add to Cart': { EN: 'Add to Cart', TH: 'เพิ่มลงตะกร้า' },
  'Product Details': { EN: 'Product Details', TH: 'รายละเอียดสินค้า' },
  'สินค้าที่เกี่ยวข้อง': { EN: 'Related Products', TH: 'สินค้าที่เกี่ยวข้อง' },
  'สินค้าแนะนำ': { EN: 'Recommended Products', TH: 'สินค้าแนะนำ' },
  'ตารางขนาดสินค้า': { EN: 'Size Chart', TH: 'ตารางขนาดสินค้า' },
  'ขนาด': { EN: 'Size', TH: 'ขนาด' },

  // CartOffcanvas
  'SHOPPING CART': { EN: 'SHOPPING CART', TH: 'ตะกร้าสินค้า' },
  'Your cart is empty': { EN: 'Your cart is empty', TH: 'ตะกร้าสินค้าของคุณว่างเปล่า' },
  'Continue Shopping': { EN: 'Continue Shopping', TH: 'ช้อปปิ้งต่อ' },
  'CHECKOUT': { EN: 'Make a payment', TH: 'ชำระเงิน' },
  'Subtotal': { EN: 'Subtotal', TH: 'ยอดรวม' },
  'Remove': { EN: 'Remove', TH: 'ลบ' },
  'Size': { EN: 'Size', TH: 'ขนาด' },
  'Color': { EN: 'Color', TH: 'สี' },
  'Colors Available': { EN: 'Colors Available', TH: 'สีที่มีจำหน่าย' },
  'Add To Bag': { EN: 'Add To Bag', TH: 'เพิ่มลงตะกร้า' },
  'Favorite': { EN: 'Favorite', TH: 'รายการโปรด' },
  'Detail Size': { EN: 'Size Details', TH: 'รายละเอียดขนาด' },
  'Product not found': { EN: 'Product not found', TH: 'ไม่พบสินค้า' },
  "The product you're looking for doesn't exist or has been removed.": {
    EN: "The product you're looking for doesn't exist or has been removed.",
    TH: 'สินค้าที่คุณกำลังมองหาไม่มีอยู่จริงหรือถูกลบออกแล้ว'
  },
  'Back to Home': { EN: 'Back to Home', TH: 'กลับสู่หน้าหลัก' },
  'Start shopping now!': { EN: 'Start shopping now!', TH: 'เริ่มช้อปปิ้งเลย!' },
  'YOUR CART': { EN: 'YOUR CART', TH: 'ตะกร้าสินค้าของคุณ' },
  'TOTAL': { EN: 'TOTAL', TH: 'ยอดรวม' },

  // FooterSection
  'Premium Streetwear & Urban Fashion': {
    EN: 'Premium Streetwear & Urban Fashion',
    TH: 'เสื้อผ้าสตรีทแวร์และแฟชั่นแนวสตรีทระดับพรีเมียม'
  },
  'CLOTHING AND APPAREL': { EN: 'CLOTHING AND APPAREL', TH: 'เสื้อผ้าและเครื่องแต่งกาย' },
  'KIDS': { EN: 'KIDS', TH: 'เด็ก' },
  'MAN': { EN: 'MEN', TH: 'ผู้ชาย' },
  'PRODUCT CHARACTERISTICS': { EN: 'PRODUCT CHARACTERISTICS', TH: 'คุณสมบัติของผลิตภัณฑ์' },
  'FREE SHIPPING': { EN: 'FREE SHIPPING', TH: 'จัดส่งฟรี' },
  'PRE-ORDER': { EN: 'PRE-ORDER', TH: 'สั่งซื้อล่วงหน้า' },
  'FOLLOW US AT': { EN: 'FOLLOW US AT', TH: 'ติดตามเราได้ที่' },
  'All rights reserved.': { EN: 'All rights reserved.', TH: 'สงวนลิขสิทธิ์ทั้งหมด' },
  'YOUR WISHLIST': { EN: 'YOUR WISHLIST', TH: 'รายการโปรดของคุณ' },
  'Your wishlist is empty': { EN: 'Your wishlist is empty', TH: 'รายการโปรดของคุณว่างเปล่า' },
  'CLOSE': { EN: 'CLOSE', TH: 'ปิด' },
  'View Details': { EN: 'View Details', TH: 'ดูรายละเอียด' },
  'SEARCH RESULTS FOR': { EN: 'SEARCH RESULTS FOR', TH: 'ผลการค้นหาสำหรับ' },
  'LOGIN': { EN: 'Log In', TH: 'เข้าสู่ระบบ' },
  'LOGOUT': { EN: 'Log Out', TH: 'ออกจากระบบ' },
  'USERNAME': { EN: 'Username', TH: 'ชื่อผู้ใช้' },
  'PASSWORD': { EN: 'Password', TH: 'รหัสผ่าน' },
  'FULL NAME': { EN: 'Full Name', TH: 'ชื่อ - นามสกุล' },
  'PHONE NUMBER': { EN: 'Phone Number', TH: 'เบอร์โทรศัพท์' },
  'SHIPPING ADDRESS': { EN: 'Shipping Address', TH: 'ที่อยู่สำหรับจัดส่ง' },
  'SAVE CHANGES': { EN: 'Save Changes', TH: 'บันทึกการเปลี่ยนแปลง' },
  'MY ACCOUNT': { EN: 'My Account', TH: 'บัญชีของฉัน' },
  'WELCOME BACK': { EN: 'Welcome Back', TH: 'ยินดีต้อนรับกลับมา' },
  'PROFILE UPDATED SUCCESSFULLY!': { EN: 'Profile updated successfully!', TH: 'บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว!' },
  'PROMPTPAY QR PAYMENT': { EN: 'PromptPay QR Payment', TH: 'ชำระเงินผ่าน PromptPay QR' },
  'SCAN TO PAY': { EN: 'Scan QR Code to Pay', TH: 'สแกน QR Code เพื่อชำระเงิน' },
  'DOWNLOAD QR': { EN: 'Download QR Code', TH: 'ดาวน์โหลด QR Code' },
  'CONFIRM PAYMENT': { EN: 'I have paid', TH: 'ฉันชำระเงินเรียบร้อยแล้ว' },
  'PAYMENT SUCCESSFUL': { EN: 'Payment Successful! Thank you.', TH: 'ชำระเงินสำเร็จ! ขอบคุณสำหรับการสั่งซื้อ' },
  'ORDER TOTAL': { EN: 'Order Total', TH: 'ยอดชำระเงินทั้งหมด' }
}

export const t = (key) => {
  if (!key) return ''
  const upperKey = key.toUpperCase()
  if (translations[upperKey]) {
    return translations[upperKey][currentLang.value]
  }
  if (translations[key]) {
    return translations[key][currentLang.value]
  }
  return key
}

export const translateSizeDetail = (detailStr) => {
  if (!detailStr) return ''
  if (currentLang.value === 'TH') {
    return detailStr
      .replace(/Chest/g, 'อก')
      .replace(/Length/g, 'ยาว')
      .replace(/Waist/g, 'เอว')
      .replace(/Hips/g, 'สะโพก')
  }
  
  return detailStr
    .replace(/อก/g, 'Chest ')
    .replace(/ยาว/g, ' Length ')
    .replace(/เอว/g, 'Waist ')
    .replace(/สะโพก/g, ' Hips ')
}
