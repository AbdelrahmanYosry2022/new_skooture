import { useState, useCallback, useEffect } from 'react';
import type { SiteContent } from '../types';

export function useAdminContent(initialContent: SiteContent) {
  const [localContent, setLocalContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    setLocalContent(initialContent);
  }, [initialContent]);

  const updateNestedContent = useCallback((path: string[], value: any) => {
    setLocalContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: any = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  }, []);

  return { localContent, setLocalContent, updateNestedContent };
}
