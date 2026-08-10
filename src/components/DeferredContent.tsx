import { ReactNode, useEffect, useRef, useState } from "react";

interface DeferredContentProps {
  children: ReactNode;
  rootMargin?: string;
}

/** Renders non-critical page sections only as the visitor nears them. */
export default function DeferredContent({
  children,
  rootMargin = "600px 0px",
}: DeferredContentProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsReady(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(marker);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={markerRef}>{isReady ? children : null}</div>;
}
