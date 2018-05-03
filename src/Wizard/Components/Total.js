import React from "react";

import { WizardContext } from "../Wizard.Provider.js";

export const Total = ({ component }) => (
  <WizardContext.Consumer>
    {({ getTotalPrice }) => (
      <div className="c-message">
        <div className="c-total-label">Estimated Total Cost: </div>
        ${getTotalPrice()
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
      </div>
    )}
  </WizardContext.Consumer>
);
