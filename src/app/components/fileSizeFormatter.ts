export default function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const factor = 1024;
  let unitIndex = Math.floor(Math.log(bytes) / Math.log(factor));

  unitIndex = Math.min(unitIndex, units.length - 1);

  const size = bytes / Math.pow(factor, unitIndex);
  const formattedSize = size % 1 === 0 ? size : size.toFixed(2);

  return `${formattedSize} ${units[unitIndex]}`;
}
