import React from "react";

import { WizardContext } from "./Wizard.Provider.js";

export const WizardStepButtons = () => (
  <WizardContext.Consumer>
    {({
      state,
      decrementStep,
      incrementStep,
      isStepValid,
      isFirstStep,
      isLastStep,
      submit
    }) => (
      <div className="button-steps">
        <button
          className="button"
          type="button"
          onClick={decrementStep}
          disabled={isFirstStep()}
        >
          Previous
        </button>
        {!isLastStep() && (
          <button
            type="button"
            className="button"
            disabled={!isStepValid(state.currentStep)}
            onClick={incrementStep}
          >
            Next
          </button>
        )}
        {isLastStep() && (
          <button
            className="button"
            type="button"
            disabled={!isStepValid(state.currentStep) || state.submitted}
            onClick={submit}
          >
            Submit
          </button>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
