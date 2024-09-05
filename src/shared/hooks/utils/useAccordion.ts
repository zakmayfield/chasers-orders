import { useState } from 'react';

export type AccordionContext = {
  handleExpand: (id: string) => false | void;
  isExpanded: (id: string) => boolean;
};

export const useAccordion = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isExpanded = (id: string) => (id === expandedId ? true : false);
  const handleExpand = (id: string) =>
    isExpanded(id) ? setExpandedId(null) : setExpandedId(id);

  return { handleExpand, isExpanded };
};
