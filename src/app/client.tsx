"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.craete_AI.queryOptions({ text: "badaboom" }));

	return (
		<div>
			{JSON.stringify(data)}
		</div>
	);
}