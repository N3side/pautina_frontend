const COLORS = {
    brand: {
        2: "#E0E7FF",
        3: "#DBEAFE",
        4: "#BBEAFF",
        7: "#71AAFF",
        8: "#0084FF",
        9: "#0EA5E9",
        10: "#3498DB",
        11: "#0284C7"
    },
    purple: {
        5: "#D8B4FE",
        7: "#9333EA",
        9: "#4F46E5"
    },
    gray: {
        0: "#F0F9FF",
        1: "#F8F9FA",
        2: "#CBD5E1",
        3: "#D1D5DB",
        4: "#B0B0B0",
        5: "#9CA3AF",
        6: "#94A3B8",
        7: "#95A5A6",
        8: "#64748B",
        9: "#6B7280",
        10: "#4B5563",
        11: "#475569",
        12: "#334155",
        13: "#374151",
        14: "#1E293B",
        15: "#1F2937",
        16: "#0F172A",
    },
    green: {
        1: "#DCFCE7",
        6: "#2ECC71",
        7: "#22C55E",
        8: "#10B981",
        9: "#16A34A"
    },
    red: {
        9: "#E74C3C"
    },
    yellow: {
        9: "#F39C12"
    },
    white: "#FFFFFF",
    black: "#000000"
};


const colorStyles = {
    text: {
        accent: {
            light: COLORS.brand[9],
            dark: COLORS.brand[9]
        },
        gradient: {
            light: `linear-gradient(90deg, ${COLORS.brand[9]} 0%, ${COLORS.purple[5]} 100%)`,
            dark: `linear-gradient(90deg, ${COLORS.brand[9]} 0%, ${COLORS.purple[5]} 100%)`
        },
        primary: {
            light: COLORS.gray[16],
            dark: COLORS.white
        },
        secondary: {
            light: COLORS.gray[8],
            dark: COLORS.gray[6]
        },
        p: {
            light: COLORS.gray[11]
        },
        p_tiny: {
            light: COLORS.gray[6]
        },
        dark: {
            light: COLORS.black
        },
        link: {
            light: COLORS.gray[8],
            dark: COLORS.gray[6]
        },
        logo: {
            light: COLORS.gray[14],
            dark: COLORS.white
        },

        h6: {
            light: COLORS.gray[14],
            dark: COLORS.gray[14]
        }

    },

    buttons: {
        brand: {
            light: COLORS.brand[9]
        },
        primary: {
            light: COLORS.gray[11]
        },
        secondary: {
            light: COLORS.gray[16]
        }
    },


    border: {
        selected: {
            light: COLORS.brand[7]
        },
        basic: {
            light: COLORS.gray[2]
        }
    }
}

export { COLORS, colorStyles }