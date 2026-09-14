import React, { useState } from "react";

interface Stage {
    id: string;
    tag: string;
    title: string;
    desc: string;
    hot?: boolean;
    output?: boolean;
    route?: "hfs" | "cds";
}

const COMMON_TOP: Stage[] = [
    { id: "billet", tag: "01 · Input", title: "Billet", desc: "A solid, round steel billet is cut to length and inspected before entering the furnace. Its diameter sets the starting point for the whole size range downstream." },
    { id: "furnace1", tag: "02 · Thermal", title: "Heating Furnace", hot: true, desc: "The billet is heated to roughly 1,200–1,280°C, hot enough to make the steel plastic without melting it, ahead of piercing." },
    { id: "pierce", tag: "03 · Forming", title: "Piercing", desc: "A rotary piercing mill drives a plug through the center of the hot billet, converting the solid bar into a hollow shell in one pass." },
    { id: "furnace2", tag: "04 · Thermal", title: "Re-Heating Furnace", hot: true, desc: "The hollow shell is reheated to the correct temperature for elongation rolling, since piercing alone cools and stresses the steel." },
    { id: "sizing", tag: "05 · Forming", title: "Sizing", desc: "A sizing mill rolls the reheated hollow shell down to its final outside diameter and wall thickness. This step effectively fixes the tube's finished dimensions — the resulting mother hollow is already at hot-finished (HFS) tolerance, which is why the HFS route needs only straightening afterward." },
    { id: "mother", tag: "06 · Intermediate", title: "Mother Hollow Tube", output: true, desc: "This is the common intermediate product for the whole plant — every finished tube, hot finished or cold drawn, starts from a mother hollow tube of this size." },
];

const HFS: Stage[] = [
    { id: "str1", tag: "07 · HFS", title: "Straightening", route: "hfs", desc: "Fresh off the sizing mill, the hot finished tube passes through a straightener to correct ovality and camber picked up during rolling." },
    { id: "hfs", tag: "08 · HFS Output", title: "HFS Tubes", output: true, route: "hfs", desc: "Hot Finished Seamless tubes — finished directly from the hot-rolling line with no cold work, suited to structural and lower-tolerance applications." },
];

const CDS: Stage[] = [
    { id: "surf", tag: "09 · CDS", title: "Surface Treatment", route: "cds", desc: "Pickling and lubricant coating prepare the tube surface so it can pass through the cold-drawing die and plug without galling or tearing." },
    { id: "draw", tag: "10 · CDS", title: "Cold Drawing", route: "cds", desc: "The tube is pulled through a precision die and internal plug at room temperature, tightening the OD, wall, and roundness tolerances well beyond hot-rolled limits." },
    { id: "heat", tag: "11 · CDS", title: "Heat Treatment", route: "cds", desc: "Normalizing or annealing relieves the internal stresses introduced by cold drawing and restores the steel’s mechanical properties." },
    { id: "str2", tag: "12 · CDS", title: "Straightening", route: "cds", desc: "A final straightening pass corrects any bow introduced during heat treatment before the tube rejoins the common line." },
];

const COMMON_BOTTOM: Stage[] = [
    { id: "ect", tag: "13 · Test", title: "ECT", desc: "Eddy Current Testing sends an electromagnetic field through the tube wall to flag surface and near-surface flaws without cutting the tube open." },
    { id: "hydro", tag: "14 · Test", title: "Hydro Testing", desc: "Each tube is pressurized with water above its rated working pressure to confirm it holds without leaking or deforming." },
    { id: "visual", tag: "15 · Test", title: "Visual Inspection", desc: "Manual and automated checks confirm surface finish, dimensions, and end condition against the order specification." },
    { id: "pack", tag: "16 · Logistics", title: "Packing & Dispatch", desc: "Tubes are bundled, tagged with heat number and spec, and loaded for shipment — the last stop before they leave the mill." },
    { id: "final", tag: "17 · Finished Product", title: "Finished Seamless Tube", output: true, desc: "The finished tube, either HFS or CDS grade depending on the route it took, ready for the customer — traceable back to its original billet heat." },
];

function StageCard({ stage, isOpen, onToggle }: { stage: Stage; isOpen: boolean; onToggle: () => void }) {
    const cls =
        "tpm-card" +
        (stage.hot ? " hot" : "") +
        (stage.output ? " output" : "") +
        (isOpen ? " open" : "");

    return (
        <div className={cls}>
            <button className="tpm-head" onClick={onToggle} aria-expanded={isOpen}>
                <span className="tpm-dot" aria-hidden="true" />
                <span className="tpm-headtext">
                    <span className="tpm-tag">{stage.tag}</span>
                    <span className="tpm-title">{stage.title}</span>
                </span>
                <span className="tpm-chevron">{isOpen ? "–" : "+"}</span>
            </button>
            <div className="tpm-body" style={{ maxHeight: isOpen ? "260px" : "0px" }}>
                <p>{stage.desc}</p>
            </div>
        </div>
    );
}

export default function FlowMobile() {
    const [openId, setOpenId] = useState<string | null>("billet");
    const [route, setRoute] = useState<"hfs" | "cds">("hfs");

    const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

    const branchStages = route === "hfs" ? HFS : CDS;
    const allStages = [...COMMON_TOP, ...branchStages, ...COMMON_BOTTOM];

    return (
        <div className="tpm-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .tpm-root{
          --bg:#0b1418;
          --panel:#16232b;
          --panel-hot:#1c1611;
          --line:#324048;
          --hot:#ff6a1a;
          --hot-dim:#7a3a19;
          --cool:#4fc3f7;
          --cool-dim:#2a5666;
          --text:#e8edf0;
          --muted:#93a7ae;
          --amber:#ffb74d;
          background:var(--bg);
          color:var(--text);
          font-family:'IBM Plex Sans',sans-serif;
          -webkit-font-smoothing:antialiased;
          min-height:100vh;
        }
        .tpm-root *{box-sizing:border-box;}
        .tpm-wrap{max-width:480px;margin:0 auto;padding:20px 14px 48px;}

        .tpm-header{padding:4px 4px 18px;}
        .tpm-eyebrow{
          font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.16em;
          color:var(--cool); text-transform:uppercase; margin-bottom:6px;
        }
        .tpm-h1{
          font-family:'Oswald',sans-serif; font-weight:600; font-size:22px;
          text-transform:uppercase; letter-spacing:.01em; margin:0;
        }

        /* route switch, styled like a rail points-lever */
        .tpm-switchwrap{
          margin:0 4px 8px; padding:10px 12px; background:var(--panel);
          border:1px solid var(--line); border-radius:6px;
          display:flex; align-items:center; justify-content:space-between; gap:10px;
        }
        .tpm-switchlabel{
          font-family:'IBM Plex Mono',monospace; font-size:10.5px; letter-spacing:.1em;
          color:var(--muted); text-transform:uppercase;
        }
        .tpm-switch{
          display:flex; border:1px solid var(--line); border-radius:5px; overflow:hidden;
        }
        .tpm-switch button{
          border:none; background:transparent; color:var(--muted); cursor:pointer;
          font-family:'IBM Plex Mono',monospace; font-size:11.5px; letter-spacing:.08em;
          padding:7px 12px; text-transform:uppercase; transition:background .15s,color .15s;
        }
        .tpm-switch button.active.hfs{background:var(--cool-dim); color:#d6f2ff;}
        .tpm-switch button.active.cds{background:var(--hot-dim); color:#ffe0cc;}
        .tpm-switch button:not(.active):hover{color:var(--text);}

        .tpm-track{position:relative; padding-left:4px;}
        .tpm-line{
          position:absolute; left:15px; top:6px; bottom:6px; width:2px;
          background:linear-gradient(var(--cool-dim), var(--hot-dim));
          opacity:.6;
        }

        .tpm-card{
          position:relative; margin:0 0 10px; background:var(--panel);
          border:1px solid var(--line); border-radius:6px; overflow:hidden;
        }
        .tpm-card.hot{background:var(--panel-hot); border-color:var(--hot-dim);}
        .tpm-card.output{border-color:var(--amber);}
        .tpm-card.open{border-color:var(--cool);}
        .tpm-card.output.open{border-color:var(--amber);}

        .tpm-head{
          width:100%; display:flex; align-items:center; gap:12px;
          background:transparent; border:none; text-align:left; cursor:pointer;
          padding:13px 14px 13px 10px; color:var(--text);
        }
        .tpm-dot{
          width:8px; height:8px; border-radius:50%; flex:0 0 auto;
          background:var(--cool); margin-left:2px;
        }
        .tpm-card.hot .tpm-dot{background:var(--hot);}
        .tpm-card.output .tpm-dot{background:var(--amber);}

        .tpm-headtext{display:flex; flex-direction:column; gap:2px; flex:1; min-width:0;}
        .tpm-tag{
          font-family:'IBM Plex Mono',monospace; font-size:10px; letter-spacing:.1em;
          color:var(--muted); text-transform:uppercase;
        }
        .tpm-title{font-family:'IBM Plex Sans',sans-serif; font-weight:700; font-size:15px;}
        .tpm-card.output .tpm-title{color:var(--amber);}

        .tpm-chevron{
          font-family:'IBM Plex Mono',monospace; font-size:16px; color:var(--muted);
          width:20px; text-align:center; flex:0 0 auto;
        }

        .tpm-body{
          max-height:0; overflow:hidden; transition:max-height .28s ease;
        }
        .tpm-body p{
          margin:0; padding:0 14px 16px 32px; color:var(--muted);
          font-size:13.5px; line-height:1.6;
        }

        @media (prefers-reduced-motion: reduce){
          .tpm-body{transition:none;}
        }
      `}</style>

            <div className="tpm-wrap">
                <div className="tpm-header">
                    <div className="tpm-eyebrow">Seamless Tube Process</div>
                    <h1 className="tpm-h1">Billet to Finished Tube</h1>
                </div>

                <div className="tpm-switchwrap">
                    <span className="tpm-switchlabel">Route</span>
                    <div className="tpm-switch">
                        <button
                            className={"hfs" + (route === "hfs" ? " active" : "")}
                            onClick={() => setRoute("hfs")}
                        >
                            HFS
                        </button>
                        <button
                            className={"cds" + (route === "cds" ? " active" : "")}
                            onClick={() => setRoute("cds")}
                        >
                            CDS
                        </button>
                    </div>
                </div>

                <div className="tpm-track">
                    <div className="tpm-line" aria-hidden="true" />
                    {allStages.map((s) => (
                        <StageCard
                            key={s.id}
                            stage={s}
                            isOpen={openId === s.id}
                            onToggle={() => toggle(s.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}