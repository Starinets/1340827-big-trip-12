const EventKeyCode = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const isEscapeEvent = (evt) => {
  return evt.key === EventKeyCode.ESCAPE || evt.key === EventKeyCode.ESC;
};

export {isEscapeEvent};
