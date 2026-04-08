import os
import re

# Directory to search
TARGET_DIR = "src"

# Color mapping (Orange/Red to Green/Neon Green)
COLOR_MAP = {
    # Hex codes (case insensitive)
    r"#eb4520": "#00d287",  # Primary Base (Neon Green)
    r"#d63d1a": "#00b373",  # Darker Hover
    r"#ff5a36": "#33db9f",  # Lighter Glow/Hover
    r"#ff5024": "#33db9f",  # Another glow variant
    r"#ff5722": "#00d287",  # From saas-orange
    r"#f44336": "#00b373",  # From pomegranate
    r"#fcbda2": "#b3f0d4",  # Light gradient text
    r"#e86f3a": "#00e695",  # Hero badge text gradient start
    r"#ffa984": "#80ebb8",  # Hero badge dot gradient start
    r"#ff5911": "#00d287",  # Hero badge dot gradient end
    # RGB values for rgba()
    r"235,69,32": "0,210,135",
    r"235,\s*69,\s*32": "0, 210, 135",
    r"255,80,36": "51,219,159",
    r"255,\s*80,\s*36": "51, 219, 159",
    r"255,90,54": "51,219,159",
    r"255,\s*90,\s*54": "51, 219, 159",
    r"255,87,34": "0,210,135",
    r"255,\s*87,\s*34": "0, 210, 135",
    # oklch for the accent color in index.css
    r"oklch\(0\.6 0\.15 30\)": "oklch(0.7 0.15 150)",  # green approx
    r"oklch\(0\.6 0\.15 30 / 50%\)": "oklch(0.7 0.15 150 / 50%)",
}


def replace_colors(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        for old_pattern, new_value in COLOR_MAP.items():
            # Use regex to do case-insensitive replacement for hex codes
            content = re.sub(old_pattern, new_value, content, flags=re.IGNORECASE)

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated colors in: {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")


# Walk through the directory
for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            replace_colors(os.path.join(root, file))

print("Done.")
