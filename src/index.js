import React from "react";
import { render } from "react-dom";
import { WizardProvider, Wizard, Step } from "./Wizard";

const App = () => (
  <WizardProvider>
    <Wizard>
      <Step />
    </Wizard>
  </WizardProvider>
);

render(<App />, document.getElementById("root"));
