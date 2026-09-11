from PIL import Image
import os

animations = ["idle", "walk", "attack", "hit", "death"]

for animation in animations:
    source = f"{animation}.png"
    output = animation

    os.makedirs(output, exist_ok=True)

    img = Image.open(source).convert("RGBA")
    width, height = img.size

    frame_width = width / 8

    for i in range(8):
        left = round(i * frame_width)
        right = round((i + 1) * frame_width)

        frame = img.crop((left, 0, right, height))

        frame = frame.resize((256, 256), Image.Resampling.LANCZOS)

        filename = f"ninja_{animation}_{i+1:02}.png"

        frame.save(
            os.path.join(output, filename),
            "PNG"
        )

        print(f"Created {output}/{filename}")

print("\nDONE!")
