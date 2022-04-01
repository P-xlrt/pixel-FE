import { useState, useEffect } from "react";
import { setAnimationSize, setAnimationFrames, setAnimationTiming, setAnimationGap } from "../canvas_engine/utils/canvas_client";

export const AnimationSide = () => {

    const [x, setX] = useState(16);
    const [y, setY] = useState(16);
    const [frames, setFrames] = useState(2);
    const [timing, setTiming] = useState(100);
    const [gap, setGap] = useState(0);

    useEffect(() => {
        let useX = Math.min(x, 128); useX = Math.max(useX, 1); setX(useX);
        let useY = Math.min(y, 128); useY = Math.max(useY, 1); setY(useY);
        setAnimationSize(useX, useY);
    }, [x, y]);

    useEffect(() => {
        let useFrames = Math.min(frames, 64); useFrames = Math.max(useFrames, 1); setFrames(useFrames);
        setAnimationFrames(useFrames);
    }, [frames]);

    useEffect(() => {
        let useTime = Math.min(timing, 1000); useTime = Math.max(useTime, 10); setTiming(useTime);
        setAnimationTiming(useTime);
    }, [timing]);

    useEffect(() => {
        let useGap = Math.min(gap, 2); useGap = Math.max(useGap, 0); setGap(useGap);
        setAnimationGap(useGap);
    }, [gap])

    return (		
        <div id="side_animation" className="side_panel">
            <h2>Animations</h2>
            <p>Frame Size [X, Y]</p>
            <div className="animation_setting">
                <input type="number" onBlur={(e) => setX(e.target.value)} value={x} className="keypress_input" min="1" max="128" onChange={(e) => setX(e.target.value)}></input>
                <input type="number" onBlur={(e) => setY(e.target.value)} value={y} className="keypress_input" min="1" max="128" onChange={(e) => setY(e.target.value)}></input>
            </div>
            <p>Frame Count</p>
            <div className="animation_setting">
                <input type="number" onBlur={(e) => setFrames(e.target.value)} value={frames} className="keypress_input" min="1" max="64" onChange={(e) => setFrames(e.target.value)}></input>
            </div>
            <p>Frame timings</p>
            <div className="animation_setting">
                <input type="number" onBlur={(e) => setTiming(e.target.value)} value={timing} className="keypress_input" min="10" max="1000" onChange={(e) => setTiming(e.target.value)}></input>
            </div>
            <p>Animation gap</p>
            <div className="animation_setting">
                <input type="number" onBlur={(e) => setGap(e.target.value)} value={gap} className="keypress_input" min="0" max="2" onChange={(e) => setGap(e.target.value)}></input>
            </div>
            <div id="animation_container">
                <canvas id="canvas_animation" width="16" height="16"></canvas>
            </div>
        </div>
    );
}