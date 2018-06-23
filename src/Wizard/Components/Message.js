import React from "react";
import { WizardContext } from "../Wizard.Provider";

class Message extends React.Component {
  state = {
    editText: false,
    text: ""
  };

  componentDidMount() {
    if (this.props.component.value) {
      this.setState({
        text: this.props.component.value
      });
    }
  }

  editText = () => {
    this.setState({
      editText: true
    });
  };

  updateComponentText = (component, callback) => {
    if (this.state.text) {
      callback(component, {
        ...component,
        value: this.state.text
      });
    }
    this.setState({
      editText: false
    });
  };

  render() {
    const component = this.props.component;
    const { editText } = this.state;

    return (
      <WizardContext.Consumer>
        {({ updateAppProductState }) => (
          <React.Fragment>
            {!editText && (
              <React.Fragment>
                <div className="c-message">{component.value}</div>
                <button
                  type="button"
                  className="btn-edit full-width btn-bigger"
                  onClick={() => this.editText()}
                >
                  Edit Text
                </button>
              </React.Fragment>
            )}

            {editText && (
              <React.Fragment>
                <input
                  type="text"
                  className="c-form-input"
                  defaultValue={component.value}
                  onChange={e => {
                    this.setState({
                      text: e.target.value
                    });
                  }}
                />

                <button
                  type="button"
                  className="btn-save"
                  onClick={() =>
                    this.updateComponentText(component, updateAppProductState)
                  }
                >
                  Save Text
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </WizardContext.Consumer>
    );
  }
}

export { Message };
