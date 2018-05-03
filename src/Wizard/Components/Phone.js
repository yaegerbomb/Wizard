import React from "react";
import InputMask from "react-input-mask";
import slugify from "../../Utils/slugify";

import { WizardContext } from "../Wizard.Provider.js";

export const Phone = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => {
      const id = slugify(component.label);
      return (
        <div className="c-form-group contact-input">
          <label className="c-form-label" htmlFor={id}>
            Phone
          </label>
          <InputMask
            id={id}
            mask="(999) 999-9999"
            className="c-form-input"
            type={component.type}
            placeholder="Phone"
            onChange={e => updateComponentValue(component, e.target.value)}
            value={getComponentValue(component)}
            disabled={component.disabled}
          />
          {showComponentInvalidMessage(component) && (
            <div>{component.invalidMessage} </div>
          )}
        </div>
      );
    }}
  </WizardContext.Consumer>
);
