import React from "react";

import { WizardContext } from "../Wizard.Provider.js";
import slugify from "../../Utils/slugify.js";

class Email extends React.Component {
  state = {
    editLabel: false,
    label: ""
  };

  componentDidMount() {
    if (this.props.component.label) {
      this.setState({
        label: this.props.component.label
      });
    }
  }

  editLabel = () => {
    this.setState({
      editLabel: true
    });
  };

  updateComponentLabel = (component, callback) => {
    if (this.state.label) {
      callback(component, {
        ...component,
        label: this.state.label
      });
    }
    this.setState({
      editLabel: false
    });
  };
  render() {
    const component = this.props.component;
    const { editLabel } = this.state;
    return (
      <WizardContext.Consumer>
        {({
          getComponentValue,
          updateComponentValue,
          showComponentInvalidMessage,
          updateAppProductState
        }) => {
          let id = slugify(component.label);
          return (
            <div className="c-form-group contact-input">
              {!editLabel && (
                <React.Fragment>
                  <label className="c-form-label" htmlFor={id}>
                    {component.label}
                  </label>
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => this.editLabel()}
                  >
                    Edit Label
                  </button>
                </React.Fragment>
              )}
              {editLabel && (
                <React.Fragment>
                  <input
                    type="text"
                    className="c-form-input"
                    defaultValue={component.label}
                    onChange={e => {
                      this.setState({
                        label: e.target.value
                      });
                    }}
                  />

                  <button
                    type="button"
                    className="btn-save"
                    onClick={() =>
                      this.updateComponentLabel(
                        component,
                        updateAppProductState
                      )
                    }
                  >
                    Save Label
                  </button>
                </React.Fragment>
              )}
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
                <div className="invalid">{component.invalidMessage} </div>
              )}
            </div>
          );
        }}
      </WizardContext.Consumer>
    );
  }
}

export { Email };
