import React from "react";
import slugify from "../../Utils/slugify";

import { WizardContext } from "../Wizard.Provider.js";

export const Radio = ({ component }) => (
  <WizardContext.Consumer>
    {({ getComponentValue, updateComponentValue }) => {
      let defaultValue = getComponentValue(component);
      return (
        <div>
          <label htmlFor={`input-${component.label}`}>{component.label}</label>

          {component.values.map((v, key) => {
            const id = slugify(v.label);
            return (
              <div key={`r-${key}`}>
                <input
                  type="radio"
                  value={v.value}
                  placeholder=""
                  onChange={e =>
                    updateComponentValue(component, e.currentTarget.value)
                  }
                  defaultChecked={defaultValue === v.value}
                  name={component.label}
                  id={id}
                />
                <label htmlFor={id}>{v.label}</label>
              </div>
            );
          })}
        </div>
      );
    }}
  </WizardContext.Consumer>
);
