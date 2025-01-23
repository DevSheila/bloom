function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

// export function weatherIcon(imageName) {
//   const allWeatherIcons = importAll(
//     require.context('../assets/icons', false, /\.(png)$/)
//   );

//   const iconsKeys = Object.keys(allWeatherIcons);

//   const iconsValues = Object.values(allWeatherIcons);
//   const iconIndex = iconsKeys.indexOf(imageName);

//   return iconsValues[iconIndex];
// }

export function weatherIcon(imageName) {
  const allWeatherIcons = import.meta.glob('../assets/icons/*.png', { eager: true });
  const iconPath = Object.keys(allWeatherIcons).find(path => path.includes(imageName));
  return allWeatherIcons[iconPath]?.default;
}
