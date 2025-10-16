import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "./client";

const Page = async () => {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.craete_AI.queryOptions({ text: "badaboom" }));
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<p>Loading...</p>}>
				<Client />
			</Suspense>
		</HydrationBoundary>
	);
}
 
export default Page;




// "use client";

// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

// const Page = () => {
// 	const trpc = useTRPC();
// 	const { data } = useQuery(trpc.craete_AI.queryOptions({ text: "badaboom" }));

// 	return (
// 		<div>
// 			{JSON.stringify(data)}
// 		</div>
// 	);
// }
 
// export default Page;