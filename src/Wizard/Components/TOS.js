import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { WizardContext } from "../Wizard.Provider.js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

var tosBox = {
  border: "1px solid black",
  padding: "5px",
  backgroundColor: "white",
  maxHeight: "300px",
  overflowY: "scroll"
};

class TOS extends React.Component {
  state = {
    text: "",
    editLabel: false,
    editText: false,
    editorState: EditorState.createEmpty()
  };

  updateComponentStateDescription = (component, callback) => {
    const newText = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    if (newText) {
      callback(component, {
        ...component,
        text: newText
      });
    }

    this.setState({
      editText: false
    });
  };

  editTOS = () => {
    this.setState({
      editText: true
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState: editorState
    });
  };

  componentDidMount() {
    if (this.props.component.text) {
      let html = this.props.component.text;
      const contentBlock = htmlToDraft(html);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );

        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState,
          text: this.props.component.text
        });
      }
    }
  }

  render() {
    const component = this.props.component;
    const { editText, editorState } = this.state;
    return (
      <WizardContext.Consumer>
        {({
          getComponentValue,
          updateComponentValue,
          updateAppProductState
        }) => (
            <div>
              {!editText && (
                <React.Fragment>
                  <div style={tosBox}>
                    <div dangerouslySetInnerHTML={{ __html: component.text }} />
                  </div>
                  <button
                    type="button"
                    className="btn-edit description"
                    onClick={() => this.editTOS()}
                  >
                    Edit Description
                </button>
                </React.Fragment>
              )}
              {editText && (
                <React.Fragment>
                  <div style={tosBox}>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() =>
                      this.updateComponentStateDescription(
                        component,
                        updateAppProductState
                      )
                    }
                  >
                    Save TOS
                </button>
                </React.Fragment>
              )}
              <div
                className={
                  getComponentValue(component)
                    ? "tos-accept selected"
                    : "tos-accept"
                }
              >
                <label>
                  I Accept
                <input
                    name="accept"
                    type="checkbox"
                    checked={getComponentValue(component)}
                    onChange={e =>
                      updateComponentValue(component, e.target.checked)
                    }
                  />
                </label>
              </div>
            </div>
          )}
      </WizardContext.Consumer>
    );
  }
}

export { TOS };
