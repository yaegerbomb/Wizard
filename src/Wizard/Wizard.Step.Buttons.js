import React from "react";

import { WizardContext } from "./Wizard.Provider.js";

export const WizardStepButtons = () => (
  <WizardContext.Consumer>
    {({ state, decrementStep, incrementStep, isStepValid }) => (
      <div>
        <button type="button" onClick={decrementStep}>
          Previous
        </button>
        <button
          type="button"
          disabled={!isStepValid(state.currentStep)}
          onClick={incrementStep}
        >
          Next
        </button>
      </div>
    )}
  </WizardContext.Consumer>
);