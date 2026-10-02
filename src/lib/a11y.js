// Lets a non-button element (card, row) behave like a button for keyboard users.
export const pressableProps = (onPress, isExpanded) => ({
  role: 'button',
  tabIndex: 0,
  'aria-expanded': isExpanded,
  onClick: onPress,
  onKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress(e);
    }
  },
});
