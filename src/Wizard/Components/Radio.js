import React from "react";
import slugify from "../../Utils/slugify";

import { WizardContext } from "../Wizard.Provider.js";

export const Radio = ({ component }) => (
  <WizardContext.Consumer>
    {({ getComponentValue, updateComponentValue }) => {
      let defaultValue = getComponentValue(component);
      return (
        <div>
          {component.values.map((v, key) => {
            const id = slugify(v.label);
            const hiddenStyle = v.hidden ? { display: "none" } : {};
            return (
              <div key={`r-${key}`} style={hiddenStyle}>
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
