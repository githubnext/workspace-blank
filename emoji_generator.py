import json
from PIL import Image, ImageDraw, ImageFont

# Load emoji dictionary
with open('emoji_dictionary.json', 'r') as file:
    emoji_dict = json.load(file)['emojis']

def generate_image_from_code(code, output_path):
    # Create a blank image
    img = Image.new('RGB', (800, 600), color=(255, 255, 255))
    d = ImageDraw.Draw(img)
    
    # Load a font
    font = ImageFont.load_default()
    
    # Split code into lines
    lines = code.split('\n')
    
    # Draw code lines with emojis
    y_text = 10
    for line in lines:
        for key, emoji in emoji_dict.items():
            if key in line:
                line = line.replace(key, emoji)
        d.text((10, y_text), line, font=font, fill=(0, 0, 0))
        y_text += 15
    
    # Save the image
    img.save(output_path)

# Example usage
code = """
def my_function():
    for i in range(10):
        if i % 2 == 0:
            print("Even")
        else:
            print("Odd")
"""

generate_image_from_code(code, 'output.png')
