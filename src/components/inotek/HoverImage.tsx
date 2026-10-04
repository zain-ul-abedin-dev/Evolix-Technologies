"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/inotek/Img";

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Same fragment shader as the template's hover.js (three.js hoverEffect).
const FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D disp;
uniform float dispFactor;
uniform float effectFactor;
void main() {
  vec4 d = texture2D(disp, vUv);
  vec2 p1 = vec2(vUv.x + dispFactor * (d.r * effectFactor), vUv.y);
  vec2 p2 = vec2(vUv.x - (1.0 - dispFactor) * (d.r * effectFactor), vUv.y);
  gl_FragColor = mix(texture2D(tex1, p1), texture2D(tex2, p2), dispFactor);
}`;

type HoverImageProps = {
  src: string;
  alt: string;
  /** Displacement map from /assets/images/displacement (template `data-style`). */
  style?: string;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
  /** Element whose hover triggers the effect (template: closest `.data-item-hover`). */
  triggerSelector?: string;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/** `<figure class="data-img-hover">` with the WebGL displacement hover from the template. */
export function HoverImage({ src, alt, style = "01", intensity = 0.2, speedIn = 1, speedOut = 1, triggerSelector = ".data-item-hover" }: HoverImageProps) {
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    let disposed = false;
    let cleanup = () => {};

    Promise.all([loadImage(src), loadImage(`/assets/images/displacement/${style}.webp`), import("gsap")]).then(([image, dispImage, { gsap }]) => {
      if (disposed) return;
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
      if (!gl) return;
      figure.appendChild(canvas);

      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };
      const program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      const texture = (img: HTMLImageElement, unit: number, name: string) => {
        const tex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform1i(gl.getUniformLocation(program, name), unit);
      };
      texture(image, 0, "tex1");
      texture(image, 1, "tex2");
      texture(dispImage, 2, "disp");
      gl.uniform1f(gl.getUniformLocation(program, "effectFactor"), intensity);
      const dispLoc = gl.getUniformLocation(program, "dispFactor");

      const state = { dispFactor: 0 };
      const render = () => {
        gl.uniform1f(dispLoc, state.dispFactor);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = figure.offsetWidth * dpr;
        canvas.height = figure.offsetHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        render();
      };
      resize();

      const trigger = (figure.closest(triggerSelector) as HTMLElement | null) ?? figure;
      const touch = window.matchMedia("(hover: none)").matches;
      const enter = () => gsap.to(state, { dispFactor: 1, duration: speedIn, ease: "expo.out", onUpdate: render });
      const leave = () => gsap.to(state, { dispFactor: 0, duration: speedOut, ease: "expo.out", onUpdate: render });
      const evtIn = touch ? "touchstart" : "mouseenter";
      const evtOut = touch ? "touchend" : "mouseleave";
      trigger.addEventListener(evtIn, enter);
      trigger.addEventListener(evtOut, leave);
      // The <img> may still be lazy-loading, so follow the figure's size rather than window resizes.
      const observer = new ResizeObserver(resize);
      observer.observe(figure);

      cleanup = () => {
        trigger.removeEventListener(evtIn, enter);
        trigger.removeEventListener(evtOut, leave);
        observer.disconnect();
        gsap.killTweensOf(state);
        canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }).catch(() => {
      /* Image or WebGL unavailable: the plain <img> stays visible. */
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src, style, intensity, speedIn, speedOut, triggerSelector]);

  return (
    <figure ref={figureRef} className="data-img-hover" data-style={style} data-intensity={intensity} data-speedin={speedIn} data-speedout={speedOut}>
      <Img src={src} alt={alt} loading="lazy" />
    </figure>
  );
}
