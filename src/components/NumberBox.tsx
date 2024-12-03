import React from 'react';

interface numProp {
    num: string | number;
    unit: string;
    flip: boolean;
}

export const NumberBox = ({ num, unit, flip }: numProp) => {
    return (
        <div className="flex bg-transparent flex-col items-center mt-1 px-1">
            <div className="relative bg-none flex flex-col items-center justify-center rounded-lg w-12 h-12 text-base md:text-xl mt-1">
                <div className="rounded-t-lg rounded-b-lg bg-[#343650] w-full h-full"></div>

                <div className="text-2xl absolute text-rose-500 z-10 font-bold font-redhat md:text-3xl font-mono">
                    {num}
                </div>

                <div className="rounded-b-lg rounded-t-lg bg-[#2c2e3f] w-full h-full"></div>

                {/* <div
                    className={`absolute w-full h-1/2 top-0 rounded-t-lg z-5 ${flip ? 'animate-flip bg-rose-200' : 'bg-transparent'
                        }`}
                ></div> */}

                {/* Two Small Dots */}
                <div className="absolute -right-0.5 top-[22px] rounded-full w-[4px] h-[4px] bg-[#1e1f29]"></div>
                <div className="absolute -left-0.5 top-[22px] rounded-full w-[4px] h-[4px] bg-[#1e1f29]"></div>
            </div>

            <p className="text-xs mt-1 font-semibold text-rose-200 md:text-sm">
                {unit}
            </p>
        </div>
    );
};
