import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Section0 = ({ currentSection, setCurrentSection }) => {
  const [t] = useTranslation();

  return (
    <div>
      {currentSection === 0 && (
        <Button
          varient="primary"
          type="button"
          onClick={() => setCurrentSection(1)}>
          {t("start")}
        </Button>
      )}
    </div>
  );
};

export default Section0;
