export default function Dots() {
  const dotArray = [];
  const maxDistance = Math.sqrt(Math.pow(200, 2) + Math.pow(125, 2));
  let top = 0;
  let left = 125;
  for (let i = 1; i <= 151; i++) {
    // if it is a new row
    if (i === 8) {
      top += 25;
      left = 75;
    } else if (i === 19) {
      top += 25;
      left = 25;
    } else if (i === 34 || i === 51 || i === 68 || i === 85 || i === 102) {
      top += 25;
      left = 0;
    } else if (i === 119) {
      top += 25;
      left = 25;
    } else if (i === 134) {
      top += 25;
      left = 75;
    } else if (i === 145) {
      top += 25;
      left = 125;
    }

    // calcalate opacity based on how far the dot is from the center
    const distance = Math.sqrt(
      Math.pow(left - 200, 2) + Math.pow(top - 125, 2)
    );
    const normalizedDistance = distance / maxDistance;
    const opacity = 1 - normalizedDistance;
    // const opacity = Math.max(1 - normalizedDistance, 0.5);

    // top: 125, left: 200 is the midpoint
    // subtract by 125, 200 to return the dots centered
    const style = {
      top: `${top - 125}px`,
      left: `${left - 200}px`,
      opacity: opacity,
    };
    dotArray.push(
      <div
        key={i}
        className="absolute w-[4px] h-[4px] rounded-full bg-neutral-300"
        style={style}
      ></div>
    );
    left += 25;
  }
  return <div className="relative">{dotArray}</div>;
}
