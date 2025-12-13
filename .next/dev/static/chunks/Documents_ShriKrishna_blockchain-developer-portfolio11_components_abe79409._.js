(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/components/nurui/electric-cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const ElectricCursor = ()=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ElectricCursor.useEffect": ()=>{
            const sparks = [];
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            class Spark {
                x;
                y;
                length;
                alpha;
                constructor(x, y){
                    this.x = x;
                    this.y = y;
                    this.length = Math.random() * 10 + 5;
                    this.alpha = 1;
                }
                update() {
                    this.length -= 0.5;
                    this.alpha -= 0.03;
                }
                draw() {
                    if (!ctx) return;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + Math.random() * this.length, this.y + Math.random() * this.length);
                    ctx.strokeStyle = `rgba(0, 200, 255, ${this.alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            const animate = {
                "ElectricCursor.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for(let i = sparks.length - 1; i >= 0; i--){
                        sparks[i].update();
                        sparks[i].draw();
                        if (sparks[i].alpha <= 0) {
                            sparks.splice(i, 1);
                        }
                    }
                    requestAnimationFrame(animate);
                }
            }["ElectricCursor.useEffect.animate"];
            const onMove = {
                "ElectricCursor.useEffect.onMove": (e)=>{
                    for(let i = 0; i < 3; i++){
                        sparks.push(new Spark(e.clientX, e.clientY));
                    }
                }
            }["ElectricCursor.useEffect.onMove"];
            window.addEventListener("mousemove", onMove);
            animate();
            return ({
                "ElectricCursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", onMove);
                }
            })["ElectricCursor.useEffect"];
        }
    }["ElectricCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ShriKrishna$2f$blockchain$2d$developer$2d$portfolio11$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "fixed inset-0 w-full h-full pointer-events-none z-50"
    }, void 0, false, {
        fileName: "[project]/Documents/ShriKrishna/blockchain-developer-portfolio11/components/nurui/electric-cursor.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ElectricCursor, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ElectricCursor;
const __TURBOPACK__default__export__ = ElectricCursor;
var _c;
__turbopack_context__.k.register(_c, "ElectricCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_ShriKrishna_blockchain-developer-portfolio11_components_abe79409._.js.map