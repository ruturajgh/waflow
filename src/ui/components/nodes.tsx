export const Nodes = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        flex: 1,

        // CRITICAL
        minHeight: 0,
        minWidth: 0,

        border: "2px solid",
        borderRadius: "13px",

        overflow: "hidden",
      }}
    >
      {/* fixed header */}
      <div
        style={{
          padding: "13px",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        Nodes layer for whatsapp flows
      </div>

      {/* scroll area */}
      <div
        style={{
          flex: 1,

          // CRITICAL
          minHeight: 0,

          overflowY: "auto",
          overflowX: "hidden",

          padding: "13px",

          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export const AddNode = (props: any) => {
  return <div></div>;
};
