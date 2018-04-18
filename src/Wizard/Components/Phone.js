import React from "react";
import InputMask from "react-input-mask";

import { WizardContext } from "../Wizard.Provider.js";

export const Phone = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => (
      <div>
        <label htmlFor={`input-phone`}>Phone</label>
        <InputMask
          name={`input-${component.label}`}
          mask="(999) 999-9999"
          type={component.type}
          placeholder="Phone"
          onChange={e => updateComponentValue(component, e.target.value)}
          defaultValue={getComponentValue(component)}
        />
        {showComponentInvalidMessage(component) && (
          <div>{component.invalidMessage} </div>
        )}
      </div>
    )}
  </WizardContext.Consumer>
);
