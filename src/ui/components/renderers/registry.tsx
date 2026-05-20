import { Footer } from "./Footer";
import { TextBody } from "./TextBody";
import { TextCaption } from "./TextCaption";
import { TextHeading } from "./TextHeading";
import { TextSubheading } from "./TextSubheading";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  TextHeading,
  TextSubheading,
  TextBody,
  TextCaption,
  Footer,
};
