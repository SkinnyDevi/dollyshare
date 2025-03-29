const COMPRESSED_EXTS = ['zip', 'rar', '7z'];
const IMAGE_EXTS = ['jpeg', 'jpg', 'png', 'tiff', 'bmp', 'webp', 'gif', 'heif', 'heic', 'raw'];
const VIDEO_EXTS = ['mp4', 'mov', 'avi', 'webm', 'mkv', 'm4v', 'wmv', 'mpeg'];
const EDITABLE_DOC_EXTS = ['doc', 'docs', 'docx'];
const EXCEL_EXTS = ['xlsx'];
const DOCUMENT_EXTS = ['pdf'];

export default function getFileExtensionIcon(file: File) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

  if (COMPRESSED_EXTS.includes(extension)) return "compressed_file";
  if (IMAGE_EXTS.includes(extension)) return "png_file";
  if (VIDEO_EXTS.includes(extension)) return "mp4_file";
  if (EDITABLE_DOC_EXTS.includes(extension)) return "docx_file";
  if (EXCEL_EXTS.includes(extension)) return "xlsx_file";
  if (DOCUMENT_EXTS.includes(extension)) return "pdf_file";

  return "generic_file";
}
