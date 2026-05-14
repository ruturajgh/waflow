import "./App.css";
import { Editor } from "./core";
import { FlowEditor } from "./ui/ index";

function App() {
  const data = new Editor({
    version: "7.3",
    screens: [
      {
        id: "DEMO_SCREEN",
        title: "Demo Screen",
        terminal: true,
        layout: {
          type: "SingleColumnLayout",
          children: [
            {
              type: "TextHeading",
              text: "This is a heading one",
              visible: true,
            },
            {
              type: "TextSubheading",
              text: "This is a subheading",
              visible: true,
            },
            {
              type: "TextBody",
              text: "This is body text",
            },
            {
              type: "TextCaption",
              text: "This is a text caption",
            },
            {
              type: "Footer",
              label: "Continue",
              "on-click-action": {
                name: "complete",
                payload: {},
              },
            },
          ],
        },
      },
    ],
  });
  return (
    <>
      <section id="center">
        <FlowEditor.Root flowData={data}>
          <FlowEditor.Section direction="row">
            <FlowEditor.Section>
              <FlowEditor.Screens></FlowEditor.Screens>
              <FlowEditor.Nodes></FlowEditor.Nodes>
            </FlowEditor.Section>

            {/* <FlowEditor.Preview></FlowEditor.Preview> */}
          </FlowEditor.Section>
        </FlowEditor.Root>
      </section>
    </>
  );
}

export default App;
