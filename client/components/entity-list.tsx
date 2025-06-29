import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Skeleton } from "./ui/skeleton";

/**
 * A component with entity list.
 */
export default function EntityList(props: {
  entities: any[] | undefined;
  renderEntityCard: (entity: any, key: number) => ReactNode;
  noEntitiesText: string;
  className?: ClassValue;
}) {
  return (
    <div className={cn("w-full flex flex-col items-center gap-6", props.className)}>
      {/* Not empty list */}
      {props.entities &&
        props.entities.length > 0 &&
        props.entities.map((entity, index) => (
          <div key={index} className="w-full max-w-xl">
            {props.renderEntityCard(entity, index)}
          </div>
        ))}

      {/* Empty list */}
      {props.entities && props.entities.length === 0 && (
        <div className="w-full max-w-xl flex flex-col items-center border rounded px-4 py-4">
          <p className="text-sm text-muted-foreground">
            {props.noEntitiesText}
          </p>
        </div>
      )}

      {/* Loading list */}
      {!props.entities && (
        <Skeleton className="w-full max-w-xl h-32 rounded" />
      )}
    </div>
  );
}
