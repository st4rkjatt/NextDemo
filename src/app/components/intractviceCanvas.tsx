"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Cube {
  img: HTMLImageElement;
  img2: HTMLImageElement;
  scale: number;
  x: number;
  y: number;
  z: number;
  img2_opacity: number;
  draw: () => void;
}

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubesRef = useRef<Cube[]>([]);
  const staggerAnimRef = useRef<gsap.core.Timeline>(null);
  const hueRef = useRef(180);
  const nCubesRef = useRef(0);
  const cwRef = useRef(0);
  const chRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    // Initialize images
    const img = new Image();
    const img2 = new Image();

    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEw+Pj5aWloQEBAZGRleXl6AgIDAwMBwcHCampq7u7tzc3M0sGdFAAAABXRSTlMAp/UwQ5FLsO8AAADxSURBVHgB7c9HcQRhDITRn8NgMABDWAjO6ewMYLgsWef8akelk1Pr/upTj003mkZxiK3dqSsODnpmdXBwUBlEaRCYckdtEKVBYModmKbQKDrGHZpaaPyqZxQaRc8oNPVyTaehUVRGURhFYerlmu2D5k3jqimO1+MCU4h5XFzc9sQjaXTO1vMTobMkXgmdBfFKNnTY8UroLIp3YkfxldBhB4QOAkIHAaHDDggdBIQOX0HoICB0+ApCBwGhw1cQOggIBgHh5pCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQH0XuAS5hV4q0a3iHAAAAAElFTkSuQmCC';
    img2.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEylpaXv7+/Gxsa+vr7m5uahoaE/Pz9/f3+Ojo5lZWWCgoKkaSxxAAAABnRSTlMA9TCcskPTdr2ZAAAA40lEQVR4Ae3POW0EQQBE0UZhBEawWBaAzz0QDIVhYgxmZ3X6pFZpIl/18xf8sep8GinFwzMmi8sFk8TlctFkockiGz80WWiyyMYPTRbZKLLxIxtFMIoVwCCSUQSTRDaeZ3POAKPIRpGNIhvPs3m8HOw0Pg+K+8fYo0FsY48GMUkyiEmSQUySDGKSZBCTJIOYZG0QkIVBQDQKydogIBqFRKOQaBSQYBAQDAKCQQSCUUg0CAhmLSAYhUSDgCwMIpFpFJnsW0lJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUnJjyJfg4PNmR1hT+AAAAAASUVORK5CYII=';

    const setGrid = () => {
      if (!ctx) return;

      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cwRef.current = Math.ceil(c.width / 100 + 1);
      chRef.current = Math.floor(c.height / 25 + 10);

      cubesRef.current = [];

      for (let _y = 0, i = 0; _y < chRef.current; _y++) {
        for (let _x = 0; _x < cwRef.current; _x++) {
          const cube: Cube = {
            img,
            img2,
            scale: 0.9,
            x: _y % 2 === 0 ? -25 + _x * 100 : 25 + _x * 100,
            y: -75 + _y * 25,
            z: 0,
            img2_opacity: 0,
            draw: function() {
              ctx.translate(this.x, this.y + this.z);
              ctx.drawImage(
                this.img,
                -100 / 2 * this.scale,
                -200 / 2 * this.scale,
                100 * this.scale,
                200 * this.scale
              );
              ctx.globalAlpha = this.img2_opacity;
              ctx.drawImage(
                this.img2,
                -100 / 2 * this.scale,
                -200 / 2 * this.scale,
                100 * this.scale,
                200 * this.scale
              );
              ctx.globalAlpha = 1;
              ctx.translate(-this.x, -(this.y + this.z));
            }
          };
          cube.draw();
          cubesRef.current.push(cube);
          i++;
        }
      }

      nCubesRef.current = cubesRef.current.length;
    };

    img.onload = () => {
      setGrid();
      window.addEventListener('resize', setGrid);
    };

    const anim = () => {
      staggerAnimRef.current = gsap.timeline({ onComplete: anim })
        .add(staggerFrom(gsap.utils.random(0, nCubesRef.current, 1)));
    };

    const staggerFrom = (from: number) => {
      return gsap.timeline()
        .to(cubesRef.current, {
          duration: 1,
          z: 125,
          ease: 'back.in(3)',
          stagger: {
            yoyo: true,
            amount: 2.5,
            grid: [chRef.current, cwRef.current],
            from: from,
            onComplete: function(targets: gsap.TweenTarget) {
              gsap.to(targets, {
                duration: 1,
                z: 0,
                ease: 'back.out(3)'
              });
            }
          }
        }, 0)
        .to(cubesRef.current, {
          duration: 0.6,
          img2_opacity: 1,
          stagger: {
            yoyo: true,
            amount: 2.5,
            grid: [chRef.current, cwRef.current],
            from: from,
            onComplete: function(targets: gsap.TweenTarget) {
              gsap.to(targets, {
                duration: 0.6,
                img2_opacity: 0
              });
            }
          }
        }, 0);
    };

    const handleClick = (e: MouseEvent) => {
      if (!staggerAnimRef.current || !canvasRef.current) return;

      staggerAnimRef.current.eventCallback('onComplete', null);

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // An approximation that works okay
      const gridX = Math.floor(
        (x - (x / canvasRef.current.width * 2 - 1) * 20 - x / canvasRef.current.width * 75) / 
        canvasRef.current.width * cwRef.current
      );
      const gridY = Math.floor(
        (y - (y / canvasRef.current.height * 2 - 1) * 75 + 40) / 
        canvasRef.current.height * chRef.current
      );
      const i = cwRef.current * gridY + gridX;

      staggerFrom(i);
    };

    const updateCanvas = () => {
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < nCubesRef.current; i++) {
        cubesRef.current[i].draw();
      }

      hueRef.current -= 0.5;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = `hsl(${hueRef.current}, 75%, 25%)`;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    gsap.delayedCall(0.2, anim);
    canvasRef.current.addEventListener('click', handleClick);
    gsap.ticker.add(updateCanvas);

    return () => {
      window.removeEventListener('resize', setGrid);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleClick);
      }
      gsap.ticker.remove(updateCanvas);
      if (staggerAnimRef.current) {
        staggerAnimRef.current.kill();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="c" />;
};

export default InteractiveCanvas;