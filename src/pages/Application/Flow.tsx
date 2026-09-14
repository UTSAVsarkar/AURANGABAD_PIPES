import React, { useState, useRef, useEffect } from "react";

interface Stage {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    tag: string;
    title: string;
    hot?: boolean;
    output?: boolean;
    desc: string;
}

const STAGES: Stage[] = [
    { id: "billet", x: 450, y: 60, w: 160, h: 62, tag: "01 · Input", title: "Billet", desc: "A solid, round steel billet is cut to length and inspected before entering the furnace. Its diameter sets the starting point for the whole size range downstream." },
    { id: "furnace1", x: 450, y: 178, w: 210, h: 62, tag: "02 · Thermal", title: "Heating Furnace", hot: true, desc: "The billet is heated to roughly 1,200–1,280°C, hot enough to make the steel plastic without melting it, ahead of piercing." },
    { id: "pierce", x: 450, y: 296, w: 185, h: 62, tag: "03 · Forming", title: "Piercing", desc: "A rotary piercing mill drives a plug through the center of the hot billet, converting the solid bar into a hollow shell in one pass." },
    { id: "furnace2", x: 450, y: 414, w: 230, h: 62, tag: "04 · Thermal", title: "Re-Heating Furnace", hot: true, desc: "The hollow shell is reheated to the correct temperature for elongation rolling, since piercing alone cools and stresses the steel." },
    { id: "sizing", x: 450, y: 532, w: 210, h: 62, tag: "05 · Forming", title: "Sizing", desc: "A sizing mill rolls the reheated hollow shell down to its final outside diameter and wall thickness. This step effectively fixes the tube's finished dimensions — the resulting mother hollow is already at hot-finished (HFS) tolerance, which is why the HFS route needs only straightening afterward." },
    { id: "cooling", x: 450, y: 650, w: 210, h: 62, tag: "06 · Thermal", title: "Cooling Bed", desc: "The sized tube passes over a cooling bed and air-cools at a controlled speed — no water quench. This lets the steel cool evenly so the correct microstructure sets before straightening or cold drawing." },
    { id: "mother", x: 450, y: 768, w: 250, h: 66, tag: "07 · Intermediate", title: "Mother Hollow Tube", output: true, desc: "This is the common intermediate product for the whole plant — every finished tube, hot finished or cold drawn, starts from a mother hollow tube of this size." },
    { id: "str1", x: 260, y: 1066, w: 185, h: 62, tag: "08 · HFS", title: "Straightening", desc: "Fresh off the sizing mill, the hot finished tube passes through a straightener to correct ovality and camber picked up during rolling." },
    { id: "hfs", x: 260, y: 1172, w: 185, h: 66, tag: "09 · HFS Output", title: "HFS Tubes", output: true, desc: "Hot Finished Seamless tubes — finished directly from the hot-rolling line with no cold work, suited to structural and lower-tolerance applications." },
    { id: "surf", x: 640, y: 1066, w: 210, h: 62, tag: "10 · CDS", title: "Surface Treatment", desc: "Pickling and lubricant coating prepare the tube surface so it can pass through the cold-drawing die and plug without galling or tearing." },
    { id: "draw", x: 640, y: 1172, w: 210, h: 62, tag: "11 · CDS", title: "Cold Drawing", desc: "The tube is pulled through a precision die and internal plug at room temperature, tightening the OD, wall, and roundness tolerances well beyond hot-rolled limits." },
    { id: "heat", x: 640, y: 1278, w: 210, h: 62, tag: "12 · CDS", title: "Heat Treatment", desc: "Normalizing or annealing relieves the internal stresses introduced by cold drawing and restores the steel’s mechanical properties." },
    { id: "str2", x: 640, y: 1384, w: 210, h: 62, tag: "13 · CDS", title: "Straightening", desc: "A final straightening pass corrects any bow introduced during heat treatment before the tube rejoins the common line." },
    { id: "ect", x: 450, y: 1526, w: 160, h: 62, tag: "14 · Test", title: "ECT", desc: "Eddy Current Testing sends an electromagnetic field through the tube wall to flag surface and near-surface flaws without cutting the tube open." },
    { id: "hydro", x: 450, y: 1622, w: 185, h: 62, tag: "15 · Test", title: "Hydro Testing", desc: "Each tube is pressurized with water above its rated working pressure to confirm it holds without leaking or deforming." },
    { id: "visual", x: 450, y: 1718, w: 210, h: 62, tag: "16 · Test", title: "Visual Inspection", desc: "Manual and automated checks confirm surface finish, dimensions, and end condition against the order specification." },
    { id: "coat", x: 450, y: 1814, w: 210, h: 62, tag: "17 · Finishing", title: "Coating & Stencil", desc: "A protective lacquer or coating is applied and each tube is stencilled with its size, grade, and heat number for traceability — the last step before packing." },
    { id: "pack", x: 450, y: 1910, w: 230, h: 62, tag: "18 · Logistics", title: "Packing & Dispatch", desc: "Tubes are bundled, tagged with heat number and spec, and loaded for shipment — the last stop before they leave the mill." },
    { id: "final", x: 450, y: 2016, w: 270, h: 70, tag: "19 · Finished Product", title: "Finished Seamless Tube", output: true, desc: "The finished tube, either HFS or CDS grade depending on the route it took, ready for the customer — traceable back to its original billet heat." },
];

interface NodeProps {
    stage: Stage;
    onOpen: (stage: Stage) => void;
}

function Node({ stage, onOpen }: NodeProps) {
    const { x: cx, y: cy, w, h, tag, title, hot, output } = stage;
    const x = cx - w / 2;
    const y = cy - h / 2;
    const corners: [number, number][] = [
        [x + 9, y + 9],
        [x + w - 9, y + 9],
        [x + 9, y + h - 9],
        [x + w - 9, y + h - 9],
    ];

    const groupClass = "node-group" + (hot ? " hot" : "") + (output ? " output" : "");
    const rectClass = "node-rect" + (hot ? " hot" : "") + (output ? " output" : "");

    const open = () => onOpen(stage);

    return (
        <g
            className={groupClass}
            tabIndex={0}
            role="button"
            aria-label={title}
            onClick={open}
            onKeyDown={(e: React.KeyboardEvent<SVGGElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                }
            }}
        >
            <rect className={rectClass} x={x} y={y} width={w} height={h} rx={5} />
            {corners.map(([rx, ry], i) => (
                <circle key={i} className="rivet" cx={rx} cy={ry} r={2.6} />
            ))}
            <text className="node-tag" x={cx} y={y + 20}>{tag}</text>
            <text className="node-label" x={cx} y={y + h / 2 + 16}>{title}</text>
        </g>
    );
}

export default function Flow() {
    const [activeStage, setActiveStage] = useState<Stage | null>(null);
    const lastFocused = useRef<HTMLElement | null>(null);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    const openModal = (stage: Stage) => {
        lastFocused.current = document.activeElement as HTMLElement | null;
        setActiveStage(stage);
    };

    const closeModal = () => {
        setActiveStage(null);
        if (lastFocused.current) lastFocused.current.focus();
    };

    useEffect(() => {
        if (activeStage && closeBtnRef.current) {
            closeBtnRef.current.focus();
        }
    }, [activeStage]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className="tpf-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .tpf-root{
          --bg:#0b1418;
          --panel:#16232b;
          --panel-hot:#1c1611;
          --line:#3a4a52;
          --line-soft:#26343b;
          --hot:#ff6a1a;
          --hot-dim:#7a3a19;
          --cool:#4fc3f7;
          --cool-dim:#2a5666;
          --text:#e8edf0;
          --muted:#a7bac1;
          --amber:#ffb74d;
          background:var(--bg);
          color:var(--text);
          font-family:'IBM Plex Sans',sans-serif;
          -webkit-font-smoothing:antialiased;
          min-height:100vh;
        }
        .tpf-root *{box-sizing:border-box;}
        .tpf-wrap{max-width:1100px;margin:0 auto;padding:36px 24px 60px;position:relative;}

        .tpf-root svg{width:100%;height:auto;display:block;overflow:visible;}

        .node-rect{
          fill:var(--panel); stroke:var(--line); stroke-width:1.6;
          cursor:pointer; transition:stroke .15s ease, fill .15s ease;
        }
        .node-rect.hot{fill:var(--panel-hot); stroke:var(--hot-dim);}
        .node-rect.output{fill:var(--panel); stroke:var(--amber); stroke-width:2;}
        .node-group:hover .node-rect{stroke:var(--cool);}
        .node-group:hover .node-rect.output{stroke:#ffd28a;}
        .rivet{fill:#5a6c74; opacity:.9;}
        .node-group.hot .rivet{fill:#a35a30;}
        .node-group.output .rivet{fill:#a3812f;}

        .node-label{
          font-family:'IBM Plex Sans',sans-serif; font-weight:700; font-size:16px;
          fill:var(--text); text-anchor:middle; pointer-events:none;
        }
        .node-tag{
          font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.09em;
          fill:var(--muted); text-anchor:middle; pointer-events:none; text-transform:uppercase;
        }
        .node-group.output .node-label{fill:var(--amber);}

        .flow-line{fill:none; stroke:var(--line); stroke-width:2;}
        .flow-line.hfs{stroke:var(--cool-dim);}
        .flow-line.cds{stroke:var(--hot-dim);}
        .flow-dash{
          fill:none; stroke-width:2; stroke-dasharray:4 7; stroke-linecap:round;
          animation:tpf-flow 1.6s linear infinite; opacity:.95;
        }
        .flow-dash.main{stroke:var(--cool);}
        .flow-dash.hfs{stroke:var(--cool);}
        .flow-dash.cds{stroke:var(--hot);}
        @keyframes tpf-flow{to{stroke-dashoffset:-22;}}

        .route-label{
          font-family:'IBM Plex Mono',monospace; font-size:13px; letter-spacing:.1em;
          font-weight:500; text-transform:uppercase; fill:var(--muted);
        }
        .route-label.hfs{fill:var(--cool);}
        .route-label.cds{fill:var(--hot);}

        @media (prefers-reduced-motion: reduce){
          .flow-dash{animation:none;}
        }

        .tpf-overlay{
          position:fixed; inset:0; background:rgba(6,10,12,.72); backdrop-filter:blur(2px);
          display:flex; align-items:center; justify-content:center; z-index:50; padding:20px;
        }
        .tpf-modal{
          width:100%; max-width:460px; background:linear-gradient(160deg,#182229,#131b20);
          border:1px solid var(--line); border-radius:6px; box-shadow:0 20px 60px rgba(0,0,0,.5);
          position:relative; overflow:hidden;
        }
        .tpf-modal::before{
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--cool),var(--hot));
        }
        .tpf-modal-inner{padding:28px 28px 26px;}
        .tpf-modal-tag{font-family:'IBM Plex Mono',monospace; font-size:11.5px; letter-spacing:.14em;
          color:var(--cool); text-transform:uppercase; margin-bottom:10px;}
        .tpf-modal h2{font-family:'Oswald',sans-serif; font-weight:600; font-size:24px; margin:0 0 14px;
          text-transform:uppercase; letter-spacing:.01em;}
        .tpf-modal p{color:var(--muted); font-size:15px; line-height:1.65; margin:0;}
        .tpf-modal-close{
          position:absolute; top:14px; right:14px; width:32px; height:32px; border-radius:4px;
          background:transparent; border:1px solid var(--line); color:var(--muted);
          cursor:pointer; font-size:17px; line-height:1; display:flex; align-items:center; justify-content:center;
          transition:border-color .15s, color .15s;
        }
        .tpf-modal-close:hover{border-color:var(--cool); color:var(--text);}
        .tpf-modal-close:focus-visible, .node-group:focus-visible .node-rect{outline:2px solid var(--cool); outline-offset:2px;}
      `}</style>

            <div className="tpf-wrap">
                <svg viewBox="0 0 900 2082" xmlns="http://www.w3.org/2000/svg">
                    {/* spine lines (static) */}
                    <path className="flow-line" d="M450,60 L450,866" />
                    <path className="flow-line hfs" d="M450,866 C450,918 260,918 260,960 L260,1004" />
                    <path className="flow-line cds" d="M450,866 C450,918 640,918 640,960 L640,1004" />
                    <path className="flow-line hfs" d="M260,1204 L260,1304 C260,1344 450,1344 450,1526" />
                    <path className="flow-line cds" d="M640,1414 L640,1466 C640,1496 450,1496 450,1526" />
                    <path className="flow-line" d="M450,1526 L450,2016" />

                    {/* animated flow overlays */}
                    <path className="flow-dash main" d="M450,60 L450,866" />
                    <path className="flow-dash hfs" d="M450,866 C450,918 260,918 260,960 L260,1204" />
                    <path className="flow-dash cds" d="M450,866 C450,918 640,918 640,960 L640,1414" />
                    <path className="flow-dash main" d="M260,1204 L260,1304 C260,1344 450,1344 450,1526" />
                    <path className="flow-dash main" d="M640,1414 L640,1466 C640,1496 450,1496 450,1526" />
                    <path className="flow-dash main" d="M450,1526 L450,2016" />

                    <text className="route-label hfs" x="180" y="984">HOT FINISHED (HFS)</text>
                    <text className="route-label cds" x="565" y="984">COLD DRAWN (CDS)</text>

                    <g id="nodes">
                        {STAGES.map((s) => (
                            <Node key={s.id} stage={s} onOpen={openModal} />
                        ))}
                    </g>
                </svg>
            </div>

            {activeStage && (
                <div
                    className="tpf-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="tpfModalTitle"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="tpf-modal">
                        <button
                            className="tpf-modal-close"
                            aria-label="Close"
                            ref={closeBtnRef}
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <div className="tpf-modal-inner">
                            <div className="tpf-modal-tag">{activeStage.tag}</div>
                            <h2 id="tpfModalTitle">{activeStage.title}</h2>
                            <p>{activeStage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}