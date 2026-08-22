import React, { useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Position,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const RoadmapFlow = () => {
  const milestones = [
    { label: "Billet", color: "#d74f28" },
    { label: "Heating Furnace", color: "#1abc9c" },
    { label: "Piercing", color: "#5a54c5" },
    { label: "Re-Heating Furnace", color: "#f4a02b" },
    { label: "Straightening", color: "#e41c7c" },
    { label: "ECT", color: "#3498db" },
    { label: "Hydro Testing", color: "#16a085" },
    { label: "Visual Inspection", color: "#9b59b6" },
  ];

  const spacingY = 180;
  const offsetX = 100;
  const nodeWidth = 260;
  const nodeHeight = 100;

  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setCanvasWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = canvasWidth <= 768;
  const centerX = canvasWidth / 2 - nodeWidth / 2;

  const nodes: Node[] = milestones.map((m, i) => {
    const isLeft = i % 2 === 0;

    const x = isMobile
      ? centerX
      : centerX + (isLeft ? -offsetX : offsetX);

    return {
      id: `node-${i}`,
      data: { label: m.label },
      position: {
        x,
        y: i * spacingY,
      },
      draggable: false,
      width: nodeWidth,
      height: nodeHeight,
      style: {
        background: m.color,
        color: "#fff",
        borderRadius: 12,
        fontWeight: "bold",
        padding: 10,
        whiteSpace: "pre-line",
        width: nodeWidth,
        height: nodeHeight,
        textAlign: "center",
        alignContent: "center",
        pointerEvents: "none",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        fontSize: 15,
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
  });

  const edges: Edge[] = milestones.slice(1).map((_, i) => ({
    id: `edge-${i}`,
    source: `node-${i}`,
    target: `node-${i + 1}`,
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 2,
      stroke: milestones[i].color,
      pointerEvents: "none",
    },
  }));

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", overflowX: "hidden" }}>
        {/* Heading */}


        <div
          style={{
            width: canvasWidth,
            height: milestones.length * spacingY + 200,
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            panOnScroll={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            elementsSelectable={false}
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            preventScrolling={false}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "30px 0 50px",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "28px 60px",
            }}
          >
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                rx="12"
                ry="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-160"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>

            <div
              style={{
                position: "relative",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                PACKING & DISPATCH
              </h2>
            </div>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default RoadmapFlow;