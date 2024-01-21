import {useEffect, useState} from "react";

const COLORS = {
        gray: {
            background: {
                from: "#CDCED3",
                to: "#595A5F",
            },
            apple: "#202021",
        },
        dark: {
            background: {
                from: "#636B78",
                to: "#262A33",
            },
            apple: "#0E0E0E",
        },
    }
    ;

type Background = {
    from: string,
    to: string,
}

type Apple = string

export default function Laptop(props: { className?: string }) {

    const [background, setBackground] = useState<Background>({
        from: COLORS.gray.background.from,
        to: COLORS.gray.background.to,
    })
    const [apple, setApple] = useState<Apple>(COLORS.gray.apple);

    const [currentStyle, setCurrentStyle] = useState<string>("gray")


    const handleColorChange = () => {
        const newStyle = currentStyle === "gray" ? "dark" : "gray";

        setCurrentStyle(newStyle);

        setBackground({
            from: COLORS[newStyle].background.from,
            to: COLORS[newStyle].background.to,
        });
        setApple(COLORS[newStyle].apple);
    };


    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleColorChange}
        >
            <g clipPath="url(#clip0_2342_640)">
                <path
                    d="M291.848 0C296.35 0 300 3.05714 300 6.82832V176C298 176 296.35 176 291.848 176H8.15218C3.64986 176 3.5 176 0 176V6.82832C0 3.05714 3.64985 0 8.15217 0H291.848Z"
                    fill="url(#paint0_linear_2342_640)"
                />
                <path
                    d="M158.721 66.8635C158.721 69.0224 157.948 71.038 156.408 72.9036C154.549 75.1216 152.3 76.4032 149.862 76.2009C149.831 75.942 149.813 75.6694 149.813 75.3829C149.813 73.3105 150.697 71.0925 152.267 69.2791C153.05 68.3609 154.047 67.5976 155.256 66.9886C156.462 66.3886 157.603 66.0567 158.677 66C158.691 66.1284 158.701 66.2567 158.708 66.3848C158.717 66.5448 158.721 66.7046 158.721 66.8635Z"
                    fill={apple}
                    fillOpacity="0.1"
                />
                <path
                    d="M166.883 99.6392C166.243 101.147 165.486 102.535 164.609 103.812C163.413 105.552 162.434 106.756 161.679 107.425C160.51 108.522 159.256 109.085 157.914 109.117C156.951 109.117 155.789 108.837 154.436 108.269C153.079 107.705 151.832 107.425 150.692 107.425C149.496 107.425 148.214 107.705 146.842 108.269C145.468 108.837 144.361 109.133 143.515 109.162C142.228 109.218 140.945 108.64 139.665 107.425C138.848 106.697 137.825 105.45 136.601 103.684C135.287 101.797 134.207 99.6099 133.361 97.116C132.454 94.4221 132 91.8136 132 89.2882C132 86.3954 132.613 83.9004 133.839 81.8096C134.804 80.1301 136.086 78.8055 137.692 77.8329C139.297 76.8604 141.032 76.3648 142.9 76.3331C143.923 76.3331 145.263 76.6558 146.929 77.2898C148.59 77.9261 149.657 78.2487 150.124 78.2487C150.474 78.2487 151.659 77.8716 153.667 77.1193C155.567 76.4219 157.17 76.133 158.483 76.2467C162.042 76.5398 164.716 77.9714 166.494 80.5507C163.311 82.5187 161.737 85.275 161.768 88.811C161.797 91.5653 162.776 93.8573 164.7 95.677C165.572 96.5217 166.546 97.1745 167.63 97.6381C167.395 98.3335 167.147 98.9997 166.883 99.6392Z"
                    fill={apple}
                    fillOpacity="0.1"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_2342_640"
                    x1="150"
                    y1="0"
                    x2="150"
                    y2="176"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={background.from}/>
                    <stop offset="1" stopColor={background.to}/>
                </linearGradient>
                <clipPath id="clip0_2342_640">
                    <rect width="300" height="176" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
