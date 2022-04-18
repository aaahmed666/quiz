import React from "react";
import { useTranslation } from "react-i18next";

const Section3 = ({ currentSection, error }) => {
  const [t] = useTranslation();
  return (
    <>
      {currentSection === 3 && (
        <section>
          <h2>{t("success")}</h2>
        </section>
      )}
    </>
  );
};

export default Section3;
