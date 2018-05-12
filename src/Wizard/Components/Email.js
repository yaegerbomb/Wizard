import React from "react";

import { WizardContext } from "../Wizard.Provider.js";
import slugify from "../../Utils/slugify.js";

export const Email = ({ component }) => (
  <WizardContext.Consumer>
    {({
      getComponentValue,
      updateComponentValue,
      showComponentInvalidMessage
    }) => {
      let id = slugify(component.label);
      return (
        <div className="c-form-group contact-input">
          <label className="c-form-label" htmlFor={id}>
            {component.label}
          </label>
          <input
            className="c-form-input"
            id={id}
            type="email"
            placeholder={component.placeholder ? component.placeholder : ""}
            onChange={e => updateComponentValue(component, e.target.value)}
            value={getComponentValue(component)}
            disabled={component.disabled}
          />
          {showComponentInvalidMessage(component) && (
            <div class="invalid">{component.invalidMessage} </div>
          )}
        </div>
      );
    }}
  </WizardContext.Consumer>
);
