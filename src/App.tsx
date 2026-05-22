import "./App.css";
import { Editor } from "./core";
import { FlowEditor } from "./ui/ index";

function App() {
  const data = new Editor({
    version: "7.3",
    data_api_version: "3.0",
    routing_model: {},
    screens: [
      {
        id: "DEMO_SCREEN",
        terminal: true,
        title: "Demo screen",
        data: {
          all_extras: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                title: {
                  type: "string",
                },
              },
            },
            __example__: [
              {
                id: "1",
                title: "Fries",
              },
              {
                id: "2",
                title: "Coleslaw",
              },
            ],
          },
        },
        layout: {
          type: "SingleColumnLayout",
          children: [
            {
              type: "Form",
              name: "checkbox_example_form",
              children: [{
                "type": "TextHeading",
                "text": "This is a heading",
                "visible": true
              },
              {
                "type": "TextSubheading",
                "text": "This is a subheading",
                "visible": true
              },
              {
                "type": "TextBody",
                "text": "This is body text"
              },
              {
                "type": "TextCaption",
                "text": "This is a text caption"
              },
              {
                type: "CheckboxGroup",
                name: "extras",
                label: "Extras:",
                description: "Pick something to go with your meal",
                required: true,
                "data-source": "${data.all_extras}",
                "on-select-action": {
                  name: "data_exchange",
                  payload: {
                    extras: "${form.extras}",
                  },
                },
              },
              {
                type: "Footer",
                label: "Continue",
                "on-click-action": {
                  name: "data_exchange",
                  payload: {},
                },
              },
              ],
            },
          ],
        },
      },
    ],
  });

  console.log(data.txManager.getState())
  return (
    <FlowEditor.Root flowData={data}>
      <FlowEditor.Section direction="row">
        <FlowEditor.Section>
          <FlowEditor.Screens></FlowEditor.Screens>
          <FlowEditor.Nodes></FlowEditor.Nodes>
        </FlowEditor.Section>

        {/* <FlowEditor.Preview></FlowEditor.Preview> */}
      </FlowEditor.Section>
    </FlowEditor.Root>
  );
}

export default App;
