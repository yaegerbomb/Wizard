import React from "react";

import { WizardContext } from "../Wizard.Provider.js";

export const Link = ({ component }) => (
  <WizardContext.Consumer>
    {({ updateComponentValue, showComponentInvalidMessage }) => (
      <div>
        <a
          href={component.url}
          target="_blank"
          onClick={() => updateComponentValue(component, true)}
        >
          {component.label}
        </a>
        {showComponentInvalidMessage(component) && (
          <div>{component.invalidMessage} </div>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
