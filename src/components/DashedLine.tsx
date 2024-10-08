import { useEffect, useRef, useState } from "react"

interface DashedLineProps {
    className?: string;
    orientation: "horizontal" | "vertical";
    length?: number;
    strokeColor?: string
    strokeWidth?: number
    dashLength?: number
    dashGap?: number
}

export const DashedLine = ({ className, orientation = "horizontal", length, strokeColor = "#CED4DA", strokeWidth = 1, dashLength = 8, dashGap = 4 }: DashedLineProps): JSX.Element => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if(!contentRef.current) return;

        const currentContentRef = contentRef.current;

        const updateDimensions = () => {
            if(currentContentRef) {
                setDimensions ({
                    width: currentContentRef.offsetWidth,
                    height: currentContentRef.offsetHeight,
                });
            };
        };

        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(currentContentRef);

        return () => {
            if(currentContentRef) {
                resizeObserver.unobserve(currentContentRef);
            };
        };
    }, []);

    const lineLength = length || (orientation == "horizontal" ? dimensions.width : dimensions.height);

    return (
        <div className={`relative ${className}`} ref={contentRef}>
            <svg
                className="absolute left-0 top-0 pointer-events-none"
                width={orientation ==  "horizontal" ? lineLength : 2}
                height={orientation ==  "vertical" ? lineLength : 2}
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    x1 = { orientation == "horizontal" ? 0 : 1 }
                    y1 = { orientation == "horizontal" ? 1 : 0 }
                    x2 = { orientation == "horizontal" ? lineLength : 1 }
                    y2 = { orientation == "horizontal" ? 1 : lineLength }
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${dashLength} ${dashGap}`}
                />
            </svg>
        </div>
    );
};