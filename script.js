// ضع رقم واتساب الخاص بالشغل هنا بصيغة دولية بدون + أو مسافات.
// مثال مصر: 2010XXXXXXXX
const WHATSAPP_NUMBER = "201063038155";

const langToggle = document.getElementById("langToggle");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
let currentLang = "ar";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll("[data-ar-html][data-en-html]").forEach(el => {
    el.innerHTML = el.dataset[lang + "Html"];
  });
  document.querySelectorAll("[data-placeholder-ar][data-placeholder-en]").forEach(el => {
    el.placeholder = el.dataset["placeholder" + (lang === "ar" ? "Ar" : "En")];
  });
  langToggle.textContent = lang === "ar" ? "EN" : "عربي";
}
langToggle.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("projectForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const name = data.get("name").trim();
  const business = data.get("business");
  const service = data.get("service");
  const details = data.get("details").trim();
  const isArabic = currentLang === "ar";
  const message = isArabic
    ? `طلب مشروع جديد - SHAARAWY TECH\n\nالاسم: ${name}\nنوع النشاط: ${business}\nالخدمة المطلوبة: ${service}\nتفاصيل الفكرة: ${details}`
    : `New Project Request - SHAARAWY TECH\n\nName: ${name}\nBusiness type: ${business}\nService: ${service}\nIdea details: ${details}`;
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "201000000000") {
    alert(isArabic
      ? "الموقع جاهز، لكن لازم تحط رقم واتساب الشغل في ملف script.js بدل الرقم التجريبي قبل استقبال الطلبات."
      : "The website is ready, but add your business WhatsApp number in script.js before receiving requests.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
