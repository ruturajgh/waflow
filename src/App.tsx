import "./App.css";
import { FlowEditor } from "./ui/ index";

function App() {
  return (
    <>
      <section id="center">
        <FlowEditor.Root>
          <FlowEditor.Section direction="row">
            <FlowEditor.Section>
              <FlowEditor.Screens></FlowEditor.Screens>
              <FlowEditor.Components></FlowEditor.Components>
            </FlowEditor.Section>

            <FlowEditor.Preview></FlowEditor.Preview>
          </FlowEditor.Section>
        </FlowEditor.Root>
      </section>
    </>
  );
}

export default App;
