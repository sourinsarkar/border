import { useEffect, useRef, useState, ReactNode } from "react"

interface DashedBoxProps {
    children: ReactNode;
    className?: string;
    strokeColor?: string
    strokeWidth?: number
    dashLength?: number
    dashGap?: number
    radius?: number
}

export const DashedBox = ({ children, className, strokeColor = "#CED4DA", strokeWidth = 1, dashLength = 8, dashGap = 4, radius = 8 }: DashedBoxProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if(!contentRef.current) return;

        const currentContentRef = contentRef.current;

        const updateDimensions = () => {
            if(currentContentRef) {
                setDimensions({
                    width: currentContentRef.offsetWidth,
                    height: currentContentRef.offsetHeight,
                });
            };
        };

        // Just for intial dimensions
        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(currentContentRef);

        return () => {
            if(currentContentRef) {
                resizeObserver.unobserve(currentContentRef);
            };
        };
    }, []);

    return (
        <div className="relative" ref={contentRef}>
            <svg
                className="absolute left-0 top-0 pointer-events-none"
                width={dimensions.width}
                height={dimensions.height}
                xmlns="http://www.w3.org/2000/svg"
                >
                <rect
                    x="1" y="1"
                    width={dimensions.width - 2}
                    height={dimensions.height - 2}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${dashLength} ${dashGap}`}
                    rx={radius} ry={radius}
                />    
            </svg>
            <div className={`relative z-10 ${className}`}>
                {children}
            </div>
        </div>
    );
};