import { CheckboxGroup } from "./CheckboxGroup";
import { Footer } from "./Footer";
import { FormNodeRenderer } from "./Form";
import { TextBody } from "./TextBody";
import { TextCaption } from "./TextCaption";
import { TextHeading } from "./TextHeading";
import { TextSubheading } from "./TextSubheading";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  Form: FormNodeRenderer,
  TextHeading,
  TextSubheading,
  TextBody,
  TextCaption,
  CheckboxGroup,
  Footer,
};
