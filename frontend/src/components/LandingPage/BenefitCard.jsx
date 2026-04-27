const TYPOGRAPHY = "font-['Playfair_Display']";

const BenefitCard = ({ icon: Icon, title, text }) => (
  <article className="group text-center p-6 md:p-8 rounded-2xl bg-[#FBF5EC] border border-[#F0E4CC] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="flex items-center justify-center mx-auto mb-5 rounded-full w-14 h-14 md:w-16 md:h-16 bg-[#F5A623] text-[#4B2E00] transition-transform group-hover:scale-110">
      <Icon size={28} strokeWidth={2} />
    </div>
    <h3 className={`font-bold mb-2 text-[#4B2E00] ${TYPOGRAPHY} text-lg`}>
      {title}
    </h3>
    <p className="text-sm text-[#6B4C2A] leading-relaxed max-w-[280px] mx-auto">
      {text}
    </p>
  </article>
);

export default BenefitCard;
