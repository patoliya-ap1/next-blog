"use client";

import { sanitizeHtml } from "../../utility/sanitize";

interface SanitizedContentProps {
  htmlContent: string;
}

const SanitizedContent: React.FC<SanitizedContentProps> = ({ htmlContent }) => {
  const cleanHtml = sanitizeHtml(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SanitizedContent;
