(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/components/intractviceCanvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const InteractiveCanvas = ()=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cubesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const staggerAnimRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(180);
    const nCubesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const cwRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const chRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InteractiveCanvas.useEffect": ()=>{
            if (!canvasRef.current) return;
            const c = canvasRef.current;
            const ctx = c.getContext('2d');
            if (!ctx) return;
            // Initialize images
            const img = new Image();
            const img2 = new Image();
            img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEw+Pj5aWloQEBAZGRleXl6AgIDAwMBwcHCampq7u7tzc3M0sGdFAAAABXRSTlMAp/UwQ5FLsO8AAADxSURBVHgB7c9HcQRhDITRn8NgMABDWAjO6ewMYLgsWef8akelk1Pr/upTj003mkZxiK3dqSsODnpmdXBwUBlEaRCYckdtEKVBYModmKbQKDrGHZpaaPyqZxQaRc8oNPVyTaehUVRGURhFYerlmu2D5k3jqimO1+MCU4h5XFzc9sQjaXTO1vMTobMkXgmdBfFKNnTY8UroLIp3YkfxldBhB4QOAkIHAaHDDggdBIQOX0HoICB0+ApCBwGhw1cQOggIBgHh5pCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQH0XuAS5hV4q0a3iHAAAAAElFTkSuQmCC';
            img2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEylpaXv7+/Gxsa+vr7m5uahoaE/Pz9/f3+Ojo5lZWWCgoKkaSxxAAAABnRSTlMA9TCcskPTdr2ZAAAA40lEQVR4Ae3POW0EQQBE0UZhBEawWBaAzz0QDIVhYgxmZ3X6pFZpIl/18xf8sep8GinFwzMmi8sFk8TlctFkockiGz80WWiyyMYPTRbZKLLxIxtFMIoVwCCSUQSTRDaeZ3POAKPIRpGNIhvPs3m8HOw0Pg+K+8fYo0FsY48GMUkyiEmSQUySDGKSZBCTJIOYZG0QkIVBQDQKydogIBqFRKOQaBSQYBAQDAKCQQSCUUg0CAhmLSAYhUSDgCwMIpFpFJnsW0lJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUnJjyJfg4PNmR1hT+AAAAAASUVORK5CYII=';
            const setGrid = {
                "InteractiveCanvas.useEffect.setGrid": ()=>{
                    if (!ctx) return;
                    c.width = window.innerWidth;
                    c.height = window.innerHeight;
                    cwRef.current = Math.ceil(c.width / 100 + 1);
                    chRef.current = Math.floor(c.height / 25 + 10);
                    cubesRef.current = [];
                    for(let _y = 0, i = 0; _y < chRef.current; _y++){
                        for(let _x = 0; _x < cwRef.current; _x++){
                            const cube = {
                                img,
                                img2,
                                scale: 0.9,
                                x: _y % 2 === 0 ? -25 + _x * 100 : 25 + _x * 100,
                                y: -75 + _y * 25,
                                z: 0,
                                img2_opacity: 0,
                                draw: {
                                    "InteractiveCanvas.useEffect.setGrid": function() {
                                        ctx.translate(this.x, this.y + this.z);
                                        ctx.drawImage(this.img, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
                                        ctx.globalAlpha = this.img2_opacity;
                                        ctx.drawImage(this.img2, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
                                        ctx.globalAlpha = 1;
                                        ctx.translate(-this.x, -(this.y + this.z));
                                    }
                                }["InteractiveCanvas.useEffect.setGrid"]
                            };
                            cube.draw();
                            cubesRef.current.push(cube);
                            i++;
                        }
                    }
                    nCubesRef.current = cubesRef.current.length;
                }
            }["InteractiveCanvas.useEffect.setGrid"];
            img.onload = ({
                "InteractiveCanvas.useEffect": ()=>{
                    setGrid();
                    window.addEventListener('resize', setGrid);
                }
            })["InteractiveCanvas.useEffect"];
            const anim = {
                "InteractiveCanvas.useEffect.anim": ()=>{
                    staggerAnimRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                        onComplete: anim
                    }).add(staggerFrom(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.random(0, nCubesRef.current, 1)));
                }
            }["InteractiveCanvas.useEffect.anim"];
            const staggerFrom = {
                "InteractiveCanvas.useEffect.staggerFrom": (from)=>{
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline().to(cubesRef.current, {
                        duration: 1,
                        z: 125,
                        ease: 'back.in(3)',
                        stagger: {
                            yoyo: true,
                            amount: 2.5,
                            grid: [
                                chRef.current,
                                cwRef.current
                            ],
                            from: from,
                            onComplete: {
                                "InteractiveCanvas.useEffect.staggerFrom": function(targets) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(targets, {
                                        duration: 1,
                                        z: 0,
                                        ease: 'back.out(3)'
                                    });
                                }
                            }["InteractiveCanvas.useEffect.staggerFrom"]
                        }
                    }, 0).to(cubesRef.current, {
                        duration: 0.6,
                        img2_opacity: 1,
                        stagger: {
                            yoyo: true,
                            amount: 2.5,
                            grid: [
                                chRef.current,
                                cwRef.current
                            ],
                            from: from,
                            onComplete: {
                                "InteractiveCanvas.useEffect.staggerFrom": function(targets) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(targets, {
                                        duration: 0.6,
                                        img2_opacity: 0
                                    });
                                }
                            }["InteractiveCanvas.useEffect.staggerFrom"]
                        }
                    }, 0);
                }
            }["InteractiveCanvas.useEffect.staggerFrom"];
            const handleClick = {
                "InteractiveCanvas.useEffect.handleClick": (e)=>{
                    if (!staggerAnimRef.current || !canvasRef.current) return;
                    staggerAnimRef.current.eventCallback('onComplete', null);
                    const rect = canvasRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // An approximation that works okay
                    const gridX = Math.floor((x - (x / canvasRef.current.width * 2 - 1) * 20 - x / canvasRef.current.width * 75) / canvasRef.current.width * cwRef.current);
                    const gridY = Math.floor((y - (y / canvasRef.current.height * 2 - 1) * 75 + 40) / canvasRef.current.height * chRef.current);
                    const i = cwRef.current * gridY + gridX;
                    staggerFrom(i);
                }
            }["InteractiveCanvas.useEffect.handleClick"];
            const updateCanvas = {
                "InteractiveCanvas.useEffect.updateCanvas": ()=>{
                    if (!ctx || !canvasRef.current) return;
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.globalCompositeOperation = 'source-over';
                    for(let i = 0; i < nCubesRef.current; i++){
                        cubesRef.current[i].draw();
                    }
                    hueRef.current -= 0.5;
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.fillStyle = `hsl(${hueRef.current}, 75%, 25%)`;
                    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }
            }["InteractiveCanvas.useEffect.updateCanvas"];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].delayedCall(0.2, anim);
            canvasRef.current.addEventListener('click', handleClick);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(updateCanvas);
            return ({
                "InteractiveCanvas.useEffect": ()=>{
                    window.removeEventListener('resize', setGrid);
                    if (canvasRef.current) {
                        canvasRef.current.removeEventListener('click', handleClick);
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(updateCanvas);
                    if (staggerAnimRef.current) {
                        staggerAnimRef.current.kill();
                    }
                }
            })["InteractiveCanvas.useEffect"];
        }
    }["InteractiveCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "c"
    }, void 0, false, {
        fileName: "[project]/src/app/components/intractviceCanvas.tsx",
        lineNumber: 192,
        columnNumber: 10
    }, this);
};
_s(InteractiveCanvas, "2429YCTuaIpe0GDO/ZZayLbspBU=");
_c = InteractiveCanvas;
const __TURBOPACK__default__export__ = InteractiveCanvas;
var _c;
__turbopack_context__.k.register(_c, "InteractiveCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/signup/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$noop$2d$head$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/noop-head.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ai/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/ri/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$intractviceCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/intractviceCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const PokemonSignupForm = ()=>{
    _s();
    const blackLineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ballRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mainFormRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const topRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const h1Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const remRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Helper function to properly type the ref callback
    const setRowRef = (index)=>(el)=>{
            rowRefs.current[index] = el;
        };
    const setRemRef = (index)=>(el)=>{
            remRefs.current[index] = el;
        };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PokemonSignupForm.useEffect": ()=>{
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
            // Animation sequence
            tl.to(blackLineRef.current, {
                duration: 0.5,
                className: '+=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '-=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '+=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '-=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '+=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '-=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '+=red-circle'
            }).to(blackLineRef.current, {
                duration: 0.5,
                className: '-=red-circle'
            }).to(ballRef.current, {
                duration: 0.5,
                y: '-70%',
                ease: 'power4.out'
            }).to(ballRef.current, {
                duration: 0.5,
                y: '-50%',
                ease: 'bounce.out'
            }).to(ballRef.current, {
                duration: 0.5,
                y: '-85%',
                ease: 'power4.out'
            }, '+=0.5').to(ballRef.current, {
                duration: 0.5,
                y: '-50%',
                ease: 'bounce.out'
            }).to(ballRef.current, {
                duration: 0.5,
                y: '-100%',
                ease: 'power4.out'
            }, '+=0.5').to(ballRef.current, {
                duration: 0.5,
                y: '-50%',
                ease: 'bounce.out',
                onComplete: toggleForm
            });
            function toggleForm() {
                if (mainFormRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(mainFormRef.current, {
                        display: 'block'
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(mainFormRef.current, {
                        duration: 1.5,
                        opacity: 1
                    });
                    tl.to(topRef.current, {
                        duration: 1,
                        autoAlpha: 0
                    }).to(bottomRef.current, {
                        duration: 1,
                        autoAlpha: 0
                    }, '-=1').fromTo(h1Ref.current, {
                        autoAlpha: 0,
                        y: -20
                    }, {
                        duration: 1,
                        autoAlpha: 1,
                        y: 0
                    }, '+=0.5');
                    // Animate each row with stagger
                    if (rowRefs.current) {
                        tl.staggerFrom(rowRefs.current.filter(Boolean), 1, {
                            left: '-100%',
                            autoAlpha: 0
                        }, 0.2);
                    }
                    // Animate remember sections
                    if (remRefs.current) {
                        tl.staggerFrom(remRefs.current.filter(Boolean), 1, {
                            cycle: {
                                y: [
                                    20,
                                    -20
                                ]
                            },
                            autoAlpha: 0
                        }, 0.2);
                    }
                }
            }
            return ({
                "PokemonSignupForm.useEffect": ()=>{
                    tl.kill();
                }
            })["PokemonSignupForm.useEffect"];
        }
    }["PokemonSignupForm.useEffect"], []);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullName: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const validateForm = ()=>{
        const newErrors = {};
        if (!form.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!form.mobile.trim()) {
            newErrors.mobile = 'Mobile is required';
        } else if (!/^\d{10}$/.test(form.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
        }
        if (!form.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return false;
        }
        return true;
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!validateForm()) return;
        signupUser(form);
    };
    const getInputClass = (field)=>errors[field] ? 'signup-roweerror' : 'signup-row';
    console.log('getInputClass("fullName")', getInputClass("fullName"));
    console.log('errors', errors);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prevForm)=>({
                ...prevForm,
                [name]: value
            }));
    };
    const signupUser = async (formData)=>{
        try {
            setLoading(true);
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!data.status) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data.message);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data.message);
            // console.log('User signed up successfully:', data);
            setForm({
                fullName: '',
                email: '',
                mobile: '',
                password: ''
            });
            router.push('/profile'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Error signing up user:', error);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$noop$2d$head$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css?family=Ubuntu",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/src/app/signup/page.tsx",
                        lineNumber: 201,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "stylesheet",
                        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    }, void 0, false, {
                        fileName: "[project]/src/app/signup/page.tsx",
                        lineNumber: 205,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/signup/page.tsx",
                lineNumber: 200,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {}, void 0, false, {
                fileName: "[project]/src/app/signup/page.tsx",
                lineNumber: 210,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$intractviceCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/signup/page.tsx",
                lineNumber: 211,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "main-container",
                ref: ballRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pokemon-top-part",
                        ref: topRef
                    }, void 0, false, {
                        fileName: "[project]/src/app/signup/page.tsx",
                        lineNumber: 216,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "main-forms",
                        ref: mainFormRef,
                        style: {
                            display: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "signup-form",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "sign-back text-white",
                                onSubmit: handleSubmit,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        ref: h1Ref,
                                        children: "sign UP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${getInputClass("fullName")} signup-row`,
                                        ref: setRowRef(0),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AiOutlineUser"], {
                                                        className: "absolute left-[30%] top-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        name: "fullName",
                                                        value: form.fullName,
                                                        placeholder: "FULL NAME",
                                                        onChange: handleChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 33
                                            }, this),
                                            errors.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "error-message text-red-500 text-xs",
                                                children: errors.fullName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${getInputClass("email")} signup-row`,
                                        ref: setRowRef(1),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AiOutlineMail"], {
                                                        className: "absolute left-[30%] top-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        name: "email",
                                                        value: form.email,
                                                        placeholder: "EMAIL",
                                                        onChange: handleChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 33
                                            }, this),
                                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "error-message text-red-500 text-xs",
                                                children: errors.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${getInputClass("mobile")} signup-row`,
                                        ref: setRowRef(2),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BiPhoneCall"], {
                                                        className: "absolute left-[30%] top-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        name: "mobile",
                                                        value: form.mobile,
                                                        placeholder: "MOBILE",
                                                        onChange: handleChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 33
                                            }, this),
                                            errors.mobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "error-message text-red-500 text-xs",
                                                children: errors.mobile
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${getInputClass("password")} signup-row`,
                                        ref: setRowRef(3),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiLockPasswordLine"], {
                                                        className: "absolute left-[30%] top-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        name: "password",
                                                        value: form.password,
                                                        placeholder: "PASSWORD",
                                                        onChange: handleChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 33
                                            }, this),
                                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "error-message text-red-500 text-xs",
                                                children: errors.password
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "signup-row flex justify-center text-center",
                                        ref: setRowRef(4),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "bg-transparent border-none cursor-pointer",
                                            disabled: loading,
                                            children: loading ? "Processing" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BiLogInCircle"], {
                                                className: "text-4xl"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 63
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/signup/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "form-bottom",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "remember",
                                                ref: setRemRef(0),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        name: "",
                                                        value: ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Remember"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signup/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "remember",
                                                ref: setRemRef(1),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/login",
                                                    children: "Already Have Account ?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/signup/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signup/page.tsx",
                                                lineNumber: 283,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signup/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/signup/page.tsx",
                                lineNumber: 221,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/signup/page.tsx",
                            lineNumber: 220,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/signup/page.tsx",
                        lineNumber: 219,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pokemon-bottom-part",
                        ref: bottomRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "white-part"
                            }, void 0, false, {
                                fileName: "[project]/src/app/signup/page.tsx",
                                lineNumber: 293,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "black-line",
                                ref: blackLineRef
                            }, void 0, false, {
                                fileName: "[project]/src/app/signup/page.tsx",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/signup/page.tsx",
                        lineNumber: 292,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/signup/page.tsx",
                lineNumber: 214,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
};
_s(PokemonSignupForm, "jF8hYuyUhoLazLtQyUnBxWb9P00=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PokemonSignupForm;
const __TURBOPACK__default__export__ = PokemonSignupForm;
var _c;
__turbopack_context__.k.register(_c, "PokemonSignupForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_69e8b0b4._.js.map