import React from "react";

import { Navigator } from "./Wizard.Navigator";
import { WizardStepButtons } from "./Wizard.Step.Buttons";
import Step from "./Wizard.Step";

export const Wizard = () => (
  <React.Fragment>
    <Navigator />
    <Step />
    <WizardStepButtons />
  </React.Fragment>
);

export default Wizard;
