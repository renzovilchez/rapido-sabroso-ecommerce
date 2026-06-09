import { TYPOGRAPHY } from "../../utils/constants";

const SectionTitle = ({ children }) => (
  <h2
    className={`text-center font-bold mb-12 text-[#4B2E00] ${TYPOGRAPHY} text-3xl md:text-4xl lg:text-[2.75rem] leading-tight`}
  >
    {children}
  </h2>
);

export default SectionTitle;
