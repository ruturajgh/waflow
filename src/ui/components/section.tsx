type SectionProps = {
  children?: React.ReactNode;

  direction?: "row" | "column";
  gap?: number | string;

  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];

  wrap?: React.CSSProperties["flexWrap"];

  style?: React.CSSProperties;
};

export const Section = ({
  children,

  direction = "column",
  gap = 12,

  align = "stretch",
  justify = "flex-start",

  wrap = "nowrap",

  style,
}: SectionProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap,

        alignItems: align,
        justifyContent: justify,

        flexWrap: wrap,

        // KEY
        flex: 1,

        // KEY
        minHeight: 0,
        minWidth: 0,

        width: "100%",

        boxSizing: "border-box",

        overflow: "hidden",

        ...style,
      }}
    >
      {children}
    </div>
  );
};
