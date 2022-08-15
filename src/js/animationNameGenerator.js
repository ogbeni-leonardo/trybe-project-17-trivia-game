const CHARS = 'abcdefghijklmnopqrstuvwxyz';

const animationNameGenerator = () => {
  let animationName = '';

  const ANIMATION_NAME_LENGTH = 10;
  for (let i = 0; i < ANIMATION_NAME_LENGTH; i += 1) {
    const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
    animationName += randomChar;
  }

  return animationName;
};

export default animationNameGenerator;
