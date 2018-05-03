import React from "react";
import slugify from "../../Utils/slugify";

import { WizardContext } from "../Wizard.Provider";

export const Product = ({ component }) => {
  const id = slugify(component.label);
  let productClass = "c-product";
  let productButton = "button";

  if (component.selected) {
    productClass += " selected";
    productButton += " button-remove";
  } else {
    productButton += " button-add";
  }

  return (
    <WizardContext.Consumer>
      {({ toggleProduct, toggleQuantityProduct }) => (
        <div className={productClass}>
          <div className="c-product-title">{component.label}</div>
          <div
            className="c-product-description"
            dangerouslySetInnerHTML={{
              __html: component.description
            }}
          />
          {component.byGlobal && (
            <button
              className={productButton}
              type="button"
              onClick={() => toggleProduct(component)}
            >
              {component.selected ? "Remove" : "Add"}
            </button>
          )}
          {!component.byGlobal && (
            <div className="c-form-group contact-input">
              <label className="c-form-label" htmlFor={id}>
                {component.otherValueLabel}
              </label>
              <input
                id={id}
                className="c-form-input"
                name={`product-${component.label}`}
                type="number"
                defaultValue={component.otherQuantity}
                onChange={e => toggleQuantityProduct(component, e.target.value)}
              />
            </div>
          )}
        </div>
      )}
    </WizardContext.Consumer>
  );
};
