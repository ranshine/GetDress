const colorList = [
  {name: 'Black', color: '#000000'},
  {name: 'Stone', color: '#888c8d'},
  {name: 'Red', color: '#FF0000'},
];

export const useColorCode = (colorCode: string) => {
  const getColorValue = () => {
    const colorObj = colorList.find(
      item => item.name.toLowerCase() === colorCode.toLowerCase(),
    );
    if (colorObj == null) {
      return 'green';
    }
    return colorObj?.color;
  };

  return {
    getColorValue,
  };
};
